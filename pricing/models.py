from django.db import models


class GoldPrice(models.Model):

    buy_price = models.DecimalField(max_digits=18, decimal_places=2)

    sell_price = models.DecimalField(max_digits=18, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
