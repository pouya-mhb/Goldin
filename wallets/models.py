# wallets/models.py

from django.db import models
from django.conf import settings


class Wallet(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="wallet"
    )

    # IRT balance
    available_balance = models.DecimalField(max_digits=18, decimal_places=2, default=0)

    locked_balance = models.DecimalField(max_digits=18, decimal_places=2, default=0)

    # GOLD balance (grams)
    available_gold = models.DecimalField(max_digits=18, decimal_places=4, default=0)

    locked_gold = models.DecimalField(max_digits=18, decimal_places=4, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
