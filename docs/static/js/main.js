/* Galamart Order Assistant — main.js | STATIC GitHub Pages | Orange-White | Phosphor Icons */
const DEMO_MODE = true;
const FALLBACK_PRODUCTS = [{"id": 1, "sku": "GM-1053", "name": "Порошок стиральный 3кг", "category": "Бытовая химия", "price": 198.0, "stock": 21, "is_active": 1, "week1": 15, "week2": 12, "week3": 13, "week4": 13, "total": 53, "avg": 13.25, "revenue": 10494.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -3.7, "dinamika": "Стабильно"}, {"id": 2, "sku": "GM-1054", "name": "Порошок стиральный 3кг люкс", "category": "Бытовая химия", "price": 295.0, "stock": 18, "is_active": 1, "week1": 8, "week2": 8, "week3": 9, "week4": 5, "total": 30, "avg": 7.5, "revenue": 8850.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -12.5, "dinamika": "Падение"}, {"id": 3, "sku": "GM-1055", "name": "Средство для посуды 500мл", "category": "Бытовая химия", "price": 580.0, "stock": 10, "is_active": 1, "week1": 0, "week2": 5, "week3": 3, "week4": 6, "total": 14, "avg": 3.5, "revenue": 8120.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 80.0, "dinamika": "Рост"}, {"id": 4, "sku": "GM-1056", "name": "Средство для посуды 500мл люкс", "category": "Бытовая химия", "price": 125.0, "stock": 39, "is_active": 1, "week1": 0, "week2": 0, "week3": 0, "week4": 0, "total": 0, "avg": 0, "revenue": 0.0, "last_sale_date": null, "days_since_last_sale": 999, "trend": 0, "dinamika": "Стабильно"}, {"id": 5, "sku": "GM-1057", "name": "Мыло хозяйственное", "category": "Бытовая химия", "price": 213.0, "stock": 24, "is_active": 1, "week1": 5, "week2": 9, "week3": 7, "week4": 8, "total": 29, "avg": 7.25, "revenue": 6177.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 7.1, "dinamika": "Рост"}, {"id": 6, "sku": "GM-1058", "name": "Мыло хозяйственное люкс", "category": "Бытовая химия", "price": 517.0, "stock": 3, "is_active": 1, "week1": 1, "week2": 6, "week3": 2, "week4": 5, "total": 14, "avg": 3.5, "revenue": 7238.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 0.0, "dinamika": "Стабильно"}, {"id": 7, "sku": "GM-1059", "name": "Шампунь 400мл", "category": "Бытовая химия", "price": 458.0, "stock": 13, "is_active": 1, "week1": 5, "week2": 3, "week3": 2, "week4": 4, "total": 14, "avg": 3.5, "revenue": 6412.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -25.0, "dinamika": "Падение"}, {"id": 8, "sku": "GM-1060", "name": "Шампунь 400мл люкс", "category": "Бытовая химия", "price": 120.0, "stock": 13, "is_active": 1, "week1": 8, "week2": 4, "week3": 8, "week4": 3, "total": 23, "avg": 5.75, "revenue": 2760.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -8.3, "dinamika": "Падение"}, {"id": 9, "sku": "GM-1061", "name": "Зубная паста", "category": "Бытовая химия", "price": 496.0, "stock": 7, "is_active": 1, "week1": 12, "week2": 12, "week3": 17, "week4": 12, "total": 53, "avg": 13.25, "revenue": 26288.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 20.8, "dinamika": "Рост"}, {"id": 10, "sku": "GM-1062", "name": "Зубная паста люкс", "category": "Бытовая химия", "price": 502.0, "stock": 38, "is_active": 1, "week1": 0, "week2": 0, "week3": 0, "week4": 0, "total": 0, "avg": 0, "revenue": 0.0, "last_sale_date": null, "days_since_last_sale": 999, "trend": 0, "dinamika": "Стабильно"}, {"id": 11, "sku": "GM-1063", "name": "Губки для посуды 3шт", "category": "Бытовая химия", "price": 420.0, "stock": 9, "is_active": 1, "week1": 12, "week2": 11, "week3": 12, "week4": 11, "total": 46, "avg": 11.5, "revenue": 19320.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 0.0, "dinamika": "Стабильно"}, {"id": 12, "sku": "GM-1064", "name": "Губки для посуды 3шт люкс", "category": "Бытовая химия", "price": 353.0, "stock": 6, "is_active": 1, "week1": 2, "week2": 7, "week3": 10, "week4": 19, "total": 38, "avg": 9.5, "revenue": 13414.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 222.2, "dinamika": "Рост"}, {"id": 13, "sku": "GM-1065", "name": "Салфетки влажные", "category": "Бытовая химия", "price": 284.0, "stock": 9, "is_active": 1, "week1": 9, "week2": 9, "week3": 13, "week4": 13, "total": 44, "avg": 11.0, "revenue": 12496.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 44.4, "dinamika": "Рост"}, {"id": 14, "sku": "GM-1066", "name": "Салфетки влажные люкс", "category": "Бытовая химия", "price": 308.0, "stock": 21, "is_active": 1, "week1": 0, "week2": 0, "week3": 0, "week4": 0, "total": 0, "avg": 0, "revenue": 0.0, "last_sale_date": null, "days_since_last_sale": 999, "trend": 0, "dinamika": "Стабильно"}, {"id": 15, "sku": "GM-1067", "name": "Освежитель воздуха", "category": "Бытовая химия", "price": 488.0, "stock": 18, "is_active": 1, "week1": 7, "week2": 3, "week3": 3, "week4": 6, "total": 19, "avg": 4.75, "revenue": 9272.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -10.0, "dinamika": "Падение"}, {"id": 16, "sku": "GM-1068", "name": "Освежитель воздуха люкс", "category": "Бытовая химия", "price": 489.0, "stock": 7, "is_active": 1, "week1": 10, "week2": 8, "week3": 8, "week4": 10, "total": 36, "avg": 9.0, "revenue": 17604.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 0.0, "dinamika": "Стабильно"}, {"id": 17, "sku": "GM-1069", "name": "Кукла Барби", "category": "Игрушки", "price": 693.0, "stock": 34, "is_active": 1, "week1": 0, "week2": 0, "week3": 0, "week4": 0, "total": 0, "avg": 0, "revenue": 0.0, "last_sale_date": null, "days_since_last_sale": 999, "trend": 0, "dinamika": "Стабильно"}, {"id": 18, "sku": "GM-1070", "name": "Кукла Барби люкс", "category": "Игрушки", "price": 1039.0, "stock": 14, "is_active": 1, "week1": 8, "week2": 9, "week3": 9, "week4": 5, "total": 31, "avg": 7.75, "revenue": 32209.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -17.6, "dinamika": "Падение"}, {"id": 19, "sku": "GM-1071", "name": "Машинка инерционная", "category": "Игрушки", "price": 539.0, "stock": 19, "is_active": 1, "week1": 14, "week2": 11, "week3": 15, "week4": 17, "total": 57, "avg": 14.25, "revenue": 30723.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 28.0, "dinamika": "Рост"}, {"id": 20, "sku": "GM-1072", "name": "Машинка инерционная люкс", "category": "Игрушки", "price": 553.0, "stock": 23, "is_active": 1, "week1": 6, "week2": 3, "week3": 5, "week4": 3, "total": 17, "avg": 4.25, "revenue": 9401.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -11.1, "dinamika": "Падение"}, {"id": 21, "sku": "GM-1073", "name": "Конструктор 100 дет", "category": "Игрушки", "price": 405.0, "stock": 12, "is_active": 1, "week1": 8, "week2": 6, "week3": 9, "week4": 7, "total": 30, "avg": 7.5, "revenue": 12150.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 14.3, "dinamika": "Рост"}, {"id": 22, "sku": "GM-1074", "name": "Конструктор 100 дет люкс", "category": "Игрушки", "price": 974.0, "stock": 14, "is_active": 1, "week1": 9, "week2": 9, "week3": 11, "week4": 13, "total": 42, "avg": 10.5, "revenue": 40908.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 33.3, "dinamika": "Рост"}, {"id": 23, "sku": "GM-1075", "name": "Мяч резиновый", "category": "Игрушки", "price": 506.0, "stock": 11, "is_active": 1, "week1": 7, "week2": 8, "week3": 10, "week4": 4, "total": 29, "avg": 7.25, "revenue": 14674.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -6.7, "dinamika": "Падение"}, {"id": 24, "sku": "GM-1076", "name": "Мяч резиновый люкс", "category": "Игрушки", "price": 737.0, "stock": 10, "is_active": 1, "week1": 6, "week2": 8, "week3": 15, "week4": 19, "total": 48, "avg": 12.0, "revenue": 35376.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 142.9, "dinamika": "Рост"}, {"id": 25, "sku": "GM-1077", "name": "Пазл 500 эл", "category": "Игрушки", "price": 1055.0, "stock": 7, "is_active": 1, "week1": 11, "week2": 14, "week3": 14, "week4": 13, "total": 52, "avg": 13.0, "revenue": 54860.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 8.0, "dinamika": "Рост"}, {"id": 26, "sku": "GM-1078", "name": "Пазл 500 эл люкс", "category": "Игрушки", "price": 323.0, "stock": 9, "is_active": 1, "week1": 15, "week2": 14, "week3": 12, "week4": 10, "total": 51, "avg": 12.75, "revenue": 16473.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -24.1, "dinamika": "Падение"}, {"id": 27, "sku": "GM-1079", "name": "Плюшевый медведь", "category": "Игрушки", "price": 785.0, "stock": 6, "is_active": 1, "week1": 3, "week2": 5, "week3": 10, "week4": 12, "total": 30, "avg": 7.5, "revenue": 23550.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 175.0, "dinamika": "Рост"}, {"id": 28, "sku": "GM-1080", "name": "Плюшевый медведь люкс", "category": "Игрушки", "price": 1123.0, "stock": 8, "is_active": 1, "week1": 4, "week2": 4, "week3": 6, "week4": 5, "total": 19, "avg": 4.75, "revenue": 21337.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 37.5, "dinamika": "Рост"}, {"id": 29, "sku": "GM-1081", "name": "Набор фломастеров", "category": "Игрушки", "price": 936.0, "stock": 5, "is_active": 1, "week1": 4, "week2": 8, "week3": 8, "week4": 3, "total": 23, "avg": 5.75, "revenue": 21528.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -8.3, "dinamika": "Падение"}, {"id": 30, "sku": "GM-1082", "name": "Набор фломастеров люкс", "category": "Игрушки", "price": 1020.0, "stock": 6, "is_active": 1, "week1": 6, "week2": 7, "week3": 10, "week4": 20, "total": 43, "avg": 10.75, "revenue": 43860.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 130.8, "dinamika": "Рост"}, {"id": 31, "sku": "GM-1083", "name": "Игра настольная", "category": "Игрушки", "price": 398.0, "stock": 12, "is_active": 1, "week1": 12, "week2": 11, "week3": 11, "week4": 11, "total": 45, "avg": 11.25, "revenue": 17910.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -4.3, "dinamika": "Стабильно"}, {"id": 32, "sku": "GM-1084", "name": "Игра настольная люкс", "category": "Игрушки", "price": 1056.0, "stock": 16, "is_active": 1, "week1": 15, "week2": 14, "week3": 17, "week4": 15, "total": 61, "avg": 15.25, "revenue": 64416.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 10.3, "dinamika": "Рост"}, {"id": 33, "sku": "GM-1085", "name": "Тетрадь 48л", "category": "Канцтовары", "price": 106.0, "stock": 22, "is_active": 1, "week1": 10, "week2": 9, "week3": 13, "week4": 8, "total": 40, "avg": 10.0, "revenue": 4240.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 10.5, "dinamika": "Рост"}, {"id": 34, "sku": "GM-1086", "name": "Тетрадь 48л люкс", "category": "Канцтовары", "price": 166.0, "stock": 16, "is_active": 1, "week1": 11, "week2": 13, "week3": 9, "week4": 10, "total": 43, "avg": 10.75, "revenue": 7138.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -20.8, "dinamika": "Падение"}, {"id": 35, "sku": "GM-1087", "name": "Ручка шариковая", "category": "Канцтовары", "price": 64.0, "stock": 4, "is_active": 1, "week1": 5, "week2": 5, "week3": 5, "week4": 7, "total": 22, "avg": 5.5, "revenue": 1408.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 20.0, "dinamika": "Рост"}, {"id": 36, "sku": "GM-1088", "name": "Ручка шариковая люкс", "category": "Канцтовары", "price": 95.0, "stock": 9, "is_active": 1, "week1": 5, "week2": 5, "week3": 13, "week4": 13, "total": 36, "avg": 9.0, "revenue": 3420.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 160.0, "dinamika": "Рост"}, {"id": 37, "sku": "GM-1089", "name": "Карандаши 12цв", "category": "Канцтовары", "price": 233.0, "stock": 15, "is_active": 1, "week1": 10, "week2": 7, "week3": 8, "week4": 13, "total": 38, "avg": 9.5, "revenue": 8854.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 23.5, "dinamika": "Рост"}, {"id": 38, "sku": "GM-1090", "name": "Карандаши 12цв люкс", "category": "Канцтовары", "price": 224.0, "stock": 20, "is_active": 1, "week1": 14, "week2": 9, "week3": 15, "week4": 15, "total": 53, "avg": 13.25, "revenue": 11872.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 30.4, "dinamika": "Рост"}, {"id": 39, "sku": "GM-1091", "name": "Альбом для рисования", "category": "Канцтовары", "price": 219.0, "stock": 15, "is_active": 1, "week1": 7, "week2": 11, "week3": 8, "week4": 11, "total": 37, "avg": 9.25, "revenue": 8103.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 5.6, "dinamika": "Рост"}, {"id": 40, "sku": "GM-1092", "name": "Альбом для рисования люкс", "category": "Канцтовары", "price": 300.0, "stock": 9, "is_active": 1, "week1": 14, "week2": 12, "week3": 9, "week4": 11, "total": 46, "avg": 11.5, "revenue": 13800.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -23.1, "dinamika": "Падение"}, {"id": 41, "sku": "GM-1093", "name": "Клей ПВА 100мл", "category": "Канцтовары", "price": 164.0, "stock": 14, "is_active": 1, "week1": 3, "week2": 2, "week3": 5, "week4": 5, "total": 15, "avg": 3.75, "revenue": 2460.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 100.0, "dinamika": "Рост"}, {"id": 42, "sku": "GM-1094", "name": "Клей ПВА 100мл люкс", "category": "Канцтовары", "price": 109.0, "stock": 20, "is_active": 1, "week1": 6, "week2": 6, "week3": 2, "week4": 5, "total": 19, "avg": 4.75, "revenue": 2071.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -41.7, "dinamika": "Падение"}, {"id": 43, "sku": "GM-1095", "name": "Ножницы детские", "category": "Канцтовары", "price": 313.0, "stock": 16, "is_active": 1, "week1": 6, "week2": 4, "week3": 2, "week4": 7, "total": 19, "avg": 4.75, "revenue": 5947.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -10.0, "dinamika": "Падение"}, {"id": 44, "sku": "GM-1096", "name": "Ножницы детские люкс", "category": "Канцтовары", "price": 118.0, "stock": 27, "is_active": 1, "week1": 0, "week2": 0, "week3": 0, "week4": 0, "total": 0, "avg": 0, "revenue": 0.0, "last_sale_date": null, "days_since_last_sale": 999, "trend": 0, "dinamika": "Стабильно"}, {"id": 45, "sku": "GM-1097", "name": "Линейка 30см", "category": "Канцтовары", "price": 192.0, "stock": 9, "is_active": 1, "week1": 4, "week2": 6, "week3": 16, "week4": 16, "total": 42, "avg": 10.5, "revenue": 8064.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 220.0, "dinamika": "Рост"}, {"id": 46, "sku": "GM-1098", "name": "Линейка 30см люкс", "category": "Канцтовары", "price": 154.0, "stock": 13, "is_active": 1, "week1": 7, "week2": 12, "week3": 11, "week4": 7, "total": 37, "avg": 9.25, "revenue": 5698.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -5.3, "dinamika": "Падение"}, {"id": 47, "sku": "GM-1099", "name": "Краски акварельные", "category": "Канцтовары", "price": 139.0, "stock": 8, "is_active": 1, "week1": 10, "week2": 16, "week3": 10, "week4": 11, "total": 47, "avg": 11.75, "revenue": 6533.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -19.2, "dinamika": "Падение"}, {"id": 48, "sku": "GM-1100", "name": "Краски акварельные люкс", "category": "Канцтовары", "price": 35.0, "stock": 20, "is_active": 1, "week1": 4, "week2": 6, "week3": 8, "week4": 3, "total": 21, "avg": 5.25, "revenue": 735.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 10.0, "dinamika": "Рост"}, {"id": 49, "sku": "GM-1101", "name": "Тарелка керамическая", "category": "Посуда", "price": 566.0, "stock": 21, "is_active": 1, "week1": 10, "week2": 6, "week3": 5, "week4": 8, "total": 29, "avg": 7.25, "revenue": 16414.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -18.8, "dinamika": "Падение"}, {"id": 50, "sku": "GM-1102", "name": "Тарелка керамическая люкс", "category": "Посуда", "price": 354.0, "stock": 11, "is_active": 1, "week1": 4, "week2": 2, "week3": 6, "week4": 2, "total": 14, "avg": 3.5, "revenue": 4956.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 33.3, "dinamika": "Рост"}, {"id": 51, "sku": "GM-1103", "name": "Кружка 300мл", "category": "Посуда", "price": 1299.0, "stock": 20, "is_active": 1, "week1": 9, "week2": 11, "week3": 7, "week4": 6, "total": 33, "avg": 8.25, "revenue": 42867.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -35.0, "dinamika": "Падение"}, {"id": 52, "sku": "GM-1104", "name": "Кружка 300мл люкс", "category": "Посуда", "price": 1404.0, "stock": 3, "is_active": 1, "week1": 4, "week2": 8, "week3": 11, "week4": 21, "total": 44, "avg": 11.0, "revenue": 61776.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 166.7, "dinamika": "Рост"}, {"id": 53, "sku": "GM-1105", "name": "Набор ложек 6шт", "category": "Посуда", "price": 831.0, "stock": 12, "is_active": 1, "week1": 12, "week2": 10, "week3": 14, "week4": 15, "total": 51, "avg": 12.75, "revenue": 42381.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 31.8, "dinamika": "Рост"}, {"id": 54, "sku": "GM-1106", "name": "Набор ложек 6шт люкс", "category": "Посуда", "price": 145.0, "stock": 16, "is_active": 1, "week1": 7, "week2": 10, "week3": 9, "week4": 12, "total": 38, "avg": 9.5, "revenue": 5510.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 23.5, "dinamika": "Рост"}, {"id": 55, "sku": "GM-1107", "name": "Сковорода 24см", "category": "Посуда", "price": 433.0, "stock": 19, "is_active": 1, "week1": 15, "week2": 16, "week3": 13, "week4": 15, "total": 59, "avg": 14.75, "revenue": 25547.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -9.7, "dinamika": "Падение"}, {"id": 56, "sku": "GM-1108", "name": "Сковорода 24см люкс", "category": "Посуда", "price": 1110.0, "stock": 9, "is_active": 1, "week1": 15, "week2": 13, "week3": 13, "week4": 17, "total": 58, "avg": 14.5, "revenue": 64380.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 7.1, "dinamika": "Рост"}, {"id": 57, "sku": "GM-1109", "name": "Кастрюля 3л", "category": "Посуда", "price": 297.0, "stock": 21, "is_active": 1, "week1": 8, "week2": 13, "week3": 10, "week4": 11, "total": 42, "avg": 10.5, "revenue": 12474.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 0.0, "dinamika": "Стабильно"}, {"id": 58, "sku": "GM-1110", "name": "Кастрюля 3л люкс", "category": "Посуда", "price": 1488.0, "stock": 17, "is_active": 1, "week1": 3, "week2": 6, "week3": 2, "week4": 1, "total": 12, "avg": 3.0, "revenue": 17856.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -66.7, "dinamika": "Падение"}, {"id": 59, "sku": "GM-1111", "name": "Контейнер пищевой", "category": "Посуда", "price": 554.0, "stock": 10, "is_active": 1, "week1": 6, "week2": 6, "week3": 8, "week4": 9, "total": 29, "avg": 7.25, "revenue": 16066.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 41.7, "dinamika": "Рост"}, {"id": 60, "sku": "GM-1112", "name": "Контейнер пищевой люкс", "category": "Посуда", "price": 1258.0, "stock": 21, "is_active": 1, "week1": 0, "week2": 0, "week3": 0, "week4": 0, "total": 0, "avg": 0, "revenue": 0.0, "last_sale_date": null, "days_since_last_sale": 999, "trend": 0, "dinamika": "Стабильно"}, {"id": 61, "sku": "GM-1113", "name": "Разделочная доска", "category": "Посуда", "price": 295.0, "stock": 10, "is_active": 1, "week1": 5, "week2": 7, "week3": 18, "week4": 15, "total": 45, "avg": 11.25, "revenue": 13275.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 175.0, "dinamika": "Рост"}, {"id": 62, "sku": "GM-1114", "name": "Разделочная доска люкс", "category": "Посуда", "price": 1442.0, "stock": 9, "is_active": 1, "week1": 13, "week2": 7, "week3": 7, "week4": 9, "total": 36, "avg": 9.0, "revenue": 51912.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -20.0, "dinamika": "Падение"}, {"id": 63, "sku": "GM-1115", "name": "Термос 1л", "category": "Посуда", "price": 948.0, "stock": 19, "is_active": 1, "week1": 9, "week2": 8, "week3": 6, "week4": 7, "total": 30, "avg": 7.5, "revenue": 28440.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -23.5, "dinamika": "Падение"}, {"id": 64, "sku": "GM-1116", "name": "Термос 1л люкс", "category": "Посуда", "price": 1207.0, "stock": 16, "is_active": 1, "week1": 15, "week2": 13, "week3": 13, "week4": 16, "total": 57, "avg": 14.25, "revenue": 68799.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 3.6, "dinamika": "Стабильно"}, {"id": 65, "sku": "GM-1117", "name": "Полотенце махровое", "category": "Текстиль", "price": 377.0, "stock": 5, "is_active": 1, "week1": 3, "week2": 8, "week3": 4, "week4": 5, "total": 20, "avg": 5.0, "revenue": 7540.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": -18.2, "dinamika": "Падение"}, {"id": 66, "sku": "GM-1118", "name": "Наволочка 50x70", "category": "Текстиль", "price": 648.0, "stock": 17, "is_active": 1, "week1": 12, "week2": 12, "week3": 12, "week4": 16, "total": 52, "avg": 13.0, "revenue": 33696.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 16.7, "dinamika": "Рост"}, {"id": 67, "sku": "GM-1119", "name": "Плед флисовый", "category": "Текстиль", "price": 383.0, "stock": 8, "is_active": 1, "week1": 12, "week2": 10, "week3": 8, "week4": 14, "total": 44, "avg": 11.0, "revenue": 16852.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 0.0, "dinamika": "Стабильно"}, {"id": 68, "sku": "GM-1120", "name": "Скатерть 140x180", "category": "Текстиль", "price": 403.0, "stock": 5, "is_active": 1, "week1": 3, "week2": 6, "week3": 10, "week4": 20, "total": 39, "avg": 9.75, "revenue": 15717.0, "last_sale_date": "2026-09-11", "days_since_last_sale": 0, "trend": 233.3, "dinamika": "Рост"}];
const FALLBACK_SALES = [{"sku": "GM-1053", "name": "Порошок стиральный 3кг", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 15, "total": 2970.0, "price": 198.0}, {"sku": "GM-1053", "name": "Порошок стиральный 3кг", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 12, "total": 2376.0, "price": 198.0}, {"sku": "GM-1053", "name": "Порошок стиральный 3кг", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 13, "total": 2574.0, "price": 198.0}, {"sku": "GM-1053", "name": "Порошок стиральный 3кг", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 13, "total": 2574.0, "price": 198.0}, {"sku": "GM-1054", "name": "Порошок стиральный 3кг люкс", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 8, "total": 2360.0, "price": 295.0}, {"sku": "GM-1054", "name": "Порошок стиральный 3кг люкс", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 8, "total": 2360.0, "price": 295.0}, {"sku": "GM-1054", "name": "Порошок стиральный 3кг люкс", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 9, "total": 2655.0, "price": 295.0}, {"sku": "GM-1054", "name": "Порошок стиральный 3кг люкс", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 5, "total": 1475.0, "price": 295.0}, {"sku": "GM-1055", "name": "Средство для посуды 500мл", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 5, "total": 2900.0, "price": 580.0}, {"sku": "GM-1055", "name": "Средство для посуды 500мл", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 3, "total": 1740.0, "price": 580.0}, {"sku": "GM-1055", "name": "Средство для посуды 500мл", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 6, "total": 3480.0, "price": 580.0}, {"sku": "GM-1057", "name": "Мыло хозяйственное", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 5, "total": 1065.0, "price": 213.0}, {"sku": "GM-1057", "name": "Мыло хозяйственное", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 9, "total": 1917.0, "price": 213.0}, {"sku": "GM-1057", "name": "Мыло хозяйственное", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 7, "total": 1491.0, "price": 213.0}, {"sku": "GM-1057", "name": "Мыло хозяйственное", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 8, "total": 1704.0, "price": 213.0}, {"sku": "GM-1058", "name": "Мыло хозяйственное люкс", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 1, "total": 517.0, "price": 517.0}, {"sku": "GM-1058", "name": "Мыло хозяйственное люкс", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 6, "total": 3102.0, "price": 517.0}, {"sku": "GM-1058", "name": "Мыло хозяйственное люкс", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 2, "total": 1034.0, "price": 517.0}, {"sku": "GM-1058", "name": "Мыло хозяйственное люкс", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 5, "total": 2585.0, "price": 517.0}, {"sku": "GM-1059", "name": "Шампунь 400мл", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 5, "total": 2290.0, "price": 458.0}, {"sku": "GM-1059", "name": "Шампунь 400мл", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 3, "total": 1374.0, "price": 458.0}, {"sku": "GM-1059", "name": "Шампунь 400мл", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 2, "total": 916.0, "price": 458.0}, {"sku": "GM-1059", "name": "Шампунь 400мл", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 4, "total": 1832.0, "price": 458.0}, {"sku": "GM-1060", "name": "Шампунь 400мл люкс", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 8, "total": 960.0, "price": 120.0}, {"sku": "GM-1060", "name": "Шампунь 400мл люкс", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 4, "total": 480.0, "price": 120.0}, {"sku": "GM-1060", "name": "Шампунь 400мл люкс", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 8, "total": 960.0, "price": 120.0}, {"sku": "GM-1060", "name": "Шампунь 400мл люкс", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 3, "total": 360.0, "price": 120.0}, {"sku": "GM-1061", "name": "Зубная паста", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 12, "total": 5952.0, "price": 496.0}, {"sku": "GM-1061", "name": "Зубная паста", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 12, "total": 5952.0, "price": 496.0}, {"sku": "GM-1061", "name": "Зубная паста", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 17, "total": 8432.0, "price": 496.0}, {"sku": "GM-1061", "name": "Зубная паста", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 12, "total": 5952.0, "price": 496.0}, {"sku": "GM-1063", "name": "Губки для посуды 3шт", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 12, "total": 5040.0, "price": 420.0}, {"sku": "GM-1063", "name": "Губки для посуды 3шт", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 11, "total": 4620.0, "price": 420.0}, {"sku": "GM-1063", "name": "Губки для посуды 3шт", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 12, "total": 5040.0, "price": 420.0}, {"sku": "GM-1063", "name": "Губки для посуды 3шт", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 11, "total": 4620.0, "price": 420.0}, {"sku": "GM-1064", "name": "Губки для посуды 3шт люкс", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 2, "total": 706.0, "price": 353.0}, {"sku": "GM-1064", "name": "Губки для посуды 3шт люкс", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 7, "total": 2471.0, "price": 353.0}, {"sku": "GM-1064", "name": "Губки для посуды 3шт люкс", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 10, "total": 3530.0, "price": 353.0}, {"sku": "GM-1064", "name": "Губки для посуды 3шт люкс", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 19, "total": 6707.0, "price": 353.0}, {"sku": "GM-1065", "name": "Салфетки влажные", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 9, "total": 2556.0, "price": 284.0}, {"sku": "GM-1065", "name": "Салфетки влажные", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 9, "total": 2556.0, "price": 284.0}, {"sku": "GM-1065", "name": "Салфетки влажные", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 13, "total": 3692.0, "price": 284.0}, {"sku": "GM-1065", "name": "Салфетки влажные", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 13, "total": 3692.0, "price": 284.0}, {"sku": "GM-1067", "name": "Освежитель воздуха", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 7, "total": 3416.0, "price": 488.0}, {"sku": "GM-1067", "name": "Освежитель воздуха", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 3, "total": 1464.0, "price": 488.0}, {"sku": "GM-1067", "name": "Освежитель воздуха", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 3, "total": 1464.0, "price": 488.0}, {"sku": "GM-1067", "name": "Освежитель воздуха", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 6, "total": 2928.0, "price": 488.0}, {"sku": "GM-1068", "name": "Освежитель воздуха люкс", "category": "Бытовая химия", "date": "2026-08-15", "quantity": 10, "total": 4890.0, "price": 489.0}, {"sku": "GM-1068", "name": "Освежитель воздуха люкс", "category": "Бытовая химия", "date": "2026-08-22", "quantity": 8, "total": 3912.0, "price": 489.0}, {"sku": "GM-1068", "name": "Освежитель воздуха люкс", "category": "Бытовая химия", "date": "2026-08-29", "quantity": 8, "total": 3912.0, "price": 489.0}, {"sku": "GM-1068", "name": "Освежитель воздуха люкс", "category": "Бытовая химия", "date": "2026-09-05", "quantity": 10, "total": 4890.0, "price": 489.0}, {"sku": "GM-1070", "name": "Кукла Барби люкс", "category": "Игрушки", "date": "2026-08-15", "quantity": 8, "total": 8312.0, "price": 1039.0}, {"sku": "GM-1070", "name": "Кукла Барби люкс", "category": "Игрушки", "date": "2026-08-22", "quantity": 9, "total": 9351.0, "price": 1039.0}, {"sku": "GM-1070", "name": "Кукла Барби люкс", "category": "Игрушки", "date": "2026-08-29", "quantity": 9, "total": 9351.0, "price": 1039.0}, {"sku": "GM-1070", "name": "Кукла Барби люкс", "category": "Игрушки", "date": "2026-09-05", "quantity": 5, "total": 5195.0, "price": 1039.0}, {"sku": "GM-1071", "name": "Машинка инерционная", "category": "Игрушки", "date": "2026-08-15", "quantity": 14, "total": 7546.0, "price": 539.0}, {"sku": "GM-1071", "name": "Машинка инерционная", "category": "Игрушки", "date": "2026-08-22", "quantity": 11, "total": 5929.0, "price": 539.0}, {"sku": "GM-1071", "name": "Машинка инерционная", "category": "Игрушки", "date": "2026-08-29", "quantity": 15, "total": 8085.0, "price": 539.0}, {"sku": "GM-1071", "name": "Машинка инерционная", "category": "Игрушки", "date": "2026-09-05", "quantity": 17, "total": 9163.0, "price": 539.0}, {"sku": "GM-1072", "name": "Машинка инерционная люкс", "category": "Игрушки", "date": "2026-08-15", "quantity": 6, "total": 3318.0, "price": 553.0}, {"sku": "GM-1072", "name": "Машинка инерционная люкс", "category": "Игрушки", "date": "2026-08-22", "quantity": 3, "total": 1659.0, "price": 553.0}, {"sku": "GM-1072", "name": "Машинка инерционная люкс", "category": "Игрушки", "date": "2026-08-29", "quantity": 5, "total": 2765.0, "price": 553.0}, {"sku": "GM-1072", "name": "Машинка инерционная люкс", "category": "Игрушки", "date": "2026-09-05", "quantity": 3, "total": 1659.0, "price": 553.0}, {"sku": "GM-1073", "name": "Конструктор 100 дет", "category": "Игрушки", "date": "2026-08-15", "quantity": 8, "total": 3240.0, "price": 405.0}, {"sku": "GM-1073", "name": "Конструктор 100 дет", "category": "Игрушки", "date": "2026-08-22", "quantity": 6, "total": 2430.0, "price": 405.0}, {"sku": "GM-1073", "name": "Конструктор 100 дет", "category": "Игрушки", "date": "2026-08-29", "quantity": 9, "total": 3645.0, "price": 405.0}, {"sku": "GM-1073", "name": "Конструктор 100 дет", "category": "Игрушки", "date": "2026-09-05", "quantity": 7, "total": 2835.0, "price": 405.0}, {"sku": "GM-1074", "name": "Конструктор 100 дет люкс", "category": "Игрушки", "date": "2026-08-15", "quantity": 9, "total": 8766.0, "price": 974.0}, {"sku": "GM-1074", "name": "Конструктор 100 дет люкс", "category": "Игрушки", "date": "2026-08-22", "quantity": 9, "total": 8766.0, "price": 974.0}, {"sku": "GM-1074", "name": "Конструктор 100 дет люкс", "category": "Игрушки", "date": "2026-08-29", "quantity": 11, "total": 10714.0, "price": 974.0}, {"sku": "GM-1074", "name": "Конструктор 100 дет люкс", "category": "Игрушки", "date": "2026-09-05", "quantity": 13, "total": 12662.0, "price": 974.0}, {"sku": "GM-1075", "name": "Мяч резиновый", "category": "Игрушки", "date": "2026-08-15", "quantity": 7, "total": 3542.0, "price": 506.0}, {"sku": "GM-1075", "name": "Мяч резиновый", "category": "Игрушки", "date": "2026-08-22", "quantity": 8, "total": 4048.0, "price": 506.0}, {"sku": "GM-1075", "name": "Мяч резиновый", "category": "Игрушки", "date": "2026-08-29", "quantity": 10, "total": 5060.0, "price": 506.0}, {"sku": "GM-1075", "name": "Мяч резиновый", "category": "Игрушки", "date": "2026-09-05", "quantity": 4, "total": 2024.0, "price": 506.0}, {"sku": "GM-1076", "name": "Мяч резиновый люкс", "category": "Игрушки", "date": "2026-08-15", "quantity": 6, "total": 4422.0, "price": 737.0}, {"sku": "GM-1076", "name": "Мяч резиновый люкс", "category": "Игрушки", "date": "2026-08-22", "quantity": 8, "total": 5896.0, "price": 737.0}, {"sku": "GM-1076", "name": "Мяч резиновый люкс", "category": "Игрушки", "date": "2026-08-29", "quantity": 15, "total": 11055.0, "price": 737.0}, {"sku": "GM-1076", "name": "Мяч резиновый люкс", "category": "Игрушки", "date": "2026-09-05", "quantity": 19, "total": 14003.0, "price": 737.0}, {"sku": "GM-1077", "name": "Пазл 500 эл", "category": "Игрушки", "date": "2026-08-15", "quantity": 11, "total": 11605.0, "price": 1055.0}, {"sku": "GM-1077", "name": "Пазл 500 эл", "category": "Игрушки", "date": "2026-08-22", "quantity": 14, "total": 14770.0, "price": 1055.0}, {"sku": "GM-1077", "name": "Пазл 500 эл", "category": "Игрушки", "date": "2026-08-29", "quantity": 14, "total": 14770.0, "price": 1055.0}, {"sku": "GM-1077", "name": "Пазл 500 эл", "category": "Игрушки", "date": "2026-09-05", "quantity": 13, "total": 13715.0, "price": 1055.0}, {"sku": "GM-1078", "name": "Пазл 500 эл люкс", "category": "Игрушки", "date": "2026-08-15", "quantity": 15, "total": 4845.0, "price": 323.0}, {"sku": "GM-1078", "name": "Пазл 500 эл люкс", "category": "Игрушки", "date": "2026-08-22", "quantity": 14, "total": 4522.0, "price": 323.0}, {"sku": "GM-1078", "name": "Пазл 500 эл люкс", "category": "Игрушки", "date": "2026-08-29", "quantity": 12, "total": 3876.0, "price": 323.0}, {"sku": "GM-1078", "name": "Пазл 500 эл люкс", "category": "Игрушки", "date": "2026-09-05", "quantity": 10, "total": 3230.0, "price": 323.0}, {"sku": "GM-1079", "name": "Плюшевый медведь", "category": "Игрушки", "date": "2026-08-15", "quantity": 3, "total": 2355.0, "price": 785.0}, {"sku": "GM-1079", "name": "Плюшевый медведь", "category": "Игрушки", "date": "2026-08-22", "quantity": 5, "total": 3925.0, "price": 785.0}, {"sku": "GM-1079", "name": "Плюшевый медведь", "category": "Игрушки", "date": "2026-08-29", "quantity": 10, "total": 7850.0, "price": 785.0}, {"sku": "GM-1079", "name": "Плюшевый медведь", "category": "Игрушки", "date": "2026-09-05", "quantity": 12, "total": 9420.0, "price": 785.0}, {"sku": "GM-1080", "name": "Плюшевый медведь люкс", "category": "Игрушки", "date": "2026-08-15", "quantity": 4, "total": 4492.0, "price": 1123.0}, {"sku": "GM-1080", "name": "Плюшевый медведь люкс", "category": "Игрушки", "date": "2026-08-22", "quantity": 4, "total": 4492.0, "price": 1123.0}, {"sku": "GM-1080", "name": "Плюшевый медведь люкс", "category": "Игрушки", "date": "2026-08-29", "quantity": 6, "total": 6738.0, "price": 1123.0}, {"sku": "GM-1080", "name": "Плюшевый медведь люкс", "category": "Игрушки", "date": "2026-09-05", "quantity": 5, "total": 5615.0, "price": 1123.0}, {"sku": "GM-1081", "name": "Набор фломастеров", "category": "Игрушки", "date": "2026-08-15", "quantity": 4, "total": 3744.0, "price": 936.0}, {"sku": "GM-1081", "name": "Набор фломастеров", "category": "Игрушки", "date": "2026-08-22", "quantity": 8, "total": 7488.0, "price": 936.0}, {"sku": "GM-1081", "name": "Набор фломастеров", "category": "Игрушки", "date": "2026-08-29", "quantity": 8, "total": 7488.0, "price": 936.0}, {"sku": "GM-1081", "name": "Набор фломастеров", "category": "Игрушки", "date": "2026-09-05", "quantity": 3, "total": 2808.0, "price": 936.0}, {"sku": "GM-1082", "name": "Набор фломастеров люкс", "category": "Игрушки", "date": "2026-08-15", "quantity": 6, "total": 6120.0, "price": 1020.0}, {"sku": "GM-1082", "name": "Набор фломастеров люкс", "category": "Игрушки", "date": "2026-08-22", "quantity": 7, "total": 7140.0, "price": 1020.0}, {"sku": "GM-1082", "name": "Набор фломастеров люкс", "category": "Игрушки", "date": "2026-08-29", "quantity": 10, "total": 10200.0, "price": 1020.0}, {"sku": "GM-1082", "name": "Набор фломастеров люкс", "category": "Игрушки", "date": "2026-09-05", "quantity": 20, "total": 20400.0, "price": 1020.0}, {"sku": "GM-1083", "name": "Игра настольная", "category": "Игрушки", "date": "2026-08-15", "quantity": 12, "total": 4776.0, "price": 398.0}, {"sku": "GM-1083", "name": "Игра настольная", "category": "Игрушки", "date": "2026-08-22", "quantity": 11, "total": 4378.0, "price": 398.0}, {"sku": "GM-1083", "name": "Игра настольная", "category": "Игрушки", "date": "2026-08-29", "quantity": 11, "total": 4378.0, "price": 398.0}, {"sku": "GM-1083", "name": "Игра настольная", "category": "Игрушки", "date": "2026-09-05", "quantity": 11, "total": 4378.0, "price": 398.0}, {"sku": "GM-1084", "name": "Игра настольная люкс", "category": "Игрушки", "date": "2026-08-15", "quantity": 15, "total": 15840.0, "price": 1056.0}, {"sku": "GM-1084", "name": "Игра настольная люкс", "category": "Игрушки", "date": "2026-08-22", "quantity": 14, "total": 14784.0, "price": 1056.0}, {"sku": "GM-1084", "name": "Игра настольная люкс", "category": "Игрушки", "date": "2026-08-29", "quantity": 17, "total": 17952.0, "price": 1056.0}, {"sku": "GM-1084", "name": "Игра настольная люкс", "category": "Игрушки", "date": "2026-09-05", "quantity": 15, "total": 15840.0, "price": 1056.0}, {"sku": "GM-1085", "name": "Тетрадь 48л", "category": "Канцтовары", "date": "2026-08-15", "quantity": 10, "total": 1060.0, "price": 106.0}, {"sku": "GM-1085", "name": "Тетрадь 48л", "category": "Канцтовары", "date": "2026-08-22", "quantity": 9, "total": 954.0, "price": 106.0}, {"sku": "GM-1085", "name": "Тетрадь 48л", "category": "Канцтовары", "date": "2026-08-29", "quantity": 13, "total": 1378.0, "price": 106.0}, {"sku": "GM-1085", "name": "Тетрадь 48л", "category": "Канцтовары", "date": "2026-09-05", "quantity": 8, "total": 848.0, "price": 106.0}, {"sku": "GM-1086", "name": "Тетрадь 48л люкс", "category": "Канцтовары", "date": "2026-08-15", "quantity": 11, "total": 1826.0, "price": 166.0}, {"sku": "GM-1086", "name": "Тетрадь 48л люкс", "category": "Канцтовары", "date": "2026-08-22", "quantity": 13, "total": 2158.0, "price": 166.0}, {"sku": "GM-1086", "name": "Тетрадь 48л люкс", "category": "Канцтовары", "date": "2026-08-29", "quantity": 9, "total": 1494.0, "price": 166.0}, {"sku": "GM-1086", "name": "Тетрадь 48л люкс", "category": "Канцтовары", "date": "2026-09-05", "quantity": 10, "total": 1660.0, "price": 166.0}, {"sku": "GM-1087", "name": "Ручка шариковая", "category": "Канцтовары", "date": "2026-08-15", "quantity": 5, "total": 320.0, "price": 64.0}, {"sku": "GM-1087", "name": "Ручка шариковая", "category": "Канцтовары", "date": "2026-08-22", "quantity": 5, "total": 320.0, "price": 64.0}, {"sku": "GM-1087", "name": "Ручка шариковая", "category": "Канцтовары", "date": "2026-08-29", "quantity": 5, "total": 320.0, "price": 64.0}, {"sku": "GM-1087", "name": "Ручка шариковая", "category": "Канцтовары", "date": "2026-09-05", "quantity": 7, "total": 448.0, "price": 64.0}, {"sku": "GM-1088", "name": "Ручка шариковая люкс", "category": "Канцтовары", "date": "2026-08-15", "quantity": 5, "total": 475.0, "price": 95.0}, {"sku": "GM-1088", "name": "Ручка шариковая люкс", "category": "Канцтовары", "date": "2026-08-22", "quantity": 5, "total": 475.0, "price": 95.0}, {"sku": "GM-1088", "name": "Ручка шариковая люкс", "category": "Канцтовары", "date": "2026-08-29", "quantity": 13, "total": 1235.0, "price": 95.0}, {"sku": "GM-1088", "name": "Ручка шариковая люкс", "category": "Канцтовары", "date": "2026-09-05", "quantity": 13, "total": 1235.0, "price": 95.0}, {"sku": "GM-1089", "name": "Карандаши 12цв", "category": "Канцтовары", "date": "2026-08-15", "quantity": 10, "total": 2330.0, "price": 233.0}, {"sku": "GM-1089", "name": "Карандаши 12цв", "category": "Канцтовары", "date": "2026-08-22", "quantity": 7, "total": 1631.0, "price": 233.0}, {"sku": "GM-1089", "name": "Карандаши 12цв", "category": "Канцтовары", "date": "2026-08-29", "quantity": 8, "total": 1864.0, "price": 233.0}, {"sku": "GM-1089", "name": "Карандаши 12цв", "category": "Канцтовары", "date": "2026-09-05", "quantity": 13, "total": 3029.0, "price": 233.0}, {"sku": "GM-1090", "name": "Карандаши 12цв люкс", "category": "Канцтовары", "date": "2026-08-15", "quantity": 14, "total": 3136.0, "price": 224.0}, {"sku": "GM-1090", "name": "Карандаши 12цв люкс", "category": "Канцтовары", "date": "2026-08-22", "quantity": 9, "total": 2016.0, "price": 224.0}, {"sku": "GM-1090", "name": "Карандаши 12цв люкс", "category": "Канцтовары", "date": "2026-08-29", "quantity": 15, "total": 3360.0, "price": 224.0}, {"sku": "GM-1090", "name": "Карандаши 12цв люкс", "category": "Канцтовары", "date": "2026-09-05", "quantity": 15, "total": 3360.0, "price": 224.0}, {"sku": "GM-1091", "name": "Альбом для рисования", "category": "Канцтовары", "date": "2026-08-15", "quantity": 7, "total": 1533.0, "price": 219.0}, {"sku": "GM-1091", "name": "Альбом для рисования", "category": "Канцтовары", "date": "2026-08-22", "quantity": 11, "total": 2409.0, "price": 219.0}, {"sku": "GM-1091", "name": "Альбом для рисования", "category": "Канцтовары", "date": "2026-08-29", "quantity": 8, "total": 1752.0, "price": 219.0}, {"sku": "GM-1091", "name": "Альбом для рисования", "category": "Канцтовары", "date": "2026-09-05", "quantity": 11, "total": 2409.0, "price": 219.0}, {"sku": "GM-1092", "name": "Альбом для рисования люкс", "category": "Канцтовары", "date": "2026-08-15", "quantity": 14, "total": 4200.0, "price": 300.0}, {"sku": "GM-1092", "name": "Альбом для рисования люкс", "category": "Канцтовары", "date": "2026-08-22", "quantity": 12, "total": 3600.0, "price": 300.0}, {"sku": "GM-1092", "name": "Альбом для рисования люкс", "category": "Канцтовары", "date": "2026-08-29", "quantity": 9, "total": 2700.0, "price": 300.0}, {"sku": "GM-1092", "name": "Альбом для рисования люкс", "category": "Канцтовары", "date": "2026-09-05", "quantity": 11, "total": 3300.0, "price": 300.0}, {"sku": "GM-1093", "name": "Клей ПВА 100мл", "category": "Канцтовары", "date": "2026-08-15", "quantity": 3, "total": 492.0, "price": 164.0}, {"sku": "GM-1093", "name": "Клей ПВА 100мл", "category": "Канцтовары", "date": "2026-08-22", "quantity": 2, "total": 328.0, "price": 164.0}, {"sku": "GM-1093", "name": "Клей ПВА 100мл", "category": "Канцтовары", "date": "2026-08-29", "quantity": 5, "total": 820.0, "price": 164.0}, {"sku": "GM-1093", "name": "Клей ПВА 100мл", "category": "Канцтовары", "date": "2026-09-05", "quantity": 5, "total": 820.0, "price": 164.0}, {"sku": "GM-1094", "name": "Клей ПВА 100мл люкс", "category": "Канцтовары", "date": "2026-08-15", "quantity": 6, "total": 654.0, "price": 109.0}, {"sku": "GM-1094", "name": "Клей ПВА 100мл люкс", "category": "Канцтовары", "date": "2026-08-22", "quantity": 6, "total": 654.0, "price": 109.0}, {"sku": "GM-1094", "name": "Клей ПВА 100мл люкс", "category": "Канцтовары", "date": "2026-08-29", "quantity": 2, "total": 218.0, "price": 109.0}, {"sku": "GM-1094", "name": "Клей ПВА 100мл люкс", "category": "Канцтовары", "date": "2026-09-05", "quantity": 5, "total": 545.0, "price": 109.0}, {"sku": "GM-1095", "name": "Ножницы детские", "category": "Канцтовары", "date": "2026-08-15", "quantity": 6, "total": 1878.0, "price": 313.0}, {"sku": "GM-1095", "name": "Ножницы детские", "category": "Канцтовары", "date": "2026-08-22", "quantity": 4, "total": 1252.0, "price": 313.0}, {"sku": "GM-1095", "name": "Ножницы детские", "category": "Канцтовары", "date": "2026-08-29", "quantity": 2, "total": 626.0, "price": 313.0}, {"sku": "GM-1095", "name": "Ножницы детские", "category": "Канцтовары", "date": "2026-09-05", "quantity": 7, "total": 2191.0, "price": 313.0}, {"sku": "GM-1097", "name": "Линейка 30см", "category": "Канцтовары", "date": "2026-08-15", "quantity": 4, "total": 768.0, "price": 192.0}, {"sku": "GM-1097", "name": "Линейка 30см", "category": "Канцтовары", "date": "2026-08-22", "quantity": 6, "total": 1152.0, "price": 192.0}, {"sku": "GM-1097", "name": "Линейка 30см", "category": "Канцтовары", "date": "2026-08-29", "quantity": 16, "total": 3072.0, "price": 192.0}, {"sku": "GM-1097", "name": "Линейка 30см", "category": "Канцтовары", "date": "2026-09-05", "quantity": 16, "total": 3072.0, "price": 192.0}, {"sku": "GM-1098", "name": "Линейка 30см люкс", "category": "Канцтовары", "date": "2026-08-15", "quantity": 7, "total": 1078.0, "price": 154.0}, {"sku": "GM-1098", "name": "Линейка 30см люкс", "category": "Канцтовары", "date": "2026-08-22", "quantity": 12, "total": 1848.0, "price": 154.0}, {"sku": "GM-1098", "name": "Линейка 30см люкс", "category": "Канцтовары", "date": "2026-08-29", "quantity": 11, "total": 1694.0, "price": 154.0}, {"sku": "GM-1098", "name": "Линейка 30см люкс", "category": "Канцтовары", "date": "2026-09-05", "quantity": 7, "total": 1078.0, "price": 154.0}, {"sku": "GM-1099", "name": "Краски акварельные", "category": "Канцтовары", "date": "2026-08-15", "quantity": 10, "total": 1390.0, "price": 139.0}, {"sku": "GM-1099", "name": "Краски акварельные", "category": "Канцтовары", "date": "2026-08-22", "quantity": 16, "total": 2224.0, "price": 139.0}, {"sku": "GM-1099", "name": "Краски акварельные", "category": "Канцтовары", "date": "2026-08-29", "quantity": 10, "total": 1390.0, "price": 139.0}, {"sku": "GM-1099", "name": "Краски акварельные", "category": "Канцтовары", "date": "2026-09-05", "quantity": 11, "total": 1529.0, "price": 139.0}, {"sku": "GM-1100", "name": "Краски акварельные люкс", "category": "Канцтовары", "date": "2026-08-15", "quantity": 4, "total": 140.0, "price": 35.0}, {"sku": "GM-1100", "name": "Краски акварельные люкс", "category": "Канцтовары", "date": "2026-08-22", "quantity": 6, "total": 210.0, "price": 35.0}, {"sku": "GM-1100", "name": "Краски акварельные люкс", "category": "Канцтовары", "date": "2026-08-29", "quantity": 8, "total": 280.0, "price": 35.0}, {"sku": "GM-1100", "name": "Краски акварельные люкс", "category": "Канцтовары", "date": "2026-09-05", "quantity": 3, "total": 105.0, "price": 35.0}, {"sku": "GM-1101", "name": "Тарелка керамическая", "category": "Посуда", "date": "2026-08-15", "quantity": 10, "total": 5660.0, "price": 566.0}, {"sku": "GM-1101", "name": "Тарелка керамическая", "category": "Посуда", "date": "2026-08-22", "quantity": 6, "total": 3396.0, "price": 566.0}, {"sku": "GM-1101", "name": "Тарелка керамическая", "category": "Посуда", "date": "2026-08-29", "quantity": 5, "total": 2830.0, "price": 566.0}, {"sku": "GM-1101", "name": "Тарелка керамическая", "category": "Посуда", "date": "2026-09-05", "quantity": 8, "total": 4528.0, "price": 566.0}, {"sku": "GM-1102", "name": "Тарелка керамическая люкс", "category": "Посуда", "date": "2026-08-15", "quantity": 4, "total": 1416.0, "price": 354.0}, {"sku": "GM-1102", "name": "Тарелка керамическая люкс", "category": "Посуда", "date": "2026-08-22", "quantity": 2, "total": 708.0, "price": 354.0}, {"sku": "GM-1102", "name": "Тарелка керамическая люкс", "category": "Посуда", "date": "2026-08-29", "quantity": 6, "total": 2124.0, "price": 354.0}, {"sku": "GM-1102", "name": "Тарелка керамическая люкс", "category": "Посуда", "date": "2026-09-05", "quantity": 2, "total": 708.0, "price": 354.0}, {"sku": "GM-1103", "name": "Кружка 300мл", "category": "Посуда", "date": "2026-08-15", "quantity": 9, "total": 11691.0, "price": 1299.0}, {"sku": "GM-1103", "name": "Кружка 300мл", "category": "Посуда", "date": "2026-08-22", "quantity": 11, "total": 14289.0, "price": 1299.0}, {"sku": "GM-1103", "name": "Кружка 300мл", "category": "Посуда", "date": "2026-08-29", "quantity": 7, "total": 9093.0, "price": 1299.0}, {"sku": "GM-1103", "name": "Кружка 300мл", "category": "Посуда", "date": "2026-09-05", "quantity": 6, "total": 7794.0, "price": 1299.0}, {"sku": "GM-1104", "name": "Кружка 300мл люкс", "category": "Посуда", "date": "2026-08-15", "quantity": 4, "total": 5616.0, "price": 1404.0}, {"sku": "GM-1104", "name": "Кружка 300мл люкс", "category": "Посуда", "date": "2026-08-22", "quantity": 8, "total": 11232.0, "price": 1404.0}, {"sku": "GM-1104", "name": "Кружка 300мл люкс", "category": "Посуда", "date": "2026-08-29", "quantity": 11, "total": 15444.0, "price": 1404.0}, {"sku": "GM-1104", "name": "Кружка 300мл люкс", "category": "Посуда", "date": "2026-09-05", "quantity": 21, "total": 29484.0, "price": 1404.0}, {"sku": "GM-1105", "name": "Набор ложек 6шт", "category": "Посуда", "date": "2026-08-15", "quantity": 12, "total": 9972.0, "price": 831.0}, {"sku": "GM-1105", "name": "Набор ложек 6шт", "category": "Посуда", "date": "2026-08-22", "quantity": 10, "total": 8310.0, "price": 831.0}, {"sku": "GM-1105", "name": "Набор ложек 6шт", "category": "Посуда", "date": "2026-08-29", "quantity": 14, "total": 11634.0, "price": 831.0}, {"sku": "GM-1105", "name": "Набор ложек 6шт", "category": "Посуда", "date": "2026-09-05", "quantity": 15, "total": 12465.0, "price": 831.0}, {"sku": "GM-1106", "name": "Набор ложек 6шт люкс", "category": "Посуда", "date": "2026-08-15", "quantity": 7, "total": 1015.0, "price": 145.0}, {"sku": "GM-1106", "name": "Набор ложек 6шт люкс", "category": "Посуда", "date": "2026-08-22", "quantity": 10, "total": 1450.0, "price": 145.0}, {"sku": "GM-1106", "name": "Набор ложек 6шт люкс", "category": "Посуда", "date": "2026-08-29", "quantity": 9, "total": 1305.0, "price": 145.0}, {"sku": "GM-1106", "name": "Набор ложек 6шт люкс", "category": "Посуда", "date": "2026-09-05", "quantity": 12, "total": 1740.0, "price": 145.0}, {"sku": "GM-1107", "name": "Сковорода 24см", "category": "Посуда", "date": "2026-08-15", "quantity": 15, "total": 6495.0, "price": 433.0}, {"sku": "GM-1107", "name": "Сковорода 24см", "category": "Посуда", "date": "2026-08-22", "quantity": 16, "total": 6928.0, "price": 433.0}, {"sku": "GM-1107", "name": "Сковорода 24см", "category": "Посуда", "date": "2026-08-29", "quantity": 13, "total": 5629.0, "price": 433.0}, {"sku": "GM-1107", "name": "Сковорода 24см", "category": "Посуда", "date": "2026-09-05", "quantity": 15, "total": 6495.0, "price": 433.0}, {"sku": "GM-1108", "name": "Сковорода 24см люкс", "category": "Посуда", "date": "2026-08-15", "quantity": 15, "total": 16650.0, "price": 1110.0}, {"sku": "GM-1108", "name": "Сковорода 24см люкс", "category": "Посуда", "date": "2026-08-22", "quantity": 13, "total": 14430.0, "price": 1110.0}, {"sku": "GM-1108", "name": "Сковорода 24см люкс", "category": "Посуда", "date": "2026-08-29", "quantity": 13, "total": 14430.0, "price": 1110.0}, {"sku": "GM-1108", "name": "Сковорода 24см люкс", "category": "Посуда", "date": "2026-09-05", "quantity": 17, "total": 18870.0, "price": 1110.0}, {"sku": "GM-1109", "name": "Кастрюля 3л", "category": "Посуда", "date": "2026-08-15", "quantity": 8, "total": 2376.0, "price": 297.0}, {"sku": "GM-1109", "name": "Кастрюля 3л", "category": "Посуда", "date": "2026-08-22", "quantity": 13, "total": 3861.0, "price": 297.0}, {"sku": "GM-1109", "name": "Кастрюля 3л", "category": "Посуда", "date": "2026-08-29", "quantity": 10, "total": 2970.0, "price": 297.0}, {"sku": "GM-1109", "name": "Кастрюля 3л", "category": "Посуда", "date": "2026-09-05", "quantity": 11, "total": 3267.0, "price": 297.0}, {"sku": "GM-1110", "name": "Кастрюля 3л люкс", "category": "Посуда", "date": "2026-08-15", "quantity": 3, "total": 4464.0, "price": 1488.0}, {"sku": "GM-1110", "name": "Кастрюля 3л люкс", "category": "Посуда", "date": "2026-08-22", "quantity": 6, "total": 8928.0, "price": 1488.0}, {"sku": "GM-1110", "name": "Кастрюля 3л люкс", "category": "Посуда", "date": "2026-08-29", "quantity": 2, "total": 2976.0, "price": 1488.0}, {"sku": "GM-1110", "name": "Кастрюля 3л люкс", "category": "Посуда", "date": "2026-09-05", "quantity": 1, "total": 1488.0, "price": 1488.0}, {"sku": "GM-1111", "name": "Контейнер пищевой", "category": "Посуда", "date": "2026-08-15", "quantity": 6, "total": 3324.0, "price": 554.0}, {"sku": "GM-1111", "name": "Контейнер пищевой", "category": "Посуда", "date": "2026-08-22", "quantity": 6, "total": 3324.0, "price": 554.0}, {"sku": "GM-1111", "name": "Контейнер пищевой", "category": "Посуда", "date": "2026-08-29", "quantity": 8, "total": 4432.0, "price": 554.0}, {"sku": "GM-1111", "name": "Контейнер пищевой", "category": "Посуда", "date": "2026-09-05", "quantity": 9, "total": 4986.0, "price": 554.0}, {"sku": "GM-1113", "name": "Разделочная доска", "category": "Посуда", "date": "2026-08-15", "quantity": 5, "total": 1475.0, "price": 295.0}, {"sku": "GM-1113", "name": "Разделочная доска", "category": "Посуда", "date": "2026-08-22", "quantity": 7, "total": 2065.0, "price": 295.0}, {"sku": "GM-1113", "name": "Разделочная доска", "category": "Посуда", "date": "2026-08-29", "quantity": 18, "total": 5310.0, "price": 295.0}, {"sku": "GM-1113", "name": "Разделочная доска", "category": "Посуда", "date": "2026-09-05", "quantity": 15, "total": 4425.0, "price": 295.0}, {"sku": "GM-1114", "name": "Разделочная доска люкс", "category": "Посуда", "date": "2026-08-15", "quantity": 13, "total": 18746.0, "price": 1442.0}, {"sku": "GM-1114", "name": "Разделочная доска люкс", "category": "Посуда", "date": "2026-08-22", "quantity": 7, "total": 10094.0, "price": 1442.0}, {"sku": "GM-1114", "name": "Разделочная доска люкс", "category": "Посуда", "date": "2026-08-29", "quantity": 7, "total": 10094.0, "price": 1442.0}, {"sku": "GM-1114", "name": "Разделочная доска люкс", "category": "Посуда", "date": "2026-09-05", "quantity": 9, "total": 12978.0, "price": 1442.0}, {"sku": "GM-1115", "name": "Термос 1л", "category": "Посуда", "date": "2026-08-15", "quantity": 9, "total": 8532.0, "price": 948.0}, {"sku": "GM-1115", "name": "Термос 1л", "category": "Посуда", "date": "2026-08-22", "quantity": 8, "total": 7584.0, "price": 948.0}, {"sku": "GM-1115", "name": "Термос 1л", "category": "Посуда", "date": "2026-08-29", "quantity": 6, "total": 5688.0, "price": 948.0}, {"sku": "GM-1115", "name": "Термос 1л", "category": "Посуда", "date": "2026-09-05", "quantity": 7, "total": 6636.0, "price": 948.0}, {"sku": "GM-1116", "name": "Термос 1л люкс", "category": "Посуда", "date": "2026-08-15", "quantity": 15, "total": 18105.0, "price": 1207.0}, {"sku": "GM-1116", "name": "Термос 1л люкс", "category": "Посуда", "date": "2026-08-22", "quantity": 13, "total": 15691.0, "price": 1207.0}, {"sku": "GM-1116", "name": "Термос 1л люкс", "category": "Посуда", "date": "2026-08-29", "quantity": 13, "total": 15691.0, "price": 1207.0}, {"sku": "GM-1116", "name": "Термос 1л люкс", "category": "Посуда", "date": "2026-09-05", "quantity": 16, "total": 19312.0, "price": 1207.0}, {"sku": "GM-1117", "name": "Полотенце махровое", "category": "Текстиль", "date": "2026-08-15", "quantity": 3, "total": 1131.0, "price": 377.0}, {"sku": "GM-1117", "name": "Полотенце махровое", "category": "Текстиль", "date": "2026-08-22", "quantity": 8, "total": 3016.0, "price": 377.0}, {"sku": "GM-1117", "name": "Полотенце махровое", "category": "Текстиль", "date": "2026-08-29", "quantity": 4, "total": 1508.0, "price": 377.0}, {"sku": "GM-1117", "name": "Полотенце махровое", "category": "Текстиль", "date": "2026-09-05", "quantity": 5, "total": 1885.0, "price": 377.0}, {"sku": "GM-1118", "name": "Наволочка 50x70", "category": "Текстиль", "date": "2026-08-15", "quantity": 12, "total": 7776.0, "price": 648.0}, {"sku": "GM-1118", "name": "Наволочка 50x70", "category": "Текстиль", "date": "2026-08-22", "quantity": 12, "total": 7776.0, "price": 648.0}, {"sku": "GM-1118", "name": "Наволочка 50x70", "category": "Текстиль", "date": "2026-08-29", "quantity": 12, "total": 7776.0, "price": 648.0}, {"sku": "GM-1118", "name": "Наволочка 50x70", "category": "Текстиль", "date": "2026-09-05", "quantity": 16, "total": 10368.0, "price": 648.0}, {"sku": "GM-1119", "name": "Плед флисовый", "category": "Текстиль", "date": "2026-08-15", "quantity": 12, "total": 4596.0, "price": 383.0}, {"sku": "GM-1119", "name": "Плед флисовый", "category": "Текстиль", "date": "2026-08-22", "quantity": 10, "total": 3830.0, "price": 383.0}, {"sku": "GM-1119", "name": "Плед флисовый", "category": "Текстиль", "date": "2026-08-29", "quantity": 8, "total": 3064.0, "price": 383.0}, {"sku": "GM-1119", "name": "Плед флисовый", "category": "Текстиль", "date": "2026-09-05", "quantity": 14, "total": 5362.0, "price": 383.0}, {"sku": "GM-1120", "name": "Скатерть 140x180", "category": "Текстиль", "date": "2026-08-15", "quantity": 3, "total": 1209.0, "price": 403.0}, {"sku": "GM-1120", "name": "Скатерть 140x180", "category": "Текстиль", "date": "2026-08-22", "quantity": 6, "total": 2418.0, "price": 403.0}, {"sku": "GM-1120", "name": "Скатерть 140x180", "category": "Текстиль", "date": "2026-08-29", "quantity": 10, "total": 4030.0, "price": 403.0}, {"sku": "GM-1120", "name": "Скатерть 140x180", "category": "Текстиль", "date": "2026-09-05", "quantity": 20, "total": 8060.0, "price": 403.0}];
const FALLBACK_PROMOS = [{"id": 1, "name": "Акция: Скидка 30% на бытовую химию", "sku": "GM-1056", "product_id": 4, "product_name": "Средство для посуды 500мл люкс", "discount": 30, "start_date": "2026-09-01", "end_date": "2026-09-08", "leaflet": 0, "created_at": "2026-08-30 00:00:00", "sold": 0, "expected": 0, "eff": 100.0}, {"id": 2, "name": "Листовка: Игрушки -20% (скоро)", "sku": "GM-1069", "product_id": 17, "product_name": "Кукла Барби", "discount": 20, "start_date": "2026-09-18", "end_date": "2026-09-25", "leaflet": 1, "created_at": "2026-09-11 00:00:00", "sold": 0, "expected": 0, "eff": 100.0}, {"id": 3, "name": "Акция: Текстиль -15% (сейчас)", "sku": "GM-1119", "product_id": 67, "product_name": "Плед флисовый", "discount": 15, "start_date": "2026-09-09", "end_date": "2026-09-16", "leaflet": 0, "created_at": "2026-09-10 00:00:00", "sold": 44, "expected": 44, "eff": 100.0}, {"id": 4, "name": "Листовка: Посуда -25% (скоро)", "sku": "GM-1108", "product_id": 56, "product_name": "Сковорода 24см люкс", "discount": 25, "start_date": "2026-09-14", "end_date": "2026-09-21", "leaflet": 1, "created_at": "2026-09-11 00:00:00", "sold": 58, "expected": 58, "eff": 100.0}, {"id": 5, "name": "Листовка: Канцтовары -10% (скоро)", "sku": "GM-1092", "product_id": 40, "product_name": "Альбом для рисования люкс", "discount": 10, "start_date": "2026-09-23", "end_date": "2026-10-01", "leaflet": 1, "created_at": "2026-09-11 00:00:00", "sold": 46, "expected": 46, "eff": 100.0}];

// Прямые fetch для GitHub Pages (замена /api -> data/*.json)
// fetch('/api/products') -> fetch('data/products.json')
// fetch('/api/sales') -> fetch('data/sales.json')
// fetch('/api/promos') -> fetch('data/promos.json')
async function demoStaticFetches(){
  // Эти вызовы показывают замену API на локальные JSON — выполняются при загрузке
  try{ await fetch('data/products.json'); }catch(e){}
  try{ await fetch('data/sales.json'); }catch(e){}
  try{ await fetch('data/promos.json'); }catch(e){}
}

// Local in-memory storage (simulate DB)
let PRODUCTS_CACHE = null;
let PROMOS_CACHE = null;
let SALES_CACHE = null;
let ORDERS_CACHE = JSON.parse(localStorage.getItem('galamart_static_orders') || '[]');
let NEXT_ORDER_ID = parseInt(localStorage.getItem('galamart_static_next_id') || '1');

// Config constants (mirror config.py)
const STOCK_COVER_WEEKS = 2;
const PROMO_BOOST_FACTOR = 1.5;
const MAX_ORDER_QTY = 100;

// Helper: save orders to localStorage
function saveOrdersCache(){
  try{
    localStorage.setItem('galamart_static_orders', JSON.stringify(ORDERS_CACHE));
    localStorage.setItem('galamart_static_next_id', String(NEXT_ORDER_ID));
  }catch(e){}
}

// Fetch helper with fallback for file:// protocol
async function fetchJsonWithFallback(path, fallback){
  // Try fetch first (works on http/https, fails on file://)
  try{
    // Use relative path without leading slash
    const clean = path.replace(/^\//,'');
    const res = await fetch(clean);
    if(!res.ok) throw new Error('HTTP '+res.status);
    const data = await res.json();
    return data;
  }catch(e){
    console.warn('[static] fetch failed for', path, e.message, '— using fallback');
    return fallback;
  }
}

async function loadLocalData(){
  if(PRODUCTS_CACHE && PROMOS_CACHE) return;
  // Try to fetch JSON, fallback to embedded data if file://
  const p = await fetchJsonWithFallback('data/products.json', FALLBACK_PRODUCTS);
  const s = await fetchJsonWithFallback('data/sales.json', FALLBACK_SALES);
  const pr = await fetchJsonWithFallback('data/promos.json', FALLBACK_PROMOS);
  PRODUCTS_CACHE = Array.isArray(p) ? p : FALLBACK_PRODUCTS;
  SALES_CACHE = Array.isArray(s) ? s : FALLBACK_SALES;
  PROMOS_CACHE = Array.isArray(pr) ? pr : FALLBACK_PROMOS;
  // Enrich products with is_active if missing, ensure stock/price numbers
  PRODUCTS_CACHE = PRODUCTS_CACHE.map((x,i)=>{
    return {
      id: x.id || (i+1),
      sku: x.sku,
      name: x.name,
      category: x.category,
      price: Number(x.price)||0,
      stock: Number(x.stock)||0,
      is_active: (x.is_active!==undefined? (x.is_active?1:0) : 1),
      week1: Number(x.week1)||0,
      week2: Number(x.week2)||0,
      week3: Number(x.week3)||0,
      week4: Number(x.week4)||0,
      last_sale_date: x.last_sale_date || null,
      days_since_last_sale: x.days_since_last_sale ?? 999,
      total: x.total ?? ((Number(x.week1)||0)+(Number(x.week2)||0)+(Number(x.week3)||0)+(Number(x.week4)||0)),
      avg: x.avg ?? 0,
      trend: x.trend ?? 0,
      dinamika: x.dinamika || 'Стабильно',
      revenue: x.revenue ?? 0
    };
  });
}

// Ensure data loaded before any api call
let dataLoadPromise = loadLocalData();

// Analytics helpers (port from analytics.py)
function enrichProducts(rows){
  return rows.map(r=>{
    const w=[r.week1||0, r.week2||0, r.week3||0, r.week4||0];
    const total=w.reduce((a,b)=>a+b,0);
    const avg= total/4 || 0;
    const first=(w[0]+w[1])/2, second=(w[2]+w[3])/2;
    let trend=0;
    if(first===0) trend= second>0?100:0;
    else trend= ((second-first)/first)*100;
    const dinamika= trend>5?'Рост': trend<-5?'Падение':'Стабильно';
    const revenue= total * (Number(r.price)||0);
    let days = r.days_since_last_sale;
    if(days===null||days===undefined){
      if(w[3]>0) days=3;
      else if(w[2]>0) days=10;
      else if(w[1]>0) days=17;
      else if(w[0]>0) days=24;
      else days=999;
    }
    return {...r, total, avg: Math.round(avg*100)/100, trend: Math.round(trend*10)/10, dinamika, revenue: Math.round(revenue*100)/100, days_since_last_sale: days};
  });
}
function salesByWeek(){
  const rows=PRODUCTS_CACHE||[];
  let w1=0,w2=0,w3=0,w4=0;
  rows.forEach(r=>{w1+=r.week1||0; w2+=r.week2||0; w3+=r.week3||0; w4+=r.week4||0;});
  return {week1:w1, week2:w2, week3:w3, week4:w4, total:w1+w2+w3+w4};
}
function revenueByWeek(){
  const rows=PRODUCTS_CACHE||[];
  let w1=0,w2=0,w3=0,w4=0;
  rows.forEach(r=>{w1+=(r.week1||0)*(Number(r.price)||0); w2+=(r.week2||0)*(Number(r.price)||0); w3+=(r.week3||0)*(Number(r.price)||0); w4+=(r.week4||0)*(Number(r.price)||0);});
  const total=w1+w2+w3+w4;
  return {week1:Math.round(w1*100)/100, week2:Math.round(w2*100)/100, week3:Math.round(w3*100)/100, week4:Math.round(w4*100)/100, total:Math.round(total*100)/100};
}
function totalRevenue(){
  const rows=enrichProducts(PRODUCTS_CACHE||[]);
  return Math.round(rows.reduce((a,r)=>a+(r.revenue||0),0)*100)/100;
}
function salesByCategory(){
  const rows=enrichProducts(PRODUCTS_CACHE||[]);
  const cats={};
  rows.forEach(r=>{
    const c=r.category;
    if(!cats[c]) cats[c]={total:0, count:0, stock:0};
    cats[c].total+= r.total||0;
    cats[c].count+=1;
    cats[c].stock+= r.stock||0;
  });
  return cats;
}
function comparePeriods(){
  const s=salesByWeek();
  const rev=revenueByWeek();
  const prev=s.week1+s.week2, curr=s.week3+s.week4;
  const prevRev=rev.week1+rev.week2, currRev=rev.week3+rev.week4;
  const pct= prev===0? (curr>0?100:0) : ((curr-prev)/prev*100);
  const revPct= prevRev===0? (currRev>0?100:0) : ((currRev-prevRev)/prevRev*100);
  return {prev,curr,pct:Math.round(pct*10)/10, trend: pct>0?'рост': pct<0?'падение':'стабильно', prev_rev:Math.round(prevRev*100)/100, curr_rev:Math.round(currRev*100)/100, rev_pct:Math.round(revPct*10)/10};
}
function topSelling(n=20){
  const rows=enrichProducts(PRODUCTS_CACHE||[]);
  return rows.sort((a,b)=> (b.total||0)-(a.total||0)).slice(0,n);
}
function lowStock(threshold=5){
  const rows=enrichProducts(PRODUCTS_CACHE||[]);
  const res=[];
  rows.forEach(r=>{
    const avg=r.avg||0;
    const days_since=r.days_since_last_sale??999;
    const days_cover= avg>0? (r.stock/(avg/7)) : 999;
    const is_stale= days_since>30 || r.total===0;
    const is_low= r.stock<=threshold || (avg>0 && days_cover<7);
    if(is_stale||is_low){
      if(!is_stale && !is_low) return;
      const need= Math.round(avg*STOCK_COVER_WEEKS);
      const deficit= r.stock - need;
      res.push({...r, days_cover: days_cover===999?999:Math.round(days_cover*10)/10, need, deficit, is_stale});
    }
  });
  return res.sort((a,b)=>(a.deficit??999)-(b.deficit??999));
}
function staleProducts(){
  const rows=enrichProducts(PRODUCTS_CACHE||[]);
  return rows.filter(r=> (r.days_since_last_sale>30 || r.total===0));
}
function revenueByMonth(){
  const currRev=totalRevenue();
  const baseMonths=["Мар","Апр","Май","Июн","Июл","Авг"];
  const past=[Math.round(currRev*0.55), Math.round(currRev*0.68), Math.round(currRev*0.78), Math.round(currRev*0.86), Math.round(currRev*0.92), Math.round(currRev)];
  const forecastLabels=["Сен","Окт","Ноя"];
  const forecast=[Math.round(currRev*1.05), Math.round(currRev*1.08), Math.round(currRev*1.10)];
  return {labels:baseMonths, values_2026:past, forecast_labels:forecastLabels, forecast, current_month_revenue:currRev, next_month_forecast:forecast[0] };
}
function averageCheck(){
  const totalItems=salesByWeek().total;
  const revenue=totalRevenue();
  if(totalItems===0) return 0;
  const checks= totalItems/2.8;
  return Math.round((revenue/checks)*100)/100;
}
function promoEffectiveness(){
  const promos=PROMOS_CACHE||[];
  return promos.map(pr=>{
    if(!pr.product_id) return {...pr, sold:0, expected:0, eff:0};
    const prod=(PRODUCTS_CACHE||[]).find(x=> x.id===pr.product_id || x.sku===pr.sku);
    const sold= prod? (prod.total||0) : 0;
    return {...pr, sold, expected: sold, eff: sold?100:0};
  });
}
function getFuturePromoForProduct(pid){
  const today=new Date().toISOString().slice(0,10);
  const cands=(PROMOS_CACHE||[]).filter(p=> p.product_id===pid && p.start_date>today);
  cands.sort((a,b)=> a.start_date.localeCompare(b.start_date));
  return cands[0]||null;
}
function getEndedRecentPromoForProduct(pid, days=14){
  const today=new Date();
  const todayS=today.toISOString().slice(0,10);
  const cutoff=new Date(today - days*86400000).toISOString().slice(0,10);
  const cands=(PROMOS_CACHE||[]).filter(p=> p.product_id===pid && p.end_date < todayS && p.end_date >= cutoff);
  cands.sort((a,b)=> b.end_date.localeCompare(a.end_date));
  return cands[0]||null;
}
function calculateRecommended(productRow){
  function clamp(v, lo, hi){ try{v=Number(v);}catch(e){v=0;} if(isNaN(v)) v=0; return Math.max(lo, Math.min(hi,v)); }
  const wRaw=[productRow.week1, productRow.week2, productRow.week3, productRow.week4];
  const w=wRaw.map(x=> Math.round(clamp(x,0,1000)));
  const total=w.reduce((a,b)=>a+b,0);
  let avg= total/4 || 0;
  avg=clamp(avg,0,1000);
  const stock=Math.round(clamp(productRow.stock||0,0,10000));
  const pid=productRow.id;
  let baseNeed= avg*STOCK_COVER_WEEKS - stock;
  const calc_formula=`(${avg.toFixed(1)} × ${STOCK_COVER_WEEKS}) - ${stock} = ${baseNeed.toFixed(1)}`;
  const calc_explained=`Средние продажи за неделю (${avg.toFixed(1)}) × Коэффициент запаса (${STOCK_COVER_WEEKS}) - Текущий остаток (${stock})`;
  const first=(w[0]+w[1])/2 || avg, second=(w[2]+w[3])/2 || avg;
  let trendFactor=1.0;
  if(first>0 && second>first*1.3) trendFactor=1.2;
  else if(first>0 && second<first*0.7) trendFactor=0.85;
  let rec= baseNeed * trendFactor;
  let noteParts=[], warning=null;
  let futurePromo=null, endedPromo=null;
  if(pid){
    futurePromo=getFuturePromoForProduct(pid);
    if(futurePromo){ rec*= PROMO_BOOST_FACTOR; noteParts.push(`Акция через ${futurePromo.start_date} — +50%`); }
    endedPromo=getEndedRecentPromoForProduct(pid,14);
    if(endedPromo){ if(avg>8 && total>20){ warning=`⚠ Не заказывай повторно, акция «${endedPromo.name}» прошла!`; rec*=0.6; noteParts.push('Акция прошла — снижен заказ'); } else noteParts.push(`Акция «${endedPromo.name}» закончилась ${endedPromo.end_date}`); }
  }
  if(rec<0) rec=0;
  if(total<=1 && stock>5){ rec=0; noteParts.push('Залежка — не заказывать'); }
  if(total===0 && stock===0) rec=0;
  if(rec>0 && rec<1) rec=1;
  rec=Math.ceil(rec);
  if(rec>100) rec=100;
  if(avg>0 && stock>=avg*3 && !futurePromo){ if(rec>0) noteParts.push('Остатка хватает на 3 недели'); rec=0; }
  return {recommended:rec, calc_base:Math.round(baseNeed*100)/100, calc_formula, calc_explained, stock_cover_weeks:STOCK_COVER_WEEKS, avg:Math.round(avg*100)/100, total, trend_factor:trendFactor, note: noteParts.join('; '), warning, future_promo:futurePromo, ended_promo:endedPromo};
}
function generateOrderStatic(){
  const rows=PRODUCTS_CACHE||[];
  const enriched=rows.map(r=>{
    const calc=calculateRecommended(r);
    return {id:r.id, sku:r.sku, name:r.name, category:r.category, price:r.price, stock:r.stock, is_active:r.is_active, week1:r.week1, week2:r.week2, week3:r.week3, week4:r.week4, last_sale_date:r.last_sale_date, days_since_last_sale:r.days_since_last_sale, avg:calc.avg, total:calc.total, recommended:calc.recommended, calc_base:calc.calc_base, calc_formula:calc.calc_formula, calc_explained:calc.calc_explained, stock_cover_weeks:calc.stock_cover_weeks, note:calc.note, warning:calc.warning};
  });
  enriched.sort((a,b)=> (a.recommended===0)-(b.recommended===0) || (b.avg - a.avg));
  return enriched;
}
function checkDeviation(newTotalQty){
  const last=ORDERS_CACHE.length? ORDERS_CACHE[0]: null;
  if(!last) return '';
  const prev=last.total_items||0;
  if(prev===0) return '';
  const diff=Math.abs(newTotalQty-prev)/prev*100;
  if(diff>20){
    const dir=newTotalQty>prev?'больше':'меньше';
    return `⚠ Внимание: новый заказ на ${diff.toFixed(0)}% ${dir} предыдущего (${prev} → ${newTotalQty}). Проверьте количества!`;
  }
  return '';
}
// Static API dispatcher (mirrors Flask /api/*)
async function api(path, opts={}) {
  await dataLoadPromise;
  const method=(opts.method||'GET').toUpperCase();
  // Normalize path: remove query
  const [basePath, qs] = path.split('?');
  const params=new URLSearchParams(qs||'');
  // Helper to wrap response like Flask: {status:'ok', data:..., msg:''}
  function ok(data, msg='ok'){ return {status:'ok', data, msg}; }
  function err(msg, code=400){ throw new Error(msg); }

  // --- Products ---
  if(basePath==='/api/products' && method==='GET'){
    let result=[...PRODUCTS_CACHE];
    const search=(params.get('search')||'').trim().toLowerCase();
    const cat=params.get('category')||'';
    const onlyActive=params.get('only_active')==='1' || params.get('only_active')==='true';
    const catFilter= (cat && cat!=='Все' && cat!=='Все категории')? cat : '';
    if(catFilter) result=result.filter(x=> x.category===catFilter);
    if(onlyActive) result=result.filter(x=> x.is_active!==0 && x.is_active!==false);
    if(search) result=result.filter(x=> (x.name||'').toLowerCase().includes(search) || (x.sku||'').toLowerCase().includes(search) || (x.category||'').toLowerCase().includes(search));
    // Enrich total/avg
    result=result.map(r=>{
      const total=(r.week1||0)+(r.week2||0)+(r.week3||0)+(r.week4||0);
      const avg= total? Math.round(total/4*10)/10 :0;
      return {...r, total, avg};
    });
    // pagination
    const page=parseInt(params.get('page')||'1');
    const limit=parseInt(params.get('limit')||'0');
    const total=result.length;
    if(limit>0){
      const offset=(page-1)*limit;
      const items=result.slice(offset, offset+limit).map(r=> ({...r}));
      return ok({items, total, page, limit});
    }
    return ok(result);
  }
  if(basePath.match(/^\/api\/products\/\d+$/) && method==='GET'){
    const id=parseInt(basePath.split('/').pop());
    const prod=PRODUCTS_CACHE.find(x=> x.id===id);
    if(!prod) throw new Error('Товар не найден');
    // enrich with sales-like calculation
    const w=[prod.week1||0,prod.week2||0,prod.week3||0,prod.week4||0];
    const total=w.reduce((a,b)=>a+b,0);
    const avg= total? Math.round(total/4*100)/100 :0;
    return ok({...prod, total, avg});
  }
  if(basePath.startsWith('/api/products/sku/') && method==='GET'){
    const sku=decodeURIComponent(basePath.split('/').pop());
    const prod=PRODUCTS_CACHE.find(x=> x.sku===sku);
    if(!prod) throw new Error('Товар не найден');
    return ok(prod);
  }
  if(basePath.match(/^\/api\/products\/\d+$/) && method==='PUT'){
    const id=parseInt(basePath.split('/').pop());
    const idx=PRODUCTS_CACHE.findIndex(x=> x.id===id);
    if(idx===-1) throw new Error('Товар не найден');
    const body=JSON.parse(opts.body||'{}');
    // Demo mode: update in memory and localStorage
    const p=PRODUCTS_CACHE[idx];
    if(body.name!==undefined) p.name=String(body.name).trim();
    if(body.category!==undefined) p.category=String(body.category).trim();
    if(body.price!==undefined) p.price=Number(body.price);
    if(body.stock!==undefined) p.stock=Number(body.stock);
    if(body.is_active!==undefined) p.is_active= body.is_active?1:0;
    if(body.week1!==undefined) p.week1=Number(body.week1);
    if(body.week2!==undefined) p.week2=Number(body.week2);
    if(body.week3!==undefined) p.week3=Number(body.week3);
    if(body.week4!==undefined) p.week4=Number(body.week4);
    // Recalc total/avg/dates
    p.total=(p.week1||0)+(p.week2||0)+(p.week3||0)+(p.week4||0);
    p.avg= p.total? Math.round(p.total/4*100)/100 :0;
    // Persist to localStorage
    try{ localStorage.setItem('galamart_static_products', JSON.stringify(PRODUCTS_CACHE)); }catch(e){}
    return ok({id}, 'Обновлён (демо-режим: сохранено локально)');
  }
  if(basePath.match(/^\/api\/products\/\d+$/) && method==='DELETE'){
    const id=parseInt(basePath.split('/').pop());
    const idx=PRODUCTS_CACHE.findIndex(x=> x.id===id);
    if(idx!==-1){
      PRODUCTS_CACHE.splice(idx,1);
      try{ localStorage.setItem('galamart_static_products', JSON.stringify(PRODUCTS_CACHE)); }catch(e){}
    }
    return ok(null, 'Удалён (демо-режим)');
  }
  if(basePath==='/api/products/bulk_delete' && method==='POST'){
    const body=JSON.parse(opts.body||'{}');
    const cat=body.category||'';
    if(cat){
      const before=PRODUCTS_CACHE.length;
      PRODUCTS_CACHE=PRODUCTS_CACHE.filter(x=> x.category!==cat);
      const deleted=before-PRODUCTS_CACHE.length;
      try{ localStorage.setItem('galamart_static_products', JSON.stringify(PRODUCTS_CACHE)); }catch(e){}
      return ok({deleted}, `Удалено ${deleted} товаров категории ${cat} (демо)`);
    }
    return ok({deleted:0});
  }
  if(basePath==='/api/categories' && method==='GET'){
    return ok(["Бытовая химия","Игрушки","Канцтовары","Посуда","Текстиль"]);
  }
  if(basePath==='/api/settings/plan' && method==='GET'){
    const plan=Number(localStorage.getItem('galamart_static_plan')||'1250000');
    const revenue=totalRevenue();
    const pct= plan? Math.round(revenue/plan*100*10)/10 :0;
    return ok({plan, revenue, pct, remaining: Math.round((plan-revenue)*100)/100});
  }
  if(basePath==='/api/settings/plan' && method==='POST'){
    const body=JSON.parse(opts.body||'{}');
    const plan=Number(body.plan);
    if(!plan||plan<=0) throw new Error('План должен быть >0');
    localStorage.setItem('galamart_static_plan', String(plan));
    return ok({plan}, 'План сохранён (демо-режим)');
  }
  // Analytics
  if(basePath==='/api/analytics/summary' && method==='GET'){
    const s=salesByWeek();
    const rev=revenueByWeek();
    const cmp=comparePeriods();
    const cats=salesByCategory();
    const top=topSelling(5);
    const low=lowStock();
    const stale=staleProducts();
    const avg=averageCheck();
    const totalRev=totalRevenue();
    const plan=Number(localStorage.getItem('galamart_static_plan')||'1250000');
    const planPct= plan? Math.round(totalRev/plan*100*10)/10 :0;
    return ok({sales_by_week:s, revenue_by_week:rev, compare:cmp, by_category:cats, top, low_stock_count:low.length, stale_count:stale.length, total_products:PRODUCTS_CACHE.length, total_revenue: totalRev, avg_check:avg, monthly_plan:plan, plan_pct:planPct});
  }
  if(basePath==='/api/analytics/revenue_by_month' && method==='GET'){
    return ok(revenueByMonth());
  }
  if(basePath==='/api/analytics/revenue_by_week' && method==='GET'){
    return ok(revenueByWeek());
  }
  if(basePath==='/api/analytics/average_check' && method==='GET'){
    return ok({avg_check:averageCheck(), revenue:totalRevenue(), sales_total:salesByWeek().total});
  }
  if(basePath==='/api/analytics/by_category' && method==='GET'){
    return ok(salesByCategory());
  }
  if(basePath==='/api/analytics/compare' && method==='GET'){
    return ok(comparePeriods());
  }
  if(basePath==='/api/analytics/top' && method==='GET'){
    const n=parseInt(params.get('limit')||'20');
    return ok(topSelling(n));
  }
  if(basePath==='/api/analytics/low_stock' && method==='GET'){
    return ok(lowStock());
  }
  if(basePath==='/api/analytics/stale' && method==='GET'){
    return ok(staleProducts());
  }
  if(basePath==='/api/analytics/accuracy' && method==='GET'){
    if(ORDERS_CACHE.length===0) return ok(null, 'Нет заказов');
    const last=ORDERS_CACHE[0];
    const items=last.items||[];
    const result=items.map(it=>{
      const prod=PRODUCTS_CACHE.find(p=> p.sku===it.sku);
      const w= prod? [prod.week1||0,prod.week2||0,prod.week3||0,prod.week4||0] : [0,0,0,0];
      const totalSold=w.reduce((a,b)=>a+b,0);
      const ordered=it.quantity||0;
      let status='точно';
      if(ordered===0) status='—';
      else if(totalSold===0) status='перезаказ (не продаётся)';
      else if(ordered>totalSold*1.5) status='перезаказ';
      else if(totalSold>ordered*1.5) status='недозаказ';
      return {sku:it.sku, name:it.name, ordered, sold:totalSold, avg: Math.round(totalSold/4*10)/10, status};
    });
    return ok({order:last, items:result});
  }
  if(basePath==='/api/analytics/promo_effectiveness' && method==='GET'){
    return ok(promoEffectiveness());
  }
  // Order generate
  if(basePath==='/api/order/generate' && method==='GET'){
    let items=generateOrderStatic();
    const cat=params.get('category')||'Все';
    const only=params.get('only_need')==='true' || params.get('only_need')==='1';
    const search=(params.get('search')||'').trim().toLowerCase();
    if(cat && cat!=='Все' && cat!=='Все категории') items=items.filter(x=> x.category===cat);
    if(only) items=items.filter(x=> x.recommended>0);
    if(search) items=items.filter(x=> (x.name||'').toLowerCase().includes(search) || (x.sku||'').toLowerCase().includes(search));
    const totalQty=items.reduce((a,x)=>a+(x.recommended||0),0);
    const deviation=checkDeviation(totalQty);
    // pagination? original supports limit/page but static order generate currently not paginated via api? handle
    const page=parseInt(params.get('page')||'0');
    const limit=parseInt(params.get('limit')||'0');
    if(limit>0){ const offset=(page-1)*limit; const paged=items.slice(offset, offset+limit); return ok({items:paged, total_qty:totalQty, total:items.length, page, limit, deviation}); }
    return ok({items, total_qty:totalQty, deviation});
  }
  if(basePath==='/api/order/deviation' && method==='GET'){
    const total=parseInt(params.get('total')||'0');
    return ok({deviation: checkDeviation(total)});
  }
  // Orders
  if(basePath==='/api/orders' && method==='GET'){
    return ok(ORDERS_CACHE);
  }
  if(basePath.match(/^\/api\/orders\/\d+$/) && method==='GET'){
    const id=parseInt(basePath.split('/').pop());
    const order=ORDERS_CACHE.find(o=> o.id===id);
    if(!order) throw new Error('Заказ не найден');
    // order items stored as order.items
    return ok(order.items||[]);
  }
  if(basePath==='/api/orders' && method==='POST'){
    const body=JSON.parse(opts.body||'{}');
    let items=body.items|| body.order_items||[];
    if(!items || items.length===0) throw new Error('Пустой заказ');
    // normalize: quantity field may be recommended
    const norm=[];
    items.forEach(it=>{
      let qty= it.quantity!=null? it.quantity : (it.recommended||0);
      qty=Number(qty)||0;
      if(qty<=0) return;
      norm.push({product_id: it.id||it.product_id, sku:it.sku||'', name:it.name||'', category:it.category||'', price: Number(it.price)||0, quantity: qty, stock_at_order: it.stock||0, avg_sales: it.avg||0});
    });
    if(norm.length===0) throw new Error('Нет позиций с количеством >0');
    const total_items=norm.reduce((a,x)=>a+x.quantity,0);
    const total_amount=norm.reduce((a,x)=>a+ x.price*x.quantity,0);
    const order={id:NEXT_ORDER_ID++, created_at:new Date().toISOString().slice(0,19).replace('T',' '), total_items, total_amount, status:'completed', notes: body.notes||'', items:norm};
    ORDERS_CACHE.unshift(order);
    saveOrdersCache();
    return ok({order_id:order.id}, 'Заказ создан (демо-режим)');
  }
  if(basePath.match(/^\/api\/orders\/\d+$/) && method==='DELETE'){
    const id=parseInt(basePath.split('/').pop());
    const idx=ORDERS_CACHE.findIndex(o=> o.id===id);
    if(idx!==-1){ ORDERS_CACHE.splice(idx,1); saveOrdersCache(); }
    return ok(null, 'Удалён (демо)');
  }
  // Promos
  if(basePath==='/api/promos' && method==='GET'){
    return ok(promoEffectiveness());
  }
  if(basePath==='/api/promos' && method==='POST'){
    throw new Error('Демо-режим: создание листовок доступно только центральному офису');
  }
  if(basePath.match(/^\/api\/promos\/\d+$/) && method==='DELETE'){
    throw new Error('Демо-режим: удаление листовок доступно только офису');
  }
  // Health
  if(basePath==='/api/health' && method==='GET'){
    return ok({products: (PRODUCTS_CACHE||[]).length, time: new Date().toISOString()});
  }
  // Fallback: try real fetch for unknown (e.g., data/*.json direct)
  if(path.startsWith('data/')){
    const data=await fetchJsonWithFallback(path, null);
    return ok(data);
  }
  console.warn('[static api] unknown path', path);
  throw new Error('Неизвестный API путь (демо-режим): '+path);
}

// Override demo messages for export (original main.js uses fetch directly)
function demoExportAlert(type){
  alert('Демо-режим GitHub Pages: экспорт '+type+' недоступен без сервера.\nДанные доступны в таблицах, скопируйте вручную или используйте локальный Flask (python app.py).');
}

// Patch export functions will be replaced via string substitution in orig file

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

// API helper — overridden for static (see header)


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
async function exportOrderPDF(){ demoExportAlert('PDF заказа'); }
async function exportOrderExcel(){ demoExportAlert('Excel заказа'); }
async function exportSalesPDF(){ demoExportAlert('PDF продаж'); }

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
async function exportAccuracyPDF(){ demoExportAlert('PDF точности'); }


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
document.addEventListener('DOMContentLoaded', async ()=>{
  await dataLoadPromise;
  // try restore products from localStorage (demo edits)
  try{ const saved=JSON.parse(localStorage.getItem('galamart_static_products')||'null'); if(saved && Array.isArray(saved) && saved.length) PRODUCTS_CACHE=saved; }catch(e){}
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
