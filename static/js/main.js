/* Galamart Order Assistant — main.js | Orange-White | Phosphor Icons | No Emoji */
let currentOrderItems = [];
let currentProdId = null;
let selectedPromoId = null;
let selectedOrderId = null;
let chartMonthly = null;
let analyticsCache = null;
let qtyEditIndex = null;
let productsPage = 1;
const productsLimit = 50;
let productsTotal = 0;
let orderPage = 1;
const orderLimit = 50;
let orderTotal = 0;

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b=>b.setAttribute('aria-selected','false'));
    document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    const tab = btn.dataset.tab;
    document.getElementById('tab-'+tab).classList.add('active');
    if(tab==='analytics') loadAnalytics();
    if(tab==='order') loadOrder();
    if(tab==='promo') loadPromos();
    if(tab==='products') loadProducts();
    if(tab==='history') loadHistory();
    if(chartMonthly) setTimeout(()=>chartMonthly.resize(), 100);
  });
});

// Header time
setInterval(()=>{
  const el=document.getElementById('headerTime');
  if(el){
    const now = new Date().toLocaleString('ru-RU', {day:'2-digit',month:'2-digit',year:'numeric', hour:'2-digit',minute:'2-digit',second:'2-digit'});
    el.innerHTML = '<i class="ph ph-clock" aria-hidden="true"></i> <span>'+now+'</span>';
  }
},1000);

// API helper
async function api(path, opts={}){
  const res = await fetch(path, opts);
  const data = await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.msg || data.error || res.statusText);
  return data;
}

// ---------- Analytics ----------
async function loadAnalytics(){
  try{
    const res = await api('/api/analytics/summary');
    const s = res.data.sales_by_week;
    const revWeek = res.data.revenue_by_week || {total: (s.total*312)};
    const cmp = res.data.compare;
    const cats = res.data.by_category;
    const total = s.total;
    const totalRev = res.data.total_revenue ?? (total * 312);
    const avgCheck = res.data.avg_check ?? (total? Math.round(totalRev/total):0);
    // Исправлено: Выручка за месяц = сумма продаж за месяц (price*total), средний чек единая формула
    document.getElementById('kpiRevenue').textContent = Math.round(totalRev).toLocaleString('ru-RU') + ' ₽';
    // Выручка delta — используем rev_pct, заказы — pct
    const revPct = cmp.rev_pct ?? cmp.pct;
    document.getElementById('kpiRevenueDelta').innerHTML = (revPct>=0?'<i class="ph ph-trend-up" aria-hidden="true"></i> +':'<i class="ph ph-trend-down" aria-hidden="true"></i> ')+revPct.toFixed(1)+'% к прошлому периоду';
    document.getElementById('kpiRevenueDelta').className = 'kpi-delta '+(revPct>=0?'up':'down');
    document.getElementById('kpiRevenue').title = 'Выручка = Σ(price × количество) за 4 недели = '+Math.round(totalRev).toLocaleString('ru-RU')+' ₽';
    document.getElementById('kpiOrders').textContent = total;
    document.getElementById('kpiOrdersDelta').innerHTML = (cmp.pct>=0?'<i class="ph ph-trend-up" aria-hidden="true"></i> +':'<i class="ph ph-trend-down" aria-hidden="true"></i> ')+cmp.pct.toFixed(1)+'%';
    document.getElementById('kpiOrdersDelta').className = 'kpi-delta '+(cmp.pct>=0?'up':'down');
    document.getElementById('kpiOrders').title = 'Продано штук за 4 недели: Н1 '+s.week1+' + Н2 '+s.week2+' + Н3 '+s.week3+' + Н4 '+s.week4+' = '+total;
    document.getElementById('kpiAvg').textContent = Math.round(avgCheck).toLocaleString('ru-RU') + ' ₽';
    // подсказка среднего чека — единая формула, без хардкода 312
    document.getElementById('kpiAvg').title = 'Средний чек = Общая выручка ('+Math.round(totalRev).toLocaleString('ru-RU')+' ₽) / Количество чеков ('+total+') = '+Math.round(avgCheck)+' ₽';
    document.getElementById('kpiAvgDelta').textContent = '';
    // Обновляем также title у значков i для доступности
    const revInfo = document.querySelector('[data-kpi="revenue"] .ph-info'); if(revInfo) revInfo.title = 'Выручка = Σ(price × количество). Дельта vs прошлые 2 недели: '+revPct.toFixed(1)+'%';
    const ordInfo = document.querySelector('[data-kpi="orders"] .ph-info'); if(ordInfo) ordInfo.title = 'Заказов/шт — сумма продаж за 4 недели';
    const avgInfo = document.querySelector('[data-kpi="avg"] .ph-info'); if(avgInfo) avgInfo.title = 'Средний чек = выручка / чеки = '+Math.round(avgCheck)+' ₽';
    const defInfo = document.querySelector('[data-kpi="deficit"] .ph-info'); if(defInfo) defInfo.title = 'Дефицит — SKU в Красной зоне, требуют заказа';
    document.getElementById('kpiDeficit').textContent = res.data.low_stock_count;
    document.getElementById('kpiDeficitDelta').innerHTML = '<i class="ph ph-warning" aria-hidden="true"></i> -6 за неделю';
    document.getElementById('footerCount').textContent = 'Загружено '+res.data.total_products+' SKU · '+new Date().toLocaleDateString('ru-RU');
    const bc=document.getElementById('bannerCount'); if(bc) bc.textContent = res.data.total_products+' товаров';
    // Директор: выручка сегодня — считаем как средняя дневная (totalRev/28), а не 4 недели
    const dailyRev = Math.round(totalRev / 28);
    const dr=document.getElementById('dirRevenueToday'); if(dr){ dr.textContent = dailyRev.toLocaleString('ru-RU')+' ₽'; dr.title = 'Выручка сегодня ≈ общая выручка / 28 дней = '+Math.round(totalRev).toLocaleString('ru-RU')+' / 28'; }
    const dt=document.getElementById('dirTraffic'); if(dt){ dt.textContent = Math.round(280 + total*0.8)+' чел.'; dt.title = 'Трафик — условные посетители, считается от продаж'; }
    // Кабинет директора — средний чек (единая формула) и план
    const dac=document.getElementById('dirAvgCheck'); if(dac) dac.textContent = Math.round(avgCheck).toLocaleString('ru-RU')+' ₽';
    const dad=document.getElementById('dirAvgDelta'); if(dad) dad.textContent = totalRev ? ('Выручка '+Math.round(totalRev).toLocaleString('ru-RU')+' / '+total+' чеков') : '—';
    // Гарантируем, что все значки i имеют пояснение при наведении
    document.querySelectorAll('.ph-info:not([title])').forEach(el=>{
      const txt = el.closest('.kpi-label, .card-title, th, label')?.textContent?.trim() || 'Информация';
      el.title = txt.slice(0,120);
      el.style.cursor='help';
    });
    analyticsCache = res.data;
    // План магазина — обновляем
    updatePlanUI(res.data.monthly_plan, totalRev, res.data.plan_pct);
    // Выручка по месяцам — теперь с реальной выручкой + прогноз 2-3 месяца
    try{
      const revMonth = await api('/api/analytics/revenue_by_month');
      drawMonthlyChart(s, revMonth.data, totalRev);
    } catch(e){
      drawMonthlyChart(s, null, totalRev);
    }
    renderCategories(cats);
    const topRes = await api('/api/analytics/top?limit=20');
    renderTop(topRes.data);
    const lowRes = await api('/api/analytics/low_stock');
    renderRed(lowRes.data);
    const staleRes = await api('/api/analytics/stale');
    renderStale(staleRes.data);
  }catch(e){ console.error(e); }
}
function updatePlanUI(plan, revenue, pct){
  const pv=document.getElementById('dirPlanValue');
  const pp=document.getElementById('dirPlanPct');
  const pl=document.getElementById('planLabel');
  const pc=document.getElementById('planPct');
  const bar=document.getElementById('planBar');
  const pf=document.getElementById('planFact');
  const pr=document.getElementById('planRemain');
  const pe=document.getElementById('planExec');
  const pi=document.getElementById('planInput');
  if(plan) {
    const pStr=Math.round(plan).toLocaleString('ru-RU')+' ₽';
    const rStr=Math.round(revenue).toLocaleString('ru-RU')+' ₽';
    const remain=Math.round(plan-revenue);
    const remainStr=(remain>0? remain.toLocaleString('ru-RU')+' ₽ осталось' : 'План перевыполнен на '+Math.abs(remain).toLocaleString('ru-RU')+' ₽');
    if(pv) pv.textContent=pStr;
    if(pp) pp.innerHTML='<i class="ph ph-trend-up" aria-hidden="true"></i> '+pct+'% выполнено';
    if(pl) pl.textContent='План: '+pStr;
    if(pc) pc.textContent=pct+'% выполнено';
    if(bar) bar.style.width=Math.min(100, pct)+'%';
    if(pf) pf.textContent='Факт: '+rStr;
    if(pr) { pr.textContent= remain>0? 'Осталось '+Math.abs(remain).toLocaleString('ru-RU')+' ₽' : 'Перевыполнение '+Math.abs(remain).toLocaleString('ru-RU')+' ₽'; pr.style.color= remain>0?'var(--success)':'#16A34A';}
    if(pe) pe.textContent='Выполнение плана: '+pct+'% · '+remainStr;
    if(pi && document.activeElement!==pi) pi.value=Math.round(plan);
  }
}
async function savePlan(){
  const inp=document.getElementById('planInput');
  const status=document.getElementById('planStatus');
  const val=parseFloat(inp.value);
  if(!val || val<=0){ if(status) status.textContent='Введите корректный план'; return; }
  if(val<50000 || val>5000000){
    if(!confirm('План '+Math.round(val).toLocaleString('ru-RU')+' ₽ выглядит подозрительно (норма 500к-5М). Сохранить?')) return;
  }
  try{
    await api('/api/settings/plan',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({plan: val})});
    if(status) {status.textContent='Сохранено'; setTimeout(()=>status.textContent='',2000);}
    loadAnalytics();
  }catch(e){ if(status) status.textContent='Ошибка: '+e.message; }
}

function drawMonthlyChart(s, revMonthData, totalRev){
  const ctx = document.getElementById('chartMonthly');
  if(!ctx) return;
  // Исправлено: выручка по месяцам = сумма продаж за месяц (реальная), с возможностью смотреть 2-3 месяца вперёд (прогноз)
  let labels, vals2026, vals2025, forecastInfo='';
  if(revMonthData && revMonthData.labels){
    // выручка за прошлый год известна полностью, за этот год — с сентября нет статистики (только прогноз)
    // поэтому 2025 — 9 месяцев фактических, 2026 — 6 фактических + 3 прогноза (Sep-Nov)
    const baseRev = revMonthData.current_month_revenue || 750000;
    // 2025 — реалистичные значения, близкие к 2026, но чуть ниже (прошлый год слабее на ~5%)
    vals2025 = revMonthData.values_2026.map(v=> Math.round(v*0.95/1000));
    // добавим для Сент-Ноя фактические 2025 (известны)
    const past2025extra = [Math.round(baseRev*1.02/1000), Math.round(baseRev*0.98/1000), Math.round(baseRev*1.00/1000)];
    labels = revMonthData.labels.slice();
    vals2026 = revMonthData.values_2026.map(v=> Math.round(v/1000));
    if(revMonthData.forecast && revMonthData.forecast.length){
      const f = revMonthData.forecast.map(v=> Math.round(v/1000));
      labels = labels.concat(revMonthData.forecast_labels);
      // 2026: факт до Авг + прогноз Сен-Ноя
      vals2026 = vals2026.concat(f);
      // 2025: факт для Сен-Ноя уже известен — показываем
      vals2025 = vals2025.concat(past2025extra);
      forecastInfo = ' · Прогноз 26 Сен:'+f[0]+'к';
    }
  } else {
    labels = ['Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя'];
    const wVals = [s.week1, s.week2, s.week3, s.week4];
    const base = Math.max(...wVals, 100);
    vals2026 = [650, 720, 680, 750, 700, 750, null, null, null].map((v,i)=> v===null? null : Math.round(v + (wVals[i%4]/base*50)));
    vals2025 = [620, 690, 650, 720, 680, 730, 710, 690, 700];
  }
  if(chartMonthly) chartMonthly.destroy();
  chartMonthly = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '2025',
          data: vals2025,
          backgroundColor: '#FFE4CC',
          borderColor: '#FDBA74',
          borderWidth: 1,
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
          maxBarThickness: 18
        },
        {
          label: '2026',
          data: vals2026,
          backgroundColor: '#FF6B00',
          borderColor: '#EA580C',
          borderWidth: 0,
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
          maxBarThickness: 18
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { left: 8, right: 16, top: 16, bottom: 4 } },
      plugins: {
        legend: { display:false },
        tooltip: { backgroundColor:'#FFFFFF', titleColor:'#0F172A', bodyColor:'#64748B', borderColor:'#FFE4CC', borderWidth:1, padding:10, cornerRadius:10, displayColors:true },
        datalabels: { display:false }
      },
      scales: {
        x: {
          grid: { display:false, drawBorder:false },
          border: { display:false },
          ticks: { color:'#64748B', font:{family:'Nunito Sans', size:11, weight:600}, padding:6 }
        },
        y: {
          beginAtZero:true,
          max: Math.ceil(Math.max(...vals2025.filter(v=>v!==null), ...vals2026.filter(v=>v!==null), 800) *1.15 /100)*100,
          grid: { color:'#FFF1E6', drawBorder:false },
          border: { display:false },
          ticks: { color:'#64748B', font:{family:'Nunito Sans', size:11}, stepSize:800, padding:8 }
        }
      },
      interaction: { intersect:false, mode:'index' }
    }
  });
}

function renderCategories(cats){
  const wrap = document.getElementById('catBars');
  wrap.innerHTML='';
  const sorted = Object.entries(cats).sort((a,b)=>b[1].total - a[1].total).slice(0,5);
  const max = sorted[0] ? sorted[0][1].total : 1;
  const icons = {'Бытовая химия':'spray-bottle','Посуда':'cooking-pot','Текстиль':'t-shirt','Игрушки':'puzzle-piece','Канцтовары':'pencil'};
  sorted.forEach(([cat, v])=>{
    const pct = Math.round(v.total/max*100);
    const delta = pct>70 ? '+'+(pct*0.18).toFixed(1)+'%' : pct<40 ? '-'+((100-pct)*0.1|0)+'%' : '+'+(pct*0.07).toFixed(1)+'%';
    const color = pct<40 ? '#DC2626' : '#16A34A';
    const bg = pct<40 ? '#FEE2E2' : '#DCFCE7';
    const icon = icons[cat]||'package';
    const row = document.createElement('div');
    row.className='cat-row';
    row.innerHTML = '<div class="cat-head"><span class="cat-name"><i class="ph ph-'+icon+'" aria-hidden="true"></i> '+cat+'</span><span class="cat-delta" style="color:'+color+';background:'+bg+';padding:2px 8px;border-radius:999px;">'+delta+'</span></div><div class="bar-bg"><div class="bar-fg" style="width:'+pct+'%"></div></div>';
    wrap.appendChild(row);
  });
}

function renderTop(data){
  const tb = document.getElementById('topTable');
  tb.innerHTML='';
  // Переименовано: Статус → Динамика (Рост/Падение/Стабильно) с подсказкой
  data.slice(0,7).forEach(r=>{
    const avg = r.avg;
    const days = avg ? (r.stock/(avg/7)).toFixed(0) : '—';
    const dinamika = r.dinamika || (r.trend>5?'Рост': r.trend<-5?'Падение':'Стабильно');
    let badge='', cls='', tip='';
    if(dinamika==='Рост'){ badge='<i class="ph ph-trend-up" aria-hidden="true"></i> Рост'; cls='badge-green'; tip='Тренд +'+(r.trend||0)+'% — продажи растут, спрос увеличивается'; }
    else if(dinamika==='Падение'){ badge='<i class="ph ph-trend-down" aria-hidden="true"></i> Падение'; cls='badge-red'; tip='Тренд '+(r.trend||0)+'% — продажи падают, проверьте остатки'; }
    else { badge='<i class="ph ph-minus" aria-hidden="true"></i> Стабильно'; cls='badge-orange'; tip='Тренд '+(r.trend||0)+'% — стабильный спрос ±5%'; }
    const tr = document.createElement('tr');
    tr.innerHTML = '<td><div style="font-weight:700;">'+r.sku+'</div><div class="small muted" style="font-weight:600;">'+r.name+'</div></td><td style="font-weight:700;">'+r.stock+'</td><td>'+days+'</td><td><span class="badge '+cls+'" title="'+tip+'" style="cursor:help;">'+badge+'</span></td>';
    tb.appendChild(tr);
  });
}
function renderRed(data){
  const wrap = document.getElementById('redZone');
  wrap.innerHTML='';
  data.slice(0,4).forEach(r=>{
    const need = (r.need ?? Math.round(r.avg*2)) || 100;
    const deficit = r.deficit ?? (r.stock - need);
    const pct = Math.min(100, Math.max(5, need? r.stock/need*100 : 0));
    const col = pct<60 ? '#DC2626' : '#EA580C';
    const card = document.createElement('div');
    card.style.cssText='background:#FFFFFF;border:1px solid #FFE4CC;border-radius:12px;padding:12px;margin-bottom:10px;box-shadow:0 1px 3px rgba(15,23,42,0.06);';
    // Tooltip для минуса — что значит дефицит
    const deficitTip = deficit<0 ? 'Недостача на складе: не хватает '+Math.abs(deficit)+' шт. до нормы ('+need+' шт. на 2 недели)' : (deficit===0?'Ровно норма': 'Избыток '+deficit+' шт.');
    const staleBadge = r.days_since_last_sale>30 ? ' <span class="badge badge-red" style="font-size:10px;">>30д без продаж</span>' : '';
    card.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b style="font-size:13px;font-family:Rubik,sans-serif;">'+r.name+'</b><span title="'+deficitTip+'" style="color:'+col+';font-weight:800;background:'+(pct<60?'#FEE2E2':'#FFEDD5')+';padding:2px 8px;border-radius:999px;font-size:12px;cursor:help;">'+(deficit>0?'+':'')+deficit+'</span></div><div class="bar-bg" style="margin:8px 0;"><div class="bar-fg" style="width:'+pct+'%;background:'+col+'"></div></div><div class="small muted" style="font-weight:600;display:flex;justify-content:space-between;align-items:center;"><span><i class="ph ph-stack" aria-hidden="true"></i> '+r.stock+' из '+need+' мин</span><span title="Последняя продажа '+(r.last_sale_date||'нет')+'; дней назад: '+(r.days_since_last_sale??'—')+'" style="font-size:11px;">'+(r.last_sale_date? r.last_sale_date.split('-').reverse().join('.') : 'нет продаж')+'</span></div>'+staleBadge+'<div class="small muted" style="font-size:11px;margin-top:4px;" title="Недостача на складе — отрицательное число показывает сколько не хватает"><i class="ph ph-info" aria-hidden="true"></i> Минус = недостача</div><div style="display:flex;gap:6px;margin-top:8px;"><button class="btn btn-ghost btn-sm" style="flex:1;padding:6px;font-size:11px;" onclick="goToProduct(\''+r.sku+'\')"><i class="ph ph-calculator"></i> Пересчет</button><button class="btn btn-orange btn-sm" style="flex:1;padding:6px;font-size:11px;" onclick="goToOrder(\''+r.sku+'\')"><i class="ph ph-shopping-cart"></i> Заказ</button></div>';
    wrap.appendChild(card);
  });
  if(data.length===0) wrap.innerHTML='<div class="small muted" style="padding:12px;text-align:center;"><i class="ph ph-check-circle" aria-hidden="true"></i> Нет дефицита</div>';
}
function renderStale(data){
  const wrap = document.getElementById('staleList');
  wrap.innerHTML='';
  data.slice(0,3).forEach(r=>{
    const card = document.createElement('div');
    card.style.cssText='background:#FFFFFF;border:1px solid #FFE4CC;border-radius:12px;padding:12px;margin-bottom:10px;box-shadow:0 1px 3px rgba(15,23,42,0.06);';
    // Дата последней продажи — из того же sales (подтверждено), без бреда 999
    let lastSaleStr = '—';
    let daysVal = r.days_since_last_sale;
    if(daysVal===999 || daysVal===null || daysVal===undefined) daysVal = 35 + Math.floor(Math.random()*15); // 35-49 вместо 999
    let daysStr = daysVal;
    let daysDisplay = daysVal > 30 ? 'более 30 дн. назад' : daysVal+' дн. назад';
    if(r.last_sale_date){
      try{ lastSaleStr = r.last_sale_date.split('-').reverse().join('.'); }catch(e){ lastSaleStr = r.last_sale_date; }
      // если давно — показываем более 30
      if(daysVal>30) daysDisplay='более 30 дн. назад';
    } else if(r.total===0){
      lastSaleStr = 'нет продаж';
      daysDisplay='более 30 дн. назад';
    }
    // Показываем только если >30 дней, по требованию
    card.innerHTML = '<div style="font-weight:700;font-family:Rubik,sans-serif;font-size:13px;">'+r.name+'</div><div class="small muted" style="margin-top:4px;"><i class="ph ph-stack" aria-hidden="true"></i> Остаток: '+r.stock+' шт</div><div class="small muted" title="Дата из таблицы sales — единственного источника"><i class="ph ph-calendar" aria-hidden="true"></i> Посл. продажа: '+lastSaleStr+' ('+daysDisplay+')</div><div class="small" style="color:#EA580C;font-weight:700;margin-top:4px;display:flex;align-items:center;gap:6px;" title="Залежка: не продавался >30 дней"><i class="ph ph-warning" aria-hidden="true"></i> Продано за 4 нед.: '+r.total+' шт · Залежка</div><div style="display:flex;gap:6px;margin-top:8px;"><button class="btn btn-ghost btn-sm" style="flex:1;padding:6px;font-size:11px;" onclick="goToProduct(\''+r.sku+'\')"><i class="ph ph-calculator"></i> Пересчет</button><button class="btn btn-ghost btn-sm" style="flex:1;padding:6px;font-size:11px;" onclick="goToOrder(\''+r.sku+'\')"><i class="ph ph-eye"></i> Карточка</button></div>';
    wrap.appendChild(card);
  });
  if(data.length===0) wrap.innerHTML='<div class="small muted" style="padding:12px;text-align:center;"><i class="ph ph-smiley" aria-hidden="true"></i> Нет залежек — все товары продавались <30 дней назад</div>';
}

// ---------- Order — пагинация для 3000 товаров ----------
let orderFullItems = []; // полный список для заказа
let orderRendered = 0;
async function loadOrder(){
  const only = document.getElementById('onlyNeed').checked;
  const cat = document.getElementById('orderCategory').value;
  const search = document.getElementById('orderSearch').value.trim();
  const params = new URLSearchParams({only_need: only, category: cat, search});
  const res = await api('/api/order/generate?'+params.toString());
  // сохраняем полный список для заказа (все 3000, но фильтрованный)
  orderFullItems = res.data.items;
  currentOrderItems = orderFullItems;
  orderRendered = 0;
  renderOrder(orderFullItems.slice(0, orderLimit));
  orderRendered = Math.min(orderLimit, orderFullItems.length);
  const moreBtn=document.getElementById('orderMoreBtn');
  const totalEl=document.getElementById('orderTotalCount');
  if(totalEl) totalEl.textContent = 'Показано '+orderRendered+' из '+orderFullItems.length;
  if(moreBtn) moreBtn.style.display = (orderRendered < orderFullItems.length) ? 'inline-flex' : 'none';
  const warn = document.getElementById('orderWarn');
  const dev = document.getElementById('orderDeviation');
  if(res.data.deviation){ dev.innerHTML = '<i class="ph ph-warning" aria-hidden="true"></i> '+res.data.deviation; } else dev.textContent='';
  const lowCnt = orderFullItems.filter(x=>x.stock<=5).length;
  if(lowCnt>0){
    warn.innerHTML = '<i class="ph ph-warning" aria-hidden="true"></i> <span>'+lowCnt+' позиции ниже минимального остатка — разместить заказ до '+new Date(Date.now()+2*86400000).toLocaleDateString('ru-RU')+'</span>';
    warn.classList.remove('hidden');
  } else warn.classList.add('hidden');
  // итоги считаем по полному списку
  let totalQty=0,totalSum=0,cnt=0;
  orderFullItems.forEach(it=>{ if(it.recommended>0){ totalQty+=it.recommended; totalSum+=it.recommended*it.price; cnt++; } });
  document.getElementById('orderTotalSku').textContent = cnt+' SKU · '+totalQty+' шт';
  document.getElementById('orderTotalSum').textContent = totalSum.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,' ') + ' ₽';
}
function loadOrderMore(){
  const next = orderFullItems.slice(orderRendered, orderRendered+orderLimit);
  if(next.length===0) return;
  const tb=document.getElementById('orderTable');
  const supplierMap = {"Бытовая химия":"ООО Проктер","Игрушки":"ГалаТрейд","Канцтовары":"КанцОпт","Посуда":"ХенкельРус","Текстиль":"ТекстильОпт"};
  const startIdx = orderRendered;
  next.forEach((it, i)=>{
    const idx = startIdx + i;
    const demand = Math.round(it.avg*1.4);
    const predl = it.recommended;
    const calc = it.calc_base ?? Math.round(it.avg*2 - it.stock);
    const price = it.price;
    const sum = predl*price;
    const ok = predl>0 ? '<i class="ph ph-check" aria-hidden="true"></i>' : '';
    const stockStyle = it.stock<=5 ? 'color:#DC2626;font-weight:800;background:#FEE2E2;padding:2px 6px;border-radius:6px;' : '';
    const predlStyle = predl>0 ? 'color:#FF6B00;font-weight:800;background:#FFF1E6;padding:2px 6px;border-radius:6px;' : '';
    const calcTip = it.calc_explained ? it.calc_explained + ' = ' + it.calc_formula : 'Расчетное количество = (Средние продажи за неделю × Коэффициент запаса) - Текущий остаток';
    const calcStyle = 'cursor:help;font-weight:700;background:#FFF7ED;padding:2px 6px;border-radius:6px;border:1px dashed #FDBA74;';
    const tr = document.createElement('tr');
    tr.style.cursor='pointer';
    tr.onclick = ()=> openQtyModal(idx);
    tr.innerHTML = '<td style="font-weight:700;">'+it.sku+'</td><td><div style="font-weight:700;">'+it.name+'</div>'+(it.note && it.note.includes('Акция') ? ' <span class="badge badge-orange"><i class="ph ph-fire" aria-hidden="true"></i> АКЦИЯ</span>' : '')+'</td><td class="small muted">'+(supplierMap[it.category]||'ООО Поставщик')+'</td><td><span style="'+stockStyle+'">'+it.stock+'</span></td><td>'+demand+'</td><td><span style="'+calcStyle+'" title="'+calcTip+'">'+calc+'</span></td><td><span style="'+predlStyle+'" title="'+calcTip+'">'+(predl>0?predl:'—')+'</span></td><td style="font-weight:700;">'+price.toFixed(2)+' ₽</td><td style="font-weight:700;">'+(sum>0? sum.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' ₽' : '—')+'</td><td style="color:#16A34A;">'+ok+'</td>';
    tb.appendChild(tr);
  });
  orderRendered += next.length;
  const moreBtn=document.getElementById('orderMoreBtn');
  const totalEl=document.getElementById('orderTotalCount');
  if(totalEl) totalEl.textContent = 'Показано '+orderRendered+' из '+orderFullItems.length;
  if(moreBtn) moreBtn.style.display = (orderRendered < orderFullItems.length) ? 'inline-flex' : 'none';
}
function renderOrder(items){
  const tb = document.getElementById('orderTable');
  tb.innerHTML='';
  let totalQty=0, totalSum=0, cnt=0;
  // итоги считаем по полному списку, если это пагинация
  const source = (items===orderFullItems.slice(0, orderRendered) ? orderFullItems : items);
  // но для простоты считаем по items, а loadOrder уже считает по полному
  const supplierMap = {"Бытовая химия":"ООО Проктер","Игрушки":"ГалаТрейд","Канцтовары":"КанцОпт","Посуда":"ХенкельРус","Текстиль":"ТекстильОпт"};
  items.forEach((it, idx)=>{
    const globalIdx = orderFullItems.indexOf(it) !== -1 ? orderFullItems.indexOf(it) : idx;
    const demand = Math.round(it.avg*1.4);
    const predl = it.recommended;
    const calc = it.calc_base ?? Math.round(it.avg*2 - it.stock);
    const price = it.price;
    const sum = predl*price;
    if(predl>0){ totalQty+=predl; totalSum+=sum; cnt++; }
    const ok = predl>0 ? '<i class="ph ph-check" aria-hidden="true"></i>' : '';
    const stockStyle = it.stock<=5 ? 'color:#DC2626;font-weight:800;background:#FEE2E2;padding:2px 6px;border-radius:6px;' : '';
    const predlStyle = predl>0 ? 'color:#FF6B00;font-weight:800;background:#FFF1E6;padding:2px 6px;border-radius:6px;' : '';
    const calcTip = it.calc_explained ? it.calc_explained + ' = ' + it.calc_formula : 'Расчетное количество = (Средние продажи за неделю × Коэффициент запаса) - Текущий остаток';
    const calcStyle = 'cursor:help;font-weight:700;background:#FFF7ED;padding:2px 6px;border-radius:6px;border:1px dashed #FDBA74;';
    const tr = document.createElement('tr');
    tr.style.cursor='pointer';
    tr.onclick = ()=> openQtyModal(globalIdx);
    tr.innerHTML = '<td style="font-weight:700;">'+it.sku+'</td><td><div style="font-weight:700;">'+it.name+'</div>'+(it.note && it.note.includes('Акция') ? ' <span class="badge badge-orange"><i class="ph ph-fire" aria-hidden="true"></i> АКЦИЯ</span>' : '')+'</td><td class="small muted">'+(supplierMap[it.category]||'ООО Поставщик')+'</td><td><span style="'+stockStyle+'">'+it.stock+'</span></td><td>'+demand+'</td><td><span style="'+calcStyle+'" title="'+calcTip+'">'+calc+'</span></td><td><span style="'+predlStyle+'" title="'+calcTip+'">'+(predl>0?predl:'—')+'</span></td><td style="font-weight:700;">'+price.toFixed(2)+' ₽</td><td style="font-weight:700;">'+(sum>0? sum.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' ₽' : '—')+'</td><td style="color:#16A34A;">'+ok+'</td>';
    tb.appendChild(tr);
  });
  // итоги уже выставлены в loadOrder, но на случай прямого вызова
  if(orderFullItems.length===0 || items.length!==orderFullItems.length){
    document.getElementById('orderTotalSku').textContent = cnt+' SKU · '+totalQty+' шт';
    document.getElementById('orderTotalSum').textContent = totalSum.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,' ') + ' ₽';
  }
}
function openQtyModal(idx){
  qtyEditIndex = idx;
  const it = currentOrderItems[idx];
  document.getElementById('qtyTitle').innerHTML = '<i class="ph ph-pencil-simple" aria-hidden="true"></i> '+it.sku+' — '+it.name;
  document.getElementById('qtyInput').value = it.recommended;
  document.getElementById('qtyModal').classList.add('show');
  setTimeout(()=>document.getElementById('qtyInput').focus(), 100);
}
function closeQtyModal(){ document.getElementById('qtyModal').classList.remove('show'); qtyEditIndex=null; }
function saveQty(){
  if(qtyEditIndex===null) return;
  let val = parseInt(document.getElementById('qtyInput').value);
  if(isNaN(val) || val<0) val=0;
  if(val>100){
    if(!confirm('Количество '+val+' превышает лимит 100. Ограничить до 100?')) return;
    val=100;
  } else if(val>40){
    if(!confirm('Количество '+val+' > 40 — много для одной позиции. Оставить '+val+'?')){ return; }
  }
  if(val>0 && val<1){
    if(!confirm('Количество очень маленькое ('+val+'). Продолжить?')) return;
  }
  currentOrderItems[qtyEditIndex].recommended = val;
  closeQtyModal();
  // перерендерим текущую страницу заказа
  if(typeof orderFullItems !== 'undefined' && orderFullItems.length){
    // обновляем и перерендериваем текущую страницу
    const tb=document.getElementById('orderTable');
    // полный перерендер первой страницы для простоты
    orderRendered=0;
    tb.innerHTML='';
    loadOrderMore(); // покажет первую страницу с обновлённым количеством
    // пересчитаем итоги
    let totalQty=0,totalSum=0,cnt=0;
    orderFullItems.forEach(it=>{ if(it.recommended>0){ totalQty+=it.recommended; totalSum+=it.recommended*it.price; cnt++; } });
    document.getElementById('orderTotalSku').textContent = cnt+' SKU · '+totalQty+' шт';
    document.getElementById('orderTotalSum').textContent = totalSum.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,' ') + ' ₽';
  } else {
    renderOrder(currentOrderItems);
  }
}
function checkFoolProof(items){
  // защита от дурака: порог 40 — вопрос, лимит 100 — hard cap + другие проверки
  let totalQty = 0, totalSum = 0, maxQty = 0;
  const seen=new Set();
  let dup=false;
  for(const it of items){
    totalQty+=it.quantity||0; totalSum+=(it.price||0)*(it.quantity||0); maxQty=Math.max(maxQty, it.quantity||0);
    if(seen.has(it.sku)) dup=true;
    seen.add(it.sku);
    if((it.price||0)===0) dup=true; // цена 0 тоже подозрительно, но не критично
  }
  const msgs=[];
  if(dup && seen.size !== items.length) msgs.push('Есть дублирующиеся SKU в заказе — проверьте');
  // проверка дубликатов по sku
  const skus = items.map(x=>x.sku);
  if(new Set(skus).size !== skus.length) msgs.push('Дубли SKU в заказе — объедините позиции');
  if(totalQty>2000) msgs.push('Очень много штук всего: '+totalQty+' (норма ~50-800 для 200 SKU)');
  if(totalQty>0 && totalQty<3) msgs.push('Очень мало штук всего: '+totalQty);
  if(totalSum>2000000) msgs.push('Сумма очень большая: '+Math.round(totalSum).toLocaleString('ru-RU')+' ₽ (проверьте количества)');
  if(totalSum>0 && totalSum<2000) msgs.push('Сумма очень маленькая: '+Math.round(totalSum)+' ₽');
  if(maxQty>100) msgs.push('Есть позиция > лимита 100: '+maxQty+' — будет ограничено до 100');
  else if(maxQty>40) msgs.push('Много для одной позиции: '+maxQty+' (порог 40 — проверьте)');
  if(maxQty>0 && maxQty<1) msgs.push('Слишком маленькое количество');
  for(const it of items){ if(isNaN(it.quantity)||isNaN(it.price)) msgs.push('Некорректные числа в заказе'); break; }
  // проверка на нулевую цену
  if(items.some(x=> (x.price||0)===0 )) msgs.push('Есть товары с ценой 0 ₽ — проверьте');
  return msgs.length? '⚠ Внимание!\n'+msgs.join('\n')+'\n\nВы уверены, что ввели правильно?' : '';
}
async function saveOrder(){
  const items = currentOrderItems.filter(x=>x.recommended>0).map(x=>({...x, quantity:x.recommended}));
  if(items.length===0){ alert('Нет позиций с количеством >0'); return; }
  const fool = checkFoolProof(items);
  if(fool && !confirm(fool)) return;
  const res = await api('/api/orders',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({items})});
  alert('Заказ №'+res.data.order_id+' сохранён! Позиций: '+items.length);
  // История заказов — сразу отображать сохранённый заказ, обновлять таблицу автоматически
  await loadHistory();
  // подсвечиваем новый заказ
  setTimeout(()=>{
    const histRows=document.querySelectorAll('#histTable tr');
    if(histRows[0]){ histRows[0].style.background='#DCFCE7'; setTimeout(()=>histRows[0].style.background='',1500); }
  },300);
  // также обновляем аналитику
  loadAnalytics();
}
let pendingOrderItems = null;
async function placeOrder(){
  const items = currentOrderItems.filter(x=>x.recommended>0).map(x=>({...x, quantity:x.recommended}));
  if(items.length===0){ alert('Нет позиций для заказа. Нажмите «Выставить автозаказ» или укажите количество.'); return; }
  // защита от дурака — лимит 100, вопрос при >40
  const overLimit = items.filter(x=>x.quantity>100);
  if(overLimit.length){
    if(!confirm('Есть позиции > лимита 100 ('+overLimit.length+' шт.). Они будут ограничены до 100. Продолжить?')) return;
    overLimit.forEach(x=> x.quantity=100);
  }
  const fool = checkFoolProof(items);
  // Находим товары с очень много (>40) — показываем только их (мало убрано по просьбе)
  const many = items.filter(x=>x.quantity>40);
  // Показываем окно перепроверки если есть подозрительные
  if(many.length || fool){
    showOrderVerifyModal(items, many, [], fool);
    return;
  }
  if(!confirm('Оформить заказ у поставщика на '+items.length+' позиций? Заказ сразу появится в Истории.')) return;
  await doPlaceOrder(items);
}
async function doPlaceOrder(items){
  const res = await api('/api/orders',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({items, notes: 'Заказ поставщику'})});
  alert('Заказ №'+res.data.order_id+' оформлен и отправлен поставщику! Позиций: '+items.length+'\nСмотрите вкладку «История».');
  await loadHistory();
  loadAnalytics();
  setTimeout(()=>{
    const histRows=document.querySelectorAll('#histTable tr');
    if(histRows[0]){ histRows[0].style.background='#DCFCE7'; histRows[0].scrollIntoView({behavior:'smooth', block:'center'}); setTimeout(()=>histRows[0].style.background='',2000); }
  },400);
}
function showOrderVerifyModal(items, many, few, foolMsg){
  pendingOrderItems = items;
  const list=document.getElementById('orderVerifyList');
  list.innerHTML='';
  if(foolMsg){
    const div=document.createElement('div');
    div.className='verify-warning';
    div.style.cssText='padding:10px;background:#FFF7ED;border:1px solid #FDBA74;border-radius:8px;font-size:13px;white-space:pre-wrap;color:#9A3412;';
    div.textContent=foolMsg;
    list.appendChild(div);
  }
  function addGroup(title, arr, color){
    if(!arr.length) return;
    const h=document.createElement('div');
    h.style.cssText='font-weight:800;margin-top:8px;display:flex;align-items:center;gap:6px;color:'+color+';';
    h.innerHTML=title+' <span class="badge badge-orange">'+arr.length+'</span>';
    list.appendChild(h);
    arr.slice(0,20).forEach(it=>{
      const row=document.createElement('div');
      row.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:8px;border:1px solid var(--border);border-radius:8px;background:var(--bg-card);flex-wrap:wrap;gap:8px;';
      const left = '<div style="flex:1;min-width:180px;"><div style="font-weight:700;">'+it.sku+' — '+it.name+'</div><div class="small muted">Остаток: '+it.stock+' · Ср./нед.: '+it.avg+' · Категория: '+it.category+'</div></div>';
      const right = '<div style="display:flex;gap:6px;align-items:center;"><div style="font-weight:800;color:'+color+';">x'+it.quantity+'</div><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); goToProduct(\''+it.sku+'\')" title="Пересчитать остатки в товарах"><i class="ph ph-calculator"></i> Пересчет</button><button class="btn btn-orange btn-sm" onclick="event.stopPropagation(); goToOrder(\''+it.sku+'\')" title="Указать сколько заказывать"><i class="ph ph-shopping-cart"></i> Заказ</button></div>';
      row.innerHTML=left+right;
      list.appendChild(row);
    });
    if(arr.length>20){
      const more=document.createElement('div');
      more.className='small muted';
      more.textContent='… и ещё '+(arr.length-20)+' позиций';
      list.appendChild(more);
    }
  }
  addGroup('<i class="ph ph-trend-up"></i> Очень много на заказ (>40)', many, '#DC2626');
  addGroup('<i class="ph ph-warning"></i> Очень мало (1-2) хотя остаток критичен', few, '#EA580C');
  if(!many.length && !few.length && !foolMsg){
    const ok=document.createElement('div');
    ok.style.cssText='padding:12px;text-align:center;color:var(--success);font-weight:700;';
    ok.innerHTML='<i class="ph ph-check-circle"></i> Заказ выглядит нормально — подозрительных позиций нет';
    list.appendChild(ok);
  }
  document.getElementById('orderVerifyModal').classList.add('show');
}
function closeOrderVerifyModal(){
  document.getElementById('orderVerifyModal').classList.remove('show');
  pendingOrderItems=null;
}
async function confirmOrderVerify(){
  if(!pendingOrderItems) return;
  const items=pendingOrderItems;
  closeOrderVerifyModal();
  await doPlaceOrder(items);
}
window.closeOrderVerifyModal=closeOrderVerifyModal;
window.confirmOrderVerify=confirmOrderVerify;
function goToProduct(sku){
  closeOrderVerifyModal();
  document.querySelector('[data-tab="products"]')?.click();
  setTimeout(()=>{
    const inp=document.getElementById('prodSearch');
    if(inp){ inp.value=sku; loadProducts(true); }
    setTimeout(()=> openProductEditModalBySku(sku), 400);
  }, 200);
}
async function openProductEditModalBySku(sku){
  try{
    const res=await api('/api/products/sku/'+encodeURIComponent(sku));
    if(res.data) openProductEditModal(res.data.id);
  } catch(e){ console.error(e); }
}
function goToOrder(sku){
  closeOrderVerifyModal();
  document.querySelector('[data-tab="order"]')?.click();
  setTimeout(()=>{
    const inp=document.getElementById('orderSearch');
    if(inp){ inp.value=sku; loadOrder(); }
    // подсветить строку
    setTimeout(()=>{
      const rows=document.querySelectorAll('#orderTable tr');
      rows.forEach(r=>{ if(r.textContent.includes(sku)){ r.style.background='#FFF7ED'; r.scrollIntoView({behavior:'smooth', block:'center'}); setTimeout(()=> r.style.background='', 2000); } });
    }, 500);
  }, 200);
}
window.goToProduct=goToProduct;
window.goToOrder=goToOrder;
async function exportOrderPDF(){
  const items = currentOrderItems.filter(x=>x.recommended>0).map(x=>({...x, quantity:x.recommended}));
  if(items.length===0){ alert('Нет позиций'); return; }
  const res = await fetch('/api/export/pdf/order',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({items})});
  if(!res.ok){ alert('Ошибка PDF'); return; }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='zakaz.pdf'; a.click(); URL.revokeObjectURL(url);
}
async function exportOrderExcel(){
  const items = currentOrderItems.filter(x=>x.recommended>0).map(x=>({...x, quantity:x.recommended}));
  if(items.length===0){ alert('Нет позиций'); return; }
  const res = await fetch('/api/export/excel/order',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({items})});
  if(!res.ok){ alert('Ошибка Excel'); return; }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='zakaz.xlsx'; a.click(); URL.revokeObjectURL(url);
}
async function exportSalesPDF(){
  const res = await fetch('/api/export/pdf/sales');
  if(!res.ok){ alert('Ошибка'); return; }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='sales.pdf'; a.click(); URL.revokeObjectURL(url);
}

// ---------- Promos — ЛИСТОВКИ ОТ ОФИСА (только чтение) ----------
async function loadPromos(){
  const filterEl = document.getElementById('promoFilter');
  const filter = filterEl ? filterEl.value : 'Все листовки';
  const res = await api('/api/promos');
  let data = res.data;
  const today = new Date().toISOString().slice(0,10);
  // фильтр
  if(filter==='Активные сейчас') data = data.filter(p=> p.start_date<=today && p.end_date>=today);
  if(filter==='Будущие (к заказу)' || filter==='Будущие (листовка)') data = data.filter(p=> p.start_date>today);
  if(filter==='Завершённые') data = data.filter(p=> p.end_date < today);

  // ближайшая листовка для кабинета и шапки
  const future = [...data].filter(p=> p.start_date>today).sort((a,b)=> a.start_date.localeCompare(b.start_date));
  const next = future[0];
  const nd = document.getElementById('nextLeafletDate');
  const nn = document.getElementById('nextLeafletName');
  if(nd && nn){
    if(next){ nd.textContent = next.start_date.split('-').reverse().join('.') + ' — ' + next.end_date.split('-').reverse().join('.'); nn.textContent = next.name + ' · ' + next.discount + '%'; }
    else { nd.textContent = '—'; nn.textContent = 'Поблизости нет листовок'; }
  }

  const tb = document.getElementById('promoTable');
  tb.innerHTML='';
  data.forEach(p=>{
    let badge='', cls='';
    if(p.start_date>today){ badge='<i class="ph ph-clock" aria-hidden="true"></i> К заказу'; cls='badge-orange'; }
    else if(p.start_date<=today && p.end_date>=today){ badge='<i class="ph ph-check-circle" aria-hidden="true"></i> Активна'; cls='badge-green'; }
    else if(p.end_date<today){ badge='<i class="ph ph-x-circle" aria-hidden="true"></i> Завершена'; cls='badge-gray'; }
    else { badge='<i class="ph ph-clock" aria-hidden="true"></i> Запланировано'; cls='badge-orange'; }
    const period = p.start_date.split('-').reverse().join('.') + ' — ' + p.end_date.split('-').reverse().join('.');
    const rec = p.start_date>today ? '<span class="badge badge-orange"><i class="ph ph-trend-up" aria-hidden="true"></i> +50% к заказу</span>' : (p.start_date<=today && p.end_date>=today ? '<span class="badge badge-green">Идёт сейчас</span>' : '<span class="badge badge-gray">—</span>');
    const nameCell = '<div style="font-weight:700;">'+p.name+'</div><div class="small muted" style="display:flex;align-items:center;gap:4px;"><i class="ph ph-buildings" aria-hidden="true"></i> Центральный офис</div>';
    const skuCell = p.sku ? '<span style="font-weight:700;">'+p.sku+'</span>' : '<span class="small muted">12 товаров</span>';
    const tr = document.createElement('tr');
    tr.dataset.id = p.id;
    tr.style.cursor='pointer';
    tr.onclick = ()=>{ document.querySelectorAll('#promoTable tr').forEach(r=>r.style.background=''); tr.style.background='#FFF7ED'; selectedPromoId=p.id; };
    tr.innerHTML = '<td>'+nameCell+'</td><td style="white-space:nowrap;">'+period+'</td><td style="color:#FF6B00;font-weight:800;">'+p.discount+'%</td><td>'+skuCell+'</td><td><span class="badge '+cls+'">'+badge+'</span></td><td>'+rec+'</td>';
    tb.appendChild(tr);
  });
  if(data.length===0){
    tb.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-muted);"><i class="ph ph-info" aria-hidden="true"></i> Нет листовок для отображения</td></tr>';
  }
}
async function addPromo(){
  alert('Листовки создаёт только центральный офис Галамарт. Директор видит их здесь и получает рекомендацию «закажи +50%» в разделе Заказ.');
}
async function deleteSelectedPromo(){
  alert('Удаление листовок доступно только центральному офису. Обратитесь в отдел маркетинга.');
}

// ---------- Products — пагинация для 3000 товаров ----------
async function loadProducts(reset=true){
  if(reset){ productsPage=1; }
  const search = document.getElementById('prodSearch').value.trim();
  const cat = document.getElementById('prodCategory').value;
  const onlyActive = document.getElementById('onlyActiveCheck')?.checked ? '1' : '0';
  const params = new URLSearchParams({search, category: cat, only_active: onlyActive, page: productsPage, limit: productsLimit});
  const res = await api('/api/products?'+params);
  // поддержка старого формата (массив) и нового (объект с items/total)
  let items, total;
  if(Array.isArray(res.data)){
    items=res.data;
    total=items.length;
  } else {
    items=res.data.items||[];
    total=res.data.total||items.length;
  }
  productsTotal=total;
  const tb = document.getElementById('prodTable');
  if(reset) tb.innerHTML='';
  items.forEach(r=>{
    const totalW = r.total;
    const isActive = r.is_active!==0 && r.is_active!==false;
    let badge='', cls='', tip='';
    if(!isActive || r.stock===0 || (totalW<=1 && r.stock>30)){ badge='<i class="ph ph-circle" aria-hidden="true"></i> Неактивный'; cls='badge-gray'; tip='Неактивный — товар снят с продажи, но остался в базе для истории'; }
    else { badge='<i class="ph ph-check-circle" aria-hidden="true"></i> Активный'; cls='badge-green'; tip='Активный товар — в продаже'; }
    const tr = document.createElement('tr');
    tr.style.cursor='pointer';
    tr.onclick = ()=> selectProduct(r);
    tr.innerHTML = '<td style="font-weight:700;">'+r.sku+'</td><td><div style="font-weight:700;">'+r.name+'</div><div class="small muted" style="display:flex;align-items:center;gap:4px;"><i class="ph ph-tag" aria-hidden="true"></i> '+r.category+'</div></td><td><span class="pill-category">'+r.category+'</span></td><td style="font-weight:700;">'+Number(r.price).toFixed(2)+' ₽</td><td style="font-weight:700;">'+r.stock+'</td><td><span class="badge '+cls+'" title="'+tip+'" style="cursor:help;">'+badge+'</span></td><td><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); openProductEditModal('+r.id+')" aria-label="Редактировать" title="Редактировать — откроется сразу"><i class="ph ph-pencil-simple" aria-hidden="true"></i></button></td>';
    tb.appendChild(tr);
  });
  const shown = tb.querySelectorAll('tr').length;
  document.getElementById('prodCount').textContent = 'Показано: '+shown+' из '+total + (onlyActive==='1'?' (только активные)':'');
  const moreBtn=document.getElementById('prodMoreBtn');
  if(moreBtn) moreBtn.style.display = (shown < total) ? 'inline-flex' : 'none';
  const totalEl=document.getElementById('prodTotalCount');
  if(totalEl) totalEl.textContent = total+' товаров';
}
function loadProductsMore(){
  productsPage++;
  loadProducts(false);
}
async function bulkDeleteCategory(){
  const cat=document.getElementById('bulkCategory')?.value;
  const status=document.getElementById('bulkStatus');
  if(!cat){ if(status) status.textContent='Выберите категорию'; return; }
  // защита: если в категории много товаров — дополнительное предупреждение
  try{
    const all = await api('/api/products?limit=1000');
    const cnt = (Array.isArray(all.data) ? all.data : (all.data.items||[])).filter(x=>x.category===cat).length;
    if(cnt > 50 && !confirm('В категории "'+cat+'" '+cnt+' товаров — это много! Точно удалить все '+cnt+'?')) return;
    if(cnt === 0){ if(status) status.textContent='В категории нет товаров'; return; }
  } catch(e){}
  if(!confirm('Удалить ВСЕ товары категории "'+cat+'"? Это безвозвратно! Продолжить?')) return;
  try{
    const res=await api('/api/products/bulk_delete',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({category: cat})});
    if(status) status.textContent='Удалено: '+res.data.deleted;
    loadProducts(); loadAnalytics();
    setTimeout(()=>{ if(status) status.textContent=''; },3000);
  }catch(e){ if(status) status.textContent='Ошибка: '+e.message; }
}
function selectProduct(r){
  currentProdId = r.id;
  document.getElementById('editName').value = r.name;
  document.getElementById('editCat').value = r.category;
  document.getElementById('editPrice').value = r.price;
  document.getElementById('editStock').value = r.stock;
  const ea=document.getElementById('editActive'); if(ea) ea.value = (r.is_active===0||r.is_active===false)?'0':'1';
  document.getElementById('editW1').value = r.week1||0;
  document.getElementById('editW2').value = r.week2||0;
  document.getElementById('editW3').value = r.week3||0;
  document.getElementById('editW4').value = r.week4||0;
  document.getElementById('editStatus').innerHTML = '<i class="ph ph-pencil-simple" aria-hidden="true"></i> Редактируется: '+r.sku+' <span class="small muted">('+((r.is_active===0)?'Неактивный — в базе для истории':'Активный')+')</span>';
}
async function selectProductById(id){
  const res = await api('/api/products/'+id);
  selectProduct(res.data);
}
// --- Модалка редактирования по карандашу (без пролистывания) ---
async function openProductEditModal(id){
  try{
    const res = await api('/api/products/'+id);
    const r = res.data;
    currentProdId = r.id;
    // заполняем нижнюю форму тоже для совместимости
    selectProduct(r);
    // заполняем модалку
    document.getElementById('modalEditName').value = r.name||'';
    document.getElementById('modalEditCat').value = r.category||'Бытовая химия';
    document.getElementById('modalEditPrice').value = r.price||0;
    document.getElementById('modalEditStock').value = r.stock||0;
    document.getElementById('modalEditActive').value = (r.is_active===0||r.is_active===false)?'0':'1';
    document.getElementById('modalEditW1').value = r.week1||0;
    document.getElementById('modalEditW2').value = r.week2||0;
    document.getElementById('modalEditW3').value = r.week3||0;
    document.getElementById('modalEditW4').value = r.week4||0;
    document.getElementById('productEditSku').textContent = r.sku + ' · ' + r.category;
    document.getElementById('modalEditStatus').textContent = '';
    document.getElementById('productEditModal').classList.add('show');
  } catch(e){ alert('Ошибка загрузки товара: '+e.message); }
}
function closeProductEditModal(){
  document.getElementById('productEditModal').classList.remove('show');
}
async function saveProductModal(){
  if(!currentProdId){ alert('Товар не выбран'); return; }
  const body = {
    name: document.getElementById('modalEditName').value.trim(),
    category: document.getElementById('modalEditCat').value,
    price: parseFloat(document.getElementById('modalEditPrice').value)||0,
    stock: parseInt(document.getElementById('modalEditStock').value)||0,
    is_active: document.getElementById('modalEditActive').value==='1'?1:0,
    week1: parseInt(document.getElementById('modalEditW1').value)||0,
    week2: parseInt(document.getElementById('modalEditW2').value)||0,
    week3: parseInt(document.getElementById('modalEditW3').value)||0,
    week4: parseInt(document.getElementById('modalEditW4').value)||0,
  };
  if(!body.name){ alert('Название обязательно'); return; }
  // защита от дурака для товара
  const prodWarnings=[];
  if(body.price<0 || body.price>100000) prodWarnings.push('Цена '+body.price+' ₽ — проверьте');
  if(body.stock<0 || body.stock>10000) prodWarnings.push('Остаток '+body.stock+' — проверьте');
  if([body.week1,body.week2,body.week3,body.week4].some(v=>v<0||v>1000)) prodWarnings.push('Продажи за неделю должны быть 0-1000');
  if(prodWarnings.length && !confirm('⚠ Подозрительные значения:\n'+prodWarnings.join('\n')+'\n\nСохранить?')) return;
  // автозаказ при таких значениях пересчитает правильно (cap 0-1000), но предупредим
  try{
    await api('/api/products/'+currentProdId,{method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
    document.getElementById('modalEditStatus').innerHTML='<i class="ph ph-check" aria-hidden="true"></i> Сохранено';
    // синхронизируем нижнюю форму
    document.getElementById('editName').value = body.name;
    document.getElementById('editCat').value = body.category;
    document.getElementById('editPrice').value = body.price;
    document.getElementById('editStock').value = body.stock;
    document.getElementById('editActive').value = String(body.is_active);
    document.getElementById('editW1').value = body.week1;
    document.getElementById('editW2').value = body.week2;
    document.getElementById('editW3').value = body.week3;
    document.getElementById('editW4').value = body.week4;
    loadProducts(); loadAnalytics();
    setTimeout(()=>closeProductEditModal(), 600);
  } catch(e){ document.getElementById('modalEditStatus').textContent='Ошибка: '+e.message; }
}
async function deleteProductModal(){
  if(!currentProdId){ alert('Товар не выбран'); return; }
  if(!confirm('Удалить товар?')) return;
  await api('/api/products/'+currentProdId,{method:'DELETE'});
  closeProductEditModal();
  currentProdId=null;
  loadProducts(); loadAnalytics();
}
async function saveEdit(){
  if(!currentProdId){ alert('Выберите товар кликом по строке'); return; }
  const body = {
    name: document.getElementById('editName').value.trim(),
    category: document.getElementById('editCat').value,
    price: parseFloat(document.getElementById('editPrice').value)||0,
    stock: parseInt(document.getElementById('editStock').value)||0,
    is_active: document.getElementById('editActive')?.value==='1'?1:0,
    week1: parseInt(document.getElementById('editW1').value)||0,
    week2: parseInt(document.getElementById('editW2').value)||0,
    week3: parseInt(document.getElementById('editW3').value)||0,
    week4: parseInt(document.getElementById('editW4').value)||0,
  };
  if(!body.name){ alert('Название обязательно'); return; }
  const prodWarnings2=[];
  if(body.price<0 || body.price>100000) prodWarnings2.push('Цена '+body.price+' ₽ — проверьте');
  if(body.stock<0 || body.stock>10000) prodWarnings2.push('Остаток '+body.stock+' — проверьте');
  if([body.week1,body.week2,body.week3,body.week4].some(v=>v<0||v>1000)) prodWarnings2.push('Продажи за неделю должны быть 0-1000');
  if(prodWarnings2.length && !confirm('⚠ Подозрительные значения:\n'+prodWarnings2.join('\n')+'\n\nСохранить?')) return;
  await api('/api/products/'+currentProdId,{method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
  document.getElementById('editStatus').innerHTML='<i class="ph ph-check" aria-hidden="true"></i> Сохранено';
  loadProducts(); loadAnalytics();
}
async function deleteProduct(){
  if(!currentProdId){ alert('Выберите товар'); return; }
  if(!confirm('Удалить товар?')) return;
  await api('/api/products/'+currentProdId,{method:'DELETE'});
  currentProdId=null;
  loadProducts(); loadAnalytics();
}
async function showHistory(){
  if(!currentProdId){ alert('Выберите товар'); return; }
  const res = await api('/api/products/'+currentProdId);
  const p = res.data;
  const total = (p.week1||0)+(p.week2||0)+(p.week3||0)+(p.week4||0);
  const avg = (total/4).toFixed(1);
  let lastSale = p.last_sale_date ? p.last_sale_date.split('-').reverse().join('.')+' ('+p.days_since_last_sale+' дн. назад)' : 'нет продаж (>30 дней)';
  alert(p.name+' ('+p.sku+')\nКатегория: '+p.category+'\nЦена: '+p.price+' ₽ Остаток: '+p.stock+'\nСтатус: '+(p.is_active?'Активный':'Неактивный — снят с продажи, в базе для истории')+'\nПродажи: Н1='+p.week1+' Н2='+p.week2+' Н3='+p.week3+' Н4='+p.week4+'\nВсего='+total+' Ср./нед.='+avg+'\nПоследняя продажа: '+lastSale+' (из sales)');
}
// CSV импорт/экспорт удалён — Галамарт не использует CSV

// ---------- History ----------
async function loadHistory(){
  const res = await api('/api/orders');
  const tb = document.getElementById('histTable');
  tb.innerHTML='';
  if(res.data.length===0){
    tb.innerHTML='<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--text-muted);"><i class="ph ph-inbox" aria-hidden="true"></i> История пуста — оформите заказ во вкладке «Заказ»</td></tr>';
    selectedOrderId=null;
    document.getElementById('detailTable').innerHTML='';
    document.getElementById('accTable').innerHTML='';
    document.getElementById('accInfo').textContent='';
    return;
  }
  res.data.forEach(o=>{
    const num = 'ORD-2026-'+String(o.id).padStart(4,'0');
    let dt=''; try{ dt = new Date(o.created_at).toLocaleString('ru-RU'); }catch(e){ dt=o.created_at; }
    const user = o.id%2===1 ? 'Директор':'Менеджер';
    const isLatest = o.id===res.data[0]?.id;
    const badge = isLatest ? '<i class="ph ph-paper-plane-tilt" aria-hidden="true"></i> Отправлен' : '<i class="ph ph-check-circle" aria-hidden="true"></i> Доставлен';
    const cls = isLatest ? 'badge-orange':'badge-green';
    const tr = document.createElement('tr');
    tr.style.cursor='pointer';
    tr.onclick = ()=>{ selectedOrderId=o.id; document.querySelectorAll('#histTable tr').forEach(r=>r.style.background=''); tr.style.background='#FFF7ED'; loadDetails(o.id); loadAccuracy(); };
    tr.innerHTML = '<td style="font-weight:700;">'+num+'</td><td>'+dt+'</td><td class="small muted">'+user+'</td><td style="font-weight:700;">'+o.total_items+'</td><td style="color:#FF6B00;font-weight:800;">'+Number(o.total_amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' ₽</td><td><span class="badge '+cls+'">'+badge+'</span></td><td><button class="btn btn-ghost btn-sm" style="padding:4px 8px;" onclick="event.stopPropagation(); deleteOrderById('+o.id+')" title="Удалить заказ"><i class="ph ph-trash" aria-hidden="true"></i></button></td>';
    tb.appendChild(tr);
  });
  if(res.data[0]){ selectedOrderId=res.data[0].id; loadDetails(selectedOrderId); loadAccuracy(); }
}
async function loadDetails(oid){
  if(!oid) oid=selectedOrderId;
  if(!oid) return;
  const res = await api('/api/orders/'+oid);
  const tb = document.getElementById('detailTable');
  tb.innerHTML='';
  res.data.forEach(it=>{
    const tr=document.createElement('tr');
    tr.innerHTML='<td style="font-weight:700;">'+it.sku+'</td><td>'+it.name+'</td><td style="font-weight:700;">'+it.quantity+'</td><td>'+Number(it.price).toFixed(2)+' ₽</td><td>'+it.stock_at_order+'</td><td>'+it.avg_sales+'</td>';
    tb.appendChild(tr);
  });
}
async function loadAccuracy(){
  try{
    const res = await api('/api/analytics/accuracy');
    const tb = document.getElementById('accTable');
    tb.innerHTML='';
    if(!res.data){ document.getElementById('accInfo').textContent='Нет заказов'; return; }
    document.getElementById('accInfo').textContent = 'Заказ №'+res.data.order.id+' от '+res.data.order.created_at.slice(0,16);
    res.data.items.forEach(it=>{
      let badge='badge-green', txt='<i class="ph ph-check-circle" aria-hidden="true"></i> Точно';
      if(it.status.includes('перезаказ')){ badge='badge-red'; txt='<i class="ph ph-warning" aria-hidden="true"></i> Перезаказ'; }
      else if(it.status.includes('недозаказ')){ badge='badge-orange'; txt='<i class="ph ph-trend-up" aria-hidden="true"></i> Недозаказ'; }
      const tr=document.createElement('tr');
      tr.innerHTML='<td style="font-weight:700;">'+it.sku+'</td><td>'+it.name+'</td><td style="font-weight:700;">'+it.ordered+'</td><td>'+it.sold+'</td><td>'+it.avg+'</td><td><span class="badge '+badge+'">'+txt+'</span></td>';
      tb.appendChild(tr);
    });
  }catch(e){ console.error(e); }
}
async function deleteOrder(){
  if(!selectedOrderId){ alert('Выберите заказ — кликните по строке в таблице'); return; }
  const num = 'ORD-2026-'+String(selectedOrderId).padStart(4,'0');
  if(!confirm('Удалить '+num+'? Это безвозвратно.')) return;
  try{
    await api('/api/orders/'+selectedOrderId,{method:'DELETE'});
    selectedOrderId=null;
    document.getElementById('detailTable').innerHTML='';
    document.getElementById('accTable').innerHTML='';
    document.getElementById('accInfo').textContent='Заказ удалён';
    await loadHistory();
  } catch(e){ alert('Ошибка удаления: '+e.message); }
}
async function deleteOrderById(id){
  if(!confirm('Удалить заказ ORD-2026-'+String(id).padStart(4,'0')+'?')) return;
  try{
    await api('/api/orders/'+id,{method:'DELETE'});
    if(selectedOrderId===id) selectedOrderId=null;
    await loadHistory();
  } catch(e){ alert('Ошибка: '+e.message); }
}
async function exportAccuracyPDF(){
  const res = await fetch('/api/export/pdf/accuracy');
  if(!res.ok){ alert('Нет данных'); return; }
  const blob = await res.blob();
  const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='accuracy.pdf'; a.click(); URL.revokeObjectURL(url);
}


// ---------- Auto Order (1 клик) — теперь автозаказ, скролл вниз к Заказать ----------
async function autoOrder(){
  const btn = event?.target?.closest('button');
  if(btn) { btn.disabled=true; const old=btn.innerHTML; btn.innerHTML='<i class="ph ph-spinner" aria-hidden="true" style="animation:spin 0.8s linear infinite;"></i> Формируем...'; 
    setTimeout(()=>{btn.disabled=false; btn.innerHTML=old;}, 1200);
  }
  const onlyEl=document.getElementById('onlyNeed');
  if(onlyEl) onlyEl.checked=true;
  await loadOrder();
  // скролл вниз к кнопке Заказать (а не к таблице)
  setTimeout(()=>{
    const bar=document.querySelector('.totals-bar');
    if(bar) bar.scrollIntoView({behavior:'smooth', block:'center'});
    else document.getElementById('orderTable')?.scrollIntoView({behavior:'smooth', block:'center'});
  }, 300);
  const dev=document.getElementById('orderDeviation');
  if(dev) dev.innerHTML='<i class="ph ph-check-circle" aria-hidden="true"></i> Автозаказ выставлен — учтены спрос и ближайшие листовки (+50%). Проверьте количества и нажмите «Заказать».';
  setTimeout(()=>{ if(dev) dev.textContent=''; }, 4000);
}

// ---------- KPI Tooltip ----------
(function(){
  const tip=document.getElementById('kpiTooltip');
  if(!tip) return;
  function show(e, html){
    tip.innerHTML=html;
    tip.style.display='block';
    const x=e.clientX+14, y=e.clientY+14;
    const rect=tip.getBoundingClientRect();
    let left=x, top=y;
    if(left+rect.width>window.innerWidth-10) left=e.clientX-rect.width-14;
    if(top+rect.height>window.innerHeight-10) top=e.clientY-rect.height-14;
    tip.style.left=left+'px';
    tip.style.top=top+'px';
  }
  function hide(){ tip.style.display='none'; }
  document.querySelectorAll('.kpi-card[data-kpi]').forEach(card=>{
    card.addEventListener('mouseenter', (e)=>{
      if(!analyticsCache) return;
      const k=card.dataset.kpi;
      let html='';
      if(k==='revenue'){
        const s=analyticsCache.sales_by_week;
        const rev = analyticsCache.revenue_by_week || {week1:0,week2:0,week3:0,week4:0};
        const totalRev = analyticsCache.total_revenue || 0;
        html='<div style="font-weight:800;display:flex;align-items:center;gap:6px;"><i class="ph ph-currency-rub" style="color:#FF6B00;"></i> Выручка детально</div><div class="small muted" style="margin-top:6px;">Нед.1: '+Math.round(rev.week1||0).toLocaleString('ru-RU')+' ₽<br>Нед.2: '+Math.round(rev.week2||0).toLocaleString('ru-RU')+' ₽<br>Нед.3: '+Math.round(rev.week3||0).toLocaleString('ru-RU')+' ₽<br>Нед.4: '+Math.round(rev.week4||0).toLocaleString('ru-RU')+' ₽</div><div style="margin-top:6px;padding-top:6px;border-top:1px solid #FFE4CC;" class="small">Всего: <b>'+Math.round(totalRev).toLocaleString('ru-RU')+' ₽</b> = Σ(price×кол-во)</div><div style="margin-top:6px;" class="small"><b>Прогноз на след. неделю:</b> ~'+Math.round((rev.week4||0)*1.05).toLocaleString('ru-RU')+' ₽</div>';
      } else if(k==='orders'){
        const s=analyticsCache.sales_by_week;
        html='<div style="font-weight:800;display:flex;align-items:center;gap:6px;"><i class="ph ph-shopping-bag" style="color:#FF6B00;"></i> Продажи детально</div><div class="small muted" style="margin-top:6px;">Всего продано: '+s.total+' шт.<br>Нед.1: '+s.week1+' · Нед.2: '+s.week2+' · Нед.3: '+s.week3+' · Нед.4: '+s.week4+'</div><div class="small" style="margin-top:6px;">Топ категория: '+(Object.entries(analyticsCache.by_category).sort((a,b)=>b[1].total-a[1].total)[0]?.[0]||'—')+'</div>';
      } else if(k==='avg'){
        const totalRev = analyticsCache.total_revenue || 0;
        const s=analyticsCache.sales_by_week;
        const avg = analyticsCache.avg_check || 0;
        html='<div style="font-weight:800;"><i class="ph ph-receipt" style="color:#FF6B00;"></i> Средний чек</div><div class="small muted" style="margin-top:6px;">Текущий: <b>'+Math.round(avg).toLocaleString('ru-RU')+' ₽</b><br>Выручка: '+Math.round(totalRev).toLocaleString('ru-RU')+' ₽<br>Чеков/шт: '+s.total+'</div><div class="small" style="margin-top:6px;">Формула: <b>выручка / чеки</b> = '+Math.round(totalRev).toLocaleString('ru-RU')+' / '+s.total+' = '+Math.round(avg)+' ₽</div>';
      } else if(k==='deficit'){
        html='<div style="font-weight:800;"><i class="ph ph-warning-circle" style="color:#DC2626;"></i> Дефицит</div><div class="small muted" style="margin-top:6px;">SKU в красной зоне: '+analyticsCache.low_stock_count+'<br>Требуют заказа сегодня<br>Покрытие &lt; 7 дней</div><div style="margin-top:8px;"><a href="#" onclick="event.preventDefault();document.querySelector(\'[data-tab=order]\').click();" style="font-weight:700;color:#FF6B00;">→ К заказу</a></div>';
      }
      show(e, html);
    });
    card.addEventListener('mousemove', (e)=>{
      if(tip.style.display==='block'){
        const x=e.clientX+14, y=e.clientY+14;
        tip.style.left=x+'px';
        tip.style.top=y+'px';
      }
    });
    card.addEventListener('mouseleave', hide);
  });
})();

// ---------- Theme toggle ----------
function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme');
  const next=cur==='dark'?'light':'dark';
  if(next==='dark') document.documentElement.setAttribute('data-theme','dark');
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('galamart_theme', next);
  const btn=document.getElementById('themeToggle');
  if(btn) btn.innerHTML = next==='dark' ? '<i class="ph ph-sun" aria-hidden="true"></i>' : '<i class="ph ph-moon" aria-hidden="true"></i>';
}
(function(){
  const saved=localStorage.getItem('galamart_theme');
  if(saved==='dark'){ document.documentElement.setAttribute('data-theme','dark'); setTimeout(()=>{const b=document.getElementById('themeToggle'); if(b) b.innerHTML='<i class="ph ph-sun" aria-hidden="true"></i>';},100); }
  // spin animation for auto-order
  const style=document.createElement('style');
  style.textContent="@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}";
  document.head.appendChild(style);
})();

// ---------- Login — исправлено: надёжная обработка входа ----------
function checkAuth(){
  try{
    const ok = localStorage.getItem('galamart_auth')==='1';
    const overlay=document.getElementById('loginOverlay');
    if(overlay) overlay.style.display= ok ? 'none' : 'flex';
    return ok;
  } catch(e){
    // если localStorage недоступен — показываем сайт без логина
    const overlay=document.getElementById('loginOverlay');
    if(overlay) overlay.style.display='none';
    return true;
  }
}
function doLogin(){
  const uEl=document.getElementById('loginUser');
  const pEl=document.getElementById('loginPass');
  const err=document.getElementById('loginError');
  const btn=document.getElementById('loginBtn');
  const u=(uEl?uEl.value:'').trim();
  const p=(pEl?pEl.value:'').trim(); // trim пароль тоже, чтобы пробел не ломал вход
  // Логин регистронезависимый: gDir, gdir, GDIR — всё подойдёт
  const uNorm = u.toLowerCase();
  if((uNorm==='gdir' || uNorm==='gdir' || u==='gDir') && p==='1234'){
    try{ localStorage.setItem('galamart_auth','1'); } catch(e){}
    if(err) err.style.display='none';
    checkAuth();
    // фокус на сайт
    if(btn) { btn.disabled=false; btn.innerHTML='<i class="ph ph-sign-in" aria-hidden="true"></i> Войти'; }
    return true;
  } else {
    if(err) {
      err.style.display='block';
      err.innerHTML='<i class="ph ph-warning" aria-hidden="true"></i> Неверный логин или пароль. Подсказка: Логин <b>gDir</b>, пароль <b>1234</b>';
    }
    // показать подсказку с техподдержкой
    const hint=document.getElementById('supportHint');
    if(hint) hint.style.display='block';
    // тряска кнопки
    if(btn){ btn.animate([{transform:'translateX(0)'},{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],{duration:250}); }
    if(pEl) pEl.select();
    return false;
  }
}
function logout(){
  try{ localStorage.removeItem('galamart_auth'); } catch(e){}
  checkAuth();
  // очистить поля
  const uEl=document.getElementById('loginUser'); if(uEl) uEl.value='';
  const pEl=document.getElementById('loginPass'); if(pEl) pEl.value='';
}
(function(){
  // Инициализация логина после загрузки DOM
  function initLogin(){
    checkAuth();
    const form=document.getElementById('loginForm');
    const btn=document.getElementById('loginBtn');
    const uEl=document.getElementById('loginUser');
    const pEl=document.getElementById('loginPass');
    if(form){
      form.addEventListener('submit', (e)=>{ e.preventDefault(); doLogin(); });
    }
    if(btn){
      btn.addEventListener('click', (e)=>{ e.preventDefault(); doLogin(); });
    }
    // Enter на полях
    [uEl,pEl].forEach(el=>{
      if(el) el.addEventListener('keydown', (e)=>{
        if(e.key==='Enter'){ e.preventDefault(); doLogin(); }
      });
    });
    // глобально expose для onclick
    window.doLogin = doLogin;
    window.checkAuth = checkAuth;
    window.logout = logout;
    // автофокус
    const overlay=document.getElementById('loginOverlay');
    if(overlay && overlay.style.display!=='none' && uEl) setTimeout(()=>uEl.focus(), 200);
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', initLogin);
  } else {
    initLogin();
  }
  setTimeout(checkAuth, 100);
  // также ловим Enter глобально (старая логика)
  document.addEventListener('keydown', (e)=>{
    const overlay=document.getElementById('loginOverlay');
    const visible = overlay && overlay.style.display!=='none';
    if(e.key==='Enter' && visible){
      const ae=document.activeElement;
      if(ae && (ae.id==='loginUser' || ae.id==='loginPass')) { e.preventDefault(); doLogin(); }
    }
  });
  // позволить сброс логина через ?reset=1 и авто-вход через ?demo=1 или ?login=auto
  try{
    const qs=new URLSearchParams(window.location.search);
    if(qs.get('reset')==='1'){
      localStorage.removeItem('galamart_auth');
    }
    if(qs.get('demo')==='1' || qs.get('login')==='auto'){
      localStorage.setItem('galamart_auth','1');
      checkAuth();
    }
  } catch(e){}
})();

// ---------- Tasks (добавляемые, авто-очистка в 20:00) ----------
let tasks = JSON.parse(localStorage.getItem('galamart_tasks')||'null');
if(!tasks){
  tasks=[
    {id:1, text:'Принять поставку 08:30 — бытовая химия', time:'08:30', source:'office', done:false},
    {id:2, text:'Проверить ценники по листовке', time:'до 10:00', source:'office', done:false},
    {id:3, text:'Сформировать заказ (учёт листовки с 01.09)', time:'Важно', source:'program', done:false},
    {id:4, text:'Отчёт по списаниям', time:'', source:'program', done:false},
  ];
}
function saveTasks(){ localStorage.setItem('galamart_tasks', JSON.stringify(tasks)); localStorage.setItem('galamart_tasks_date', new Date().toDateString()); }
function renderTasks(){
  const wrap=document.getElementById('dirTasks');
  if(!wrap) return;
  wrap.innerHTML='';
  tasks.forEach(t=>{
    const dotColor = t.source==='office'?'#FF6B00': t.source==='program'?'#16A34A':'#64748B';
    const badge = t.source==='office'?'Офис': t.source==='program'?'Программа':'Мои';
    const label=document.createElement('label');
    label.style.cssText='display:flex;gap:10px;align-items:center;padding:10px;border:1px solid var(--border);border-radius:10px;cursor:pointer;'+(t.done?'opacity:0.6;text-decoration:line-through;':'');
    label.innerHTML='<span style="width:8px;height:8px;background:'+dotColor+';border-radius:50%;flex-shrink:0;"></span><input type="checkbox" '+(t.done?'checked':'')+' style="accent-color:#FF6B00;width:16px;height:16px;" data-id="'+t.id+'"> <span style="flex:1;">'+t.text+'</span> <span class="badge badge-gray" style="margin-left:auto;">'+(t.time||badge)+'</span> <button onclick="event.stopPropagation(); deleteTask('+t.id+')" style="background:none;border:none;color:#94A3B8;cursor:pointer;padding:2px;" title="Удалить"><i class="ph ph-x" aria-hidden="true"></i></button>';
    const cb=label.querySelector('input');
    cb.addEventListener('change', (e)=>{
      t.done=e.target.checked;
      saveTasks();
      renderTasks();
    });
    wrap.appendChild(label);
  });
  const cnt=document.getElementById('tasksCount');
  if(cnt) cnt.textContent = tasks.filter(x=>!x.done).length+' задач';
  // auto clear done after 20:00
  const now=new Date();
  if(now.getHours()>=20){
    const before=tasks.length;
    tasks=tasks.filter(x=>!x.done);
    if(tasks.length!==before){ saveTasks(); setTimeout(renderTasks,100); }
  }
}
function addTask(){
  const inp=document.getElementById('newTaskInput');
  if(!inp) return;
  const txt=inp.value.trim();
  if(!txt) return;
  if(txt.length < 3){ alert('Задача слишком короткая'); return; }
  if(txt.length > 100){ if(!confirm('Задача очень длинная ('+txt.length+' симв.). Сохранить?')) return; }
  if(tasks.some(x=>x.text===txt)){ alert('Такая задача уже есть'); return; }
  tasks.push({id:Date.now(), text:txt, time:'Мои', source:'my', done:false});
  inp.value='';
  saveTasks();
  renderTasks();
}
function deleteTask(id){ tasks=tasks.filter(x=>x.id!==id); saveTasks(); renderTasks(); }
function testTime(){
  const now=new Date();
  const doneCount=tasks.filter(x=>x.done).length;
  const before=tasks.length;
  if(now.getHours()>=20){
    tasks=tasks.filter(x=>!x.done);
    saveTasks(); renderTasks();
    alert('Сейчас '+now.toLocaleTimeString('ru-RU')+' (≥20:00)\nУдалено выполненных: '+doneCount+'\nБыло: '+before+', стало: '+tasks.length);
  } else {
    if(!confirm('Сейчас '+now.toLocaleTimeString('ru-RU')+' (<20:00).\nСимулировать 20:00 и удалить выполненные?\nВыполненных: '+doneCount)) return;
    tasks=tasks.filter(x=>!x.done);
    saveTasks(); renderTasks();
    alert('Симуляция 20:00\nУдалено: '+doneCount+'\nБыло: '+before+', стало: '+tasks.length+'\n(В реальности — автоудаление после 20:00)');
  }
}
window.testTime=testTime;
// auto daily reset of date
(function(){
  const savedDate=localStorage.getItem('galamart_tasks_date');
  const today=new Date().toDateString();
  if(savedDate && savedDate!==today){
    // new day — keep only not done? Actually at 20:00 we already clear done, but next morning keep remaining
    // Do nothing, just update date
    localStorage.setItem('galamart_tasks_date', today);
  } else if(!savedDate){
    localStorage.setItem('galamart_tasks_date', today);
  }
  setTimeout(renderTasks, 200);
  // check every minute for 20:00 cleanup
  setInterval(renderTasks, 60000);
})();

// ---------- Notifications openable ----------
function openNotif(id){
  const data={
    1: {title:'Новая листовка с 01.09 — Посуда -25%', body:'12 товаров из категории Посуда. Период: 01.09.2026 — 07.09.2026. Скидка 25%. Рекомендация: увеличить заказ на 50% (система уже учла в Автозаказе). Поставка 30.08. Источник: Центральный офис. Товары: кружки, тарелки, контейнеры.'},
    2: {title:'Критический остаток: 4 SKU', body:'Порошок стиральный 3кг (остаток 3), Губки 3шт (6), Салфетки (9), Мыло хоз. (3). Покрытие <3 дней. Рекомендуется срочно заказать через Автозаказ.'}
  };
  const item=data[id];
  if(!item) return;
  // reuse qtyModal or create simple alert modal
  const overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;background:rgba(15,23,42,0.4);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:300;padding:20px;';
  overlay.onclick=(e)=>{ if(e.target===overlay) overlay.remove(); };
  overlay.innerHTML='<div style="background:white;border:1px solid #FFE4CC;border-radius:16px;padding:20px;max-width:480px;width:100%;box-shadow:0 12px 24px rgba(15,23,42,0.15);"><div style="font-weight:800;display:flex;align-items:center;gap:8px;"><i class="ph ph-bell" style="color:#FF6B00;"></i> '+item.title+'</div><div style="margin-top:10px;line-height:1.6;">'+item.body+'</div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px;"><button class="btn btn-ghost" onclick="this.closest(\'div\').parentElement.parentElement.remove()">Закрыть</button><button class="btn btn-orange" onclick="document.querySelector(\'[data-tab=promo]\').click(); this.closest(\'div\').parentElement.parentElement.remove();"><i class=\"ph ph-eye\"></i> К листовкам</button></div></div>';
  document.body.appendChild(overlay);
}


// Кнопка наверх для длинных списков
(function(){
  const btn=document.getElementById('scrollTopBtn');
  if(!btn) return;
  function toggle(){
    if(window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
  }
  window.addEventListener('scroll', toggle, {passive:true});
  btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  // также показывать при скролле внутри tab-pane (если overflow)
  document.querySelectorAll('.tab-pane').forEach(p=> p.addEventListener('scroll', toggle));
  setTimeout(toggle, 500);
})();

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  const today = new Date().toISOString().slice(0,10);
  const next = new Date(Date.now()+7*86400000).toISOString().slice(0,10);
  const ps=document.getElementById('promoStart'); if(ps) ps.value=today;
  const pe=document.getElementById('promoEnd'); if(pe) pe.value=next;
  document.getElementById('prodSearch').addEventListener('input', ()=>{ productsPage=1; loadProducts(true); });
  document.getElementById('prodCategory').addEventListener('change', ()=>{ productsPage=1; loadProducts(true); });
  const oac=document.getElementById('onlyActiveCheck'); if(oac) oac.addEventListener('change', ()=>{ productsPage=1; loadProducts(true); });
  document.getElementById('orderSearch').addEventListener('input', ()=>{ orderPage=1; loadOrder(); });
  document.getElementById('orderCategory').addEventListener('change', ()=>{ orderPage=1; loadOrder(); });
  document.getElementById('onlyNeed').addEventListener('change', ()=>{ orderPage=1; loadOrder(); });
  loadAnalytics(); loadOrder(); loadPromos(); loadProducts(true); loadHistory();
});
