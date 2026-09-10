"""
app.py — Flask веб-сервер для Galamart Order Assistant
Тёмная тема #0d1117 + оранжевый акцент #FF6B00
Сохраняет все модули: database, analytics, order_generator, pdf_export, excel_import_export
"""
import os
from datetime import datetime, timedelta
from flask import Flask, render_template, request, jsonify, send_file, send_from_directory
from config import CATEGORIES, REPORTS_DIR, PRODUCTS_CSV
from database import Database
from analytics import Analytics
from order_generator import OrderGenerator
from excel_import_export import ExcelHandler
import pdf_export

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

# Глобальные объекты — можно патчить в тестах
db = Database()
analytics = Analytics(db)
order_gen = OrderGenerator(db)
excel_handler = ExcelHandler(db)

# Автозагрузка демо-данных если БД пустая
if db.count_products() == 0 and os.path.exists(PRODUCTS_CSV):
    try:
        res = excel_handler.import_products_csv(PRODUCTS_CSV)
        print(f"[app] Автозагрузка {PRODUCTS_CSV}: {res['imported']}")
    except Exception as e:
        print(f"[app] Ошибка автозагрузки: {e}")
    try:
        db.seed_promos_demo()
    except:
        pass

@app.route('/')
def index():
    return render_template('index.html', categories=CATEGORIES)

# ---------- Helpers ----------
def _ok(data=None, msg="ok"):
    return jsonify({"status": "ok", "data": data, "msg": msg})

def _err(msg, code=400):
    return jsonify({"status": "error", "msg": msg}), code

# ---------- Products CRUD ----------
@app.route('/api/products', methods=['GET'])
def api_get_products():
    search = request.args.get('search', '').strip()
    category = request.args.get('category', '').strip()
    only_active = request.args.get('only_active', '').lower() in ('1','true','yes')
    if category == "Все" or category == "Все категории":
        category = ""
    # пагинация для 3000 товаров
    try:
        page = int(request.args.get('page','1'))
        limit = int(request.args.get('limit','0'))
    except:
        page, limit = 1, 0
    if page < 1: page = 1
    if limit < 0: limit = 0
    # лимит 0 = без пагинации (для тестов и аналитики), иначе пагинация
    if limit > 0:
        offset = (page-1)*limit
        total = db.count_products_filtered(search=search, category=category, only_active=only_active)
        rows = db.get_all_products(search=search, category=category, only_active=only_active, limit=limit, offset=offset)
    else:
        rows = db.get_all_products(search=search, category=category, only_active=only_active)
        total = len(rows)
    # enrich with total/avg for convenience
    enriched = []
    for r in rows:
        w1 = r.get("week1") or 0
        w2 = r.get("week2") or 0
        w3 = r.get("week3") or 0
        w4 = r.get("week4") or 0
        total_w = w1+w2+w3+w4
        avg = round(total_w/4,1) if total_w else 0
        enriched.append({**r, "total": total_w, "avg": avg})
    # если пагинация — отдаём объект с total, иначе как раньше массив
    if limit > 0:
        return _ok({"items": enriched, "total": total, "page": page, "limit": limit})
    return _ok(enriched)

@app.route('/api/products/<int:pid>', methods=['GET'])
def api_get_product(pid):
    prod = db.get_product_by_id(pid)
    if not prod:
        return _err("Товар не найден", 404)
    sales = db.get_sales(pid)
    if sales:
        prod.update({k: sales[k] for k in ("week1","week2","week3","week4","last_sale_date")})
        # считаем days_since
        if sales.get("last_sale_date"):
            try:
                from datetime import datetime as dt
                d = dt.strptime(sales["last_sale_date"], "%Y-%m-%d").date()
                prod["days_since_last_sale"] = (dt.now().date()-d).days
            except:
                prod["days_since_last_sale"] = 999
        else:
            # по неделям
            w = [sales["week1"],sales["week2"],sales["week3"],sales["week4"]]
            if w[3]>0: prod["days_since_last_sale"]=2
            elif w[2]>0: prod["days_since_last_sale"]=10
            elif w[1]>0: prod["days_since_last_sale"]=17
            elif w[0]>0: prod["days_since_last_sale"]=24
            else: prod["days_since_last_sale"]=999
    else:
        prod.update({"week1":0,"week2":0,"week3":0,"week4":0,"last_sale_date":None,"days_since_last_sale":999})
    # добавим avg/total из analytics
    w = [prod.get("week1",0),prod.get("week2",0),prod.get("week3",0),prod.get("week4",0)]
    prod["total"] = sum(w)
    prod["avg"] = round(sum(w)/4,2) if sum(w) else 0
    return _ok(prod)

@app.route('/api/products/sku/<sku>', methods=['GET'])
def api_get_product_sku(sku):
    prod = db.get_product_by_sku(sku)
    if not prod:
        return _err("Товар не найден", 404)
    sales = db.get_sales(prod["id"])
    if sales:
        prod.update({k: sales[k] for k in ("week1","week2","week3","week4")})
    return _ok(prod)

@app.route('/api/products', methods=['POST'])
def api_create_product():
    data = request.get_json(force=True)
    try:
        sku = data.get("sku","").strip()
        name = data.get("name","").strip()
        category = data.get("category","Бытовая химия").strip() or "Бытовая химия"
        price = float(data.get("price",0))
        stock = int(float(data.get("stock",0)))
        w1 = int(float(data.get("week1",0)))
        w2 = int(float(data.get("week2",0)))
        w3 = int(float(data.get("week3",0)))
        w4 = int(float(data.get("week4",0)))
        if not sku or not name:
            return _err("sku и name обязательны")
        pid = db.upsert_product(sku, name, category, price, stock)
        db.upsert_sales(pid, w1,w2,w3,w4)
        return _ok({"id": pid}, "Создан")
    except Exception as e:
        return _err(str(e), 500)

@app.route('/api/products/<int:pid>', methods=['PUT'])
def api_update_product(pid):
    data = request.get_json(force=True)
    try:
        prod = db.get_product_by_id(pid)
        if not prod:
            return _err("Товар не найден",404)
        name = data.get("name")
        category = data.get("category")
        price = data.get("price")
        stock = data.get("stock")
        is_active = data.get("is_active")
        # update product fields if provided (исправлено редактирование)
        kwargs = {}
        if name is not None:
            name = str(name).strip()
            if not name:
                return _err("Название не может быть пустым")
            kwargs["name"] = name
        if category is not None: kwargs["category"] = str(category).strip()
        if price is not None: kwargs["price"] = float(price)
        if stock is not None: kwargs["stock"] = int(float(stock))
        if is_active is not None:
            # принимает 1/0, true/false
            if isinstance(is_active, str):
                is_active = is_active.lower() in ('1','true','yes','да')
            kwargs["is_active"] = bool(is_active)
        if kwargs:
            db.update_product(pid, **kwargs)
        # sales — починено: всегда корректно обновляет даже если частично
        if any(k in data for k in ("week1","week2","week3","week4")):
            sales = db.get_sales(pid) or {"week1":0,"week2":0,"week3":0,"week4":0}
            w1 = int(float(data.get("week1", sales["week1"])))
            w2 = int(float(data.get("week2", sales["week2"])))
            w3 = int(float(data.get("week3", sales["week3"])))
            w4 = int(float(data.get("week4", sales["week4"])))
            db.upsert_sales(pid, w1,w2,w3,w4)
        return _ok({"id": pid}, "Обновлён")
    except Exception as e:
        return _err(str(e),500)

@app.route('/api/products/<int:pid>', methods=['DELETE'])
def api_delete_product(pid):
    try:
        db.delete_product(pid)
        return _ok(msg="Удалён")
    except Exception as e:
        return _err(str(e),500)

@app.route('/api/products/bulk_delete', methods=['POST'])
def api_bulk_delete():
    data = request.get_json(force=True)
    category = data.get("category","").strip()
    ids = data.get("ids") or []
    try:
        if category:
            cnt = db.bulk_delete_by_category(category)
            return _ok({"deleted": cnt}, f"Удалено {cnt} товаров категории {category}")
        elif ids:
            cnt = db.delete_products_by_ids([int(x) for x in ids])
            return _ok({"deleted": cnt}, f"Удалено {cnt} товаров")
        else:
            return _err("Укажите category или ids")
    except Exception as e:
        return _err(str(e),500)

@app.route('/api/settings/plan', methods=['GET','POST'])
def api_plan():
    if request.method == 'GET':
        plan = db.get_monthly_plan()
        # также считаем выполнение плана
        revenue = analytics.total_revenue()
        pct = round(revenue/plan*100,1) if plan else 0
        return _ok({"plan": plan, "revenue": revenue, "pct": pct, "remaining": round(plan - revenue,2)})
    else:
        data = request.get_json(force=True)
        try:
            plan = float(data.get("plan", 0))
            if plan <=0:
                return _err("План должен быть >0")
            db.set_monthly_plan(plan)
            return _ok({"plan": plan}, "План сохранён")
        except Exception as e:
            return _err(str(e),500)

@app.route('/api/categories', methods=['GET'])
def api_categories():
    return _ok(CATEGORIES)

# ---------- Analytics ----------
@app.route('/api/analytics/sales_by_week', methods=['GET'])
def api_sales_by_week():
    return _ok(analytics.sales_by_week())

@app.route('/api/analytics/revenue_by_month', methods=['GET'])
def api_revenue_by_month():
    return _ok(analytics.revenue_by_month())

@app.route('/api/analytics/revenue_by_week', methods=['GET'])
def api_rev_by_week():
    return _ok(analytics.revenue_by_week())

@app.route('/api/analytics/average_check', methods=['GET'])
def api_avg_check():
    return _ok({"avg_check": analytics.average_check(), "revenue": analytics.total_revenue(), "sales_total": analytics.sales_by_week()["total"]})

@app.route('/api/analytics/by_category', methods=['GET'])
def api_by_category():
    return _ok(analytics.sales_by_category())

@app.route('/api/analytics/compare', methods=['GET'])
def api_compare():
    return _ok(analytics.compare_periods())

@app.route('/api/analytics/top', methods=['GET'])
def api_top():
    try:
        n = int(request.args.get('limit',20))
    except:
        n = 20
    return _ok(analytics.top_selling(n))

@app.route('/api/analytics/low_stock', methods=['GET'])
def api_low():
    return _ok(analytics.low_stock())

@app.route('/api/analytics/stale', methods=['GET'])
def api_stale():
    return _ok(analytics.stale_products())

@app.route('/api/analytics/summary', methods=['GET'])
def api_summary():
    s = analytics.sales_by_week()
    rev = analytics.revenue_by_week()
    cmp = analytics.compare_periods()
    cats = analytics.sales_by_category()
    top = analytics.top_selling(5)
    low = analytics.low_stock()
    stale = analytics.stale_products()
    avg_check = analytics.average_check()
    total_rev = analytics.total_revenue()
    plan = db.get_monthly_plan()
    plan_pct = round(total_rev/plan*100,1) if plan else 0
    return _ok({"sales_by_week": s, "revenue_by_week": rev, "compare": cmp, "by_category": cats, "top": top, "low_stock_count": len(low), "stale_count": len(stale), "total_products": db.count_products(), "total_revenue": total_rev, "avg_check": avg_check, "monthly_plan": plan, "plan_pct": plan_pct})

@app.route('/api/analytics/accuracy', methods=['GET'])
def api_accuracy():
    data = analytics.accuracy_last_order()
    if not data:
        return _ok(None, "Нет заказов")
    return _ok(data)

@app.route('/api/analytics/promo_effectiveness', methods=['GET'])
def api_promo_eff():
    return _ok(analytics.promo_effectiveness())

# ---------- Order ----------
@app.route('/api/order/generate', methods=['GET'])
def api_generate():
    category = request.args.get('category','Все')
    only = request.args.get('only_need','true').lower() in ('true','1','yes')
    # search
    search = request.args.get('search','').strip().lower()
    try:
        page = int(request.args.get('page','1'))
        limit = int(request.args.get('limit','0'))
    except:
        page, limit = 1, 0
    if page < 1: page = 1
    items = order_gen.generate_order()
    if category and category != "Все" and category != "Все категории":
        items = [x for x in items if x["category"]==category]
    if only:
        items = [x for x in items if x["recommended"]>0]
    if search:
        items = [x for x in items if search in x["name"].lower() or search in x["sku"].lower()]
    # check deviation for totals (на полном списке до пагинации)
    total_qty = sum(x["recommended"] for x in items)
    total_all = len(items)
    deviation = order_gen.check_deviation(total_qty)
    # пагинация для 3000 товаров — отдаём только страницу
    if limit > 0:
        offset = (page-1)*limit
        paged = items[offset:offset+limit]
        return _ok({"items": paged, "total_qty": total_qty, "total": total_all, "page": page, "limit": limit, "deviation": deviation})
    return _ok({"items": items, "total_qty": total_qty, "deviation": deviation})

@app.route('/api/orders', methods=['GET'])
def api_get_orders():
    return _ok(db.get_orders())

@app.route('/api/orders/<int:oid>', methods=['GET'])
def api_get_order(oid):
    items = db.get_order_items(oid)
    if not items:
        # check if order exists
        orders = db.get_orders()
        if not any(o["id"]==oid for o in orders):
            return _err("Заказ не найден",404)
    return _ok(items)

@app.route('/api/orders', methods=['POST'])
def api_create_order():
    data = request.get_json(force=True)
    items = data.get("items") or data.get("order_items") or []
    notes = data.get("notes","")
    if not items:
        return _err("Пустой заказ")
    # normalize items: expect sku, name, category, price, quantity, stock, avg
    # if frontend sends order/generated items with recommended as quantity
    norm = []
    for it in items:
        # support both formats
        qty = it.get("quantity") if it.get("quantity") is not None else it.get("recommended",0)
        if qty is None:
            qty = 0
        qty = int(qty)
        if qty<=0:
            continue
        norm.append({
            "product_id": it.get("id") or it.get("product_id"),
            "sku": it.get("sku",""),
            "name": it.get("name",""),
            "category": it.get("category",""),
            "price": float(it.get("price",0)),
            "quantity": qty,
            "stock_at_order": it.get("stock", it.get("stock_at_order",0)),
            "avg_sales": it.get("avg", it.get("avg_sales",0))
        })
    if not norm:
        return _err("Нет позиций с количеством >0")
    try:
        oid = db.create_order(norm, notes=notes)
        # clear draft if exists
        try:
            order_gen.clear_draft()
        except:
            pass
        return _ok({"order_id": oid}, "Заказ создан")
    except Exception as e:
        return _err(str(e),500)

@app.route('/api/orders/<int:oid>', methods=['DELETE'])
def api_delete_order(oid):
    try:
        db.delete_order(oid)
        return _ok(msg="Удалён")
    except Exception as e:
        return _err(str(e),500)

@app.route('/api/order/deviation', methods=['GET'])
def api_deviation():
    try:
        total = int(request.args.get('total',0))
    except:
        total = 0
    msg = order_gen.check_deviation(total)
    return _ok({"deviation": msg})

# ---------- Promos ----------
@app.route('/api/promos', methods=['GET'])
def api_get_promos():
    filt = request.args.get('filter','all')
    # use analytics promo_effectiveness for enriched data
    data = analytics.promo_effectiveness()
    # filt is handled on frontend already, but support simple
    return _ok(data)

@app.route('/api/promos', methods=['POST'])
def api_create_promo():
    data = request.get_json(force=True)
    try:
        name = data.get("name","").strip()
        sku = data.get("sku","").strip() or None
        discount = float(data.get("discount",0))
        start = data.get("start_date","").strip()
        end = data.get("end_date","").strip()
        leaflet = 1 if data.get("leaflet") else 0
        if not name or not start or not end:
            return _err("name, start_date, end_date обязательны")
        # validate dates
        datetime.strptime(start, "%Y-%m-%d")
        datetime.strptime(end, "%Y-%m-%d")
        pid = db.add_promo(name, sku, discount, start, end, leaflet=leaflet)
        return _ok({"id": pid}, "Акция создана")
    except Exception as e:
        return _err(str(e),500)

@app.route('/api/promos/<int:pid>', methods=['DELETE'])
def api_del_promo(pid):
    try:
        db.delete_promo(pid)
        return _ok(msg="Удалена")
    except Exception as e:
        return _err(str(e),500)

# ---------- Exports ----------
@app.route('/api/export/pdf/order', methods=['POST'])
def api_export_order_pdf():
    data = request.get_json(force=True)
    items = data.get("items") or []
    if not items:
        return _err("Нет позиций")
    # normalize for pdf_export
    norm = []
    for it in items:
        norm.append({
            "sku": it.get("sku",""),
            "name": it.get("name",""),
            "category": it.get("category",""),
            "price": float(it.get("price",0)),
            "stock": int(it.get("stock",0)),
            "avg": it.get("avg",0),
            "avg_sales": it.get("avg",0),
            "quantity": int(it.get("quantity", it.get("recommended",0))),
            "note": it.get("note","")
        })
    try:
        path = pdf_export.export_order_pdf(norm)
        return send_file(path, as_attachment=True, download_name=os.path.basename(path))
    except Exception as e:
        return _err(str(e),500)

@app.route('/api/export/pdf/sales', methods=['GET'])
def api_export_sales_pdf():
    try:
        path = pdf_export.export_sales_report_pdf(analytics)
        return send_file(path, as_attachment=True, download_name=os.path.basename(path))
    except Exception as e:
        return _err(str(e),500)

@app.route('/api/export/pdf/promo', methods=['GET'])
def api_export_promo_pdf():
    try:
        data = analytics.promo_effectiveness()
        path = pdf_export.export_promo_report_pdf(data)
        return send_file(path, as_attachment=True, download_name=os.path.basename(path))
    except Exception as e:
        return _err(str(e),500)

@app.route('/api/export/pdf/accuracy', methods=['GET'])
def api_export_accuracy_pdf():
    data = analytics.accuracy_last_order()
    if not data:
        return _err("Нет данных для отчёта",404)
    try:
        path = pdf_export.export_accuracy_pdf(data)
        return send_file(path, as_attachment=True, download_name=os.path.basename(path))
    except Exception as e:
        return _err(str(e),500)

@app.route('/api/export/excel/order', methods=['POST'])
def api_export_excel():
    data = request.get_json(force=True)
    items = data.get("items") or []
    if not items:
        return _err("Нет позиций")
    norm = []
    for it in items:
        norm.append({
            "sku": it.get("sku",""),
            "name": it.get("name",""),
            "category": it.get("category",""),
            "price": float(it.get("price",0)),
            "stock": int(it.get("stock",0)),
            "avg_sales": float(it.get("avg",0)),
            "quantity": int(it.get("quantity", it.get("recommended",0))),
            "note": it.get("note","")
        })
    try:
        os.makedirs(REPORTS_DIR, exist_ok=True)
        path = os.path.join(REPORTS_DIR, f"zakaz_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx")
        ExcelHandler(db).export_order_excel(norm, path)
        return send_file(path, as_attachment=True, download_name=os.path.basename(path))
    except Exception as e:
        return _err(str(e),500)

# ---------- Import (CSV удалён) ----------
@app.route('/api/import/excel', methods=['POST'])
def api_import_excel():
    if 'file' not in request.files:
        return _err("Файл не загружен")
    f = request.files['file']
    tmp = os.path.join(REPORTS_DIR, "_upload_tmp.xlsx")
    os.makedirs(REPORTS_DIR, exist_ok=True)
    f.save(tmp)
    res = ExcelHandler(db).import_sales_excel(tmp)
    try:
        os.remove(tmp)
    except:
        pass
    return _ok(res)

# ---------- Health ----------
@app.route('/api/health', methods=['GET'])
def health():
    return _ok({"products": db.count_products(), "time": datetime.now().isoformat()})

if __name__ == '__main__':
    # ensure reports dir
    os.makedirs(REPORTS_DIR, exist_ok=True)
    print(" * Galamart Order Assistant WEB — http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
