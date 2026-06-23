import requests
from decimal import Decimal
from django.utils import timezone
from datetime import timedelta
from .models import GoldPrice
import logging

logger = logging.getLogger(__name__)

# API endpoints for gold prices
METALS_API_ENDPOINTS = [
    "https://api.metals.live/v1/spot/gold",  # Gold price in USD per troy oz
]


from django.conf import settings


def fetch_from_global_api():
    """
    Fetch real gold prices from global API.
    Uses metals.live API which provides real-time spot prices.
    Returns: dict with buy_price and sell_price in Toman per gram.
    """
    try:
        response = requests.get("https://api.metals.live/v1/spot/gold", timeout=10)
        response.raise_for_status()
        data = response.json()

        if isinstance(data, list) and data:
            data = data[0]

        if not isinstance(data, dict):
            raise ValueError("Unexpected gold price response format")

        price_value = data.get("price") or data.get("Price")
        if price_value is None:
            raise ValueError("Missing price field in API response")

        price_usd_per_oz = Decimal(str(price_value))
        usd_to_toman = Decimal(str(getattr(settings, "GOLD_PRICE_USD_TO_TOMAN", 42000)))
        price_toman_per_oz = price_usd_per_oz * usd_to_toman

        grams_per_oz = Decimal("31.1035")
        price_per_gram = price_toman_per_oz / grams_per_oz

        spread = Decimal(
            str(1 + getattr(settings, "GOLD_PRICE_SPREAD_PERCENT", 1.0) / 100.0)
        )
        buy_price = price_per_gram * spread
        sell_price = price_per_gram / spread

        return {
            "buy_price": buy_price.quantize(Decimal("0.01")),
            "sell_price": sell_price.quantize(Decimal("0.01")),
            "source": "metals.live",
        }
    except Exception as e:
        logger.error(f"Error fetching from metals.live API: {e}")

    return None


def fetch_dynamic_gold_price():
    """
    Fetch gold prices from global API with fallback to realistic variations.
    Returns: dict with buy_price and sell_price
    """
    # Try to fetch from real API first
    api_prices = fetch_from_global_api()
    if api_prices:
        return api_prices

    last_price = get_current_price()
    if last_price is None:
        return {
            "buy_price": Decimal("2500000.00"),
            "sell_price": Decimal("2450000.00"),
            "source": "default",
        }

    import random

    variation = Decimal(str(random.uniform(0.995, 1.005)))
    buy_price = last_price.buy_price * variation
    sell_price = last_price.sell_price * variation

    return {
        "buy_price": buy_price.quantize(Decimal("0.01")),
        "sell_price": sell_price.quantize(Decimal("0.01")),
        "source": "variation",
    }


def get_current_price():
    try:
        return GoldPrice.objects.latest("created_at")
    except GoldPrice.DoesNotExist:
        return None


def update_gold_prices():
    """
    Update gold prices in the database.
    This is called periodically via scheduler or management command.
    """
    prices = fetch_dynamic_gold_price()

    if prices:
        gold_price = GoldPrice.objects.create(
            buy_price=prices["buy_price"],
            sell_price=prices["sell_price"],
        )
        logger.info(
            f"✓ Gold prices updated from {prices.get('source', 'unknown')}: "
            f"Buy={gold_price.buy_price}, Sell={gold_price.sell_price}"
        )
        return gold_price

    logger.error("✗ Failed to update gold prices")
    return None
