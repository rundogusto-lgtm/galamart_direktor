"""
Galamart Order Assistant - Конфигурация приложения
Крупный шрифт, контрастные цвета, пороги для аналитики
"""
import os

# --- Пути ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")
DB_PATH = os.path.join(BASE_DIR, "galamart.db")
PRODUCTS_CSV = os.path.join(DATA_DIR, "products.csv")
DRAFT_ORDER_JSON = os.path.join(BASE_DIR, "draft_order.json")

# --- Настройки БД ---
DB_TIMEOUT = 30

# --- Пороги остатков (красная зона) ---
LOW_STOCK_THRESHOLD = 5          # остаток < 5 считается критическим
LOW_STOCK_DAYS_COVER = 7         # дней покрытия
OVERSTOCK_THRESHOLD = 60         # если не продавался 4 недели подряд
ORDER_DEVIATION_WARNING = 20     # % отклонения заказа от предыдущего -> предупреждение
SEASONALITY_FACTOR_DEFAULT = 1.0

# --- Акции ---
PROMO_BOOST_FACTOR = 1.5         # +50% к заказу если товар будет в будущей акции
# коэффициент запаса
STOCK_COVER_WEEKS = 2            # на сколько недель вперёд заказываем (покрытие)
MIN_ORDER_QTY = 1
MAX_ORDER_QTY = 100

# --- GUI: Шрифты (КРУПНЫЕ!) ---
FONT_FAMILY = "Segoe UI"
FONT_SIZE_NORMAL = 12
FONT_SIZE_LARGE = 14
FONT_SIZE_TITLE = 16
FONT_SIZE_HEADER = 18
FONT_SIZE_SMALL = 10

# --- GUI: Цвета (контрастные, тёплая светлая тема) ---
COLORS = {
    "bg": "#FFF8F0",              # тёплый светлый фон
    "bg_card": "#FFFFFF",
    "bg_header": "#E53935",       # фирменный красный Галамарт
    "bg_header_dark": "#C62828",
    "bg_sidebar": "#FFF3E0",
    "text": "#212121",            # почти чёрный
    "text_light": "#FFFFFF",
    "text_muted": "#757575",
    "accent": "#E53935",
    "accent_hover": "#D32F2F",
    "success": "#2E7D32",
    "warning": "#EF6C00",
    "danger": "#C62828",
    "border": "#E0E0E0",
    "row_alt": "#FFF3E0",
    "low_stock_bg": "#FFCDD2",    # красная зона
    "promo_bg": "#FFE0B2",        # акционная зона
}

# --- PDF: крупный шрифт ---
PDF_FONT = "Helvetica"
PDF_FONT_BOLD = "Helvetica-Bold"
PDF_TITLE_SIZE = 18
PDF_HEADER_SIZE = 14
PDF_NORMAL_SIZE = 12
PDF_SMALL_SIZE = 10

# --- Категории товаров — только непродовольственные (Галамарт не продуктовый) ---
CATEGORIES = ["Бытовая химия", "Игрушки", "Канцтовары", "Посуда", "Текстиль"]

# --- Тестовые данные ---
TEST_PRODUCTS_COUNT = 120
