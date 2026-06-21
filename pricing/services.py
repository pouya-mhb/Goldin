from .models import GoldPrice


def get_current_price():

    return GoldPrice.objects.latest("created_at")
