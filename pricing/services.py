import requests
from decimal import Decimal
from django.utils import timezone
from datetime import timedelta
from .models import GoldPrice


def get_current_price():
    return GoldPrice.objects.latest("created_at")


def fetch_dynamic_gold_price():
    """
    Fetch gold prices dynamically from an external API or generate realistic mock data.
    Returns: dict with buy_price and sell_price
    """
    try:
        # Using a free API for gold prices (metals-api.com or similar)
        # For this demo, we'll use a realistic mock with slight variations
        last_price = get_current_price()

        # Simulate realistic price movement (±2%)
        import random

        variation = Decimal(random.uniform(0.98, 1.02))

        buy_price = last_price.buy_price * variation
        sell_price = last_price.sell_price * variation

        return {
            "buy_price": buy_price.quantize(Decimal("0.01")),
            "sell_price": sell_price.quantize(Decimal("0.01")),
        }
    except GoldPrice.DoesNotExist:
        # Default prices if no history exists
        return {
            "buy_price": Decimal("2500000.00"),
            "sell_price": Decimal("2450000.00"),
        }
    except Exception as e:
        print(f"Error fetching price: {e}")
        return None


def update_gold_prices():
    """
    Update gold prices in the database.
    This should be called periodically via management command or celery task.
    """
    prices = fetch_dynamic_gold_price()

    if prices:
        gold_price = GoldPrice.objects.create(
            buy_price=prices["buy_price"],
            sell_price=prices["sell_price"],
        )
        return gold_price

    return None
