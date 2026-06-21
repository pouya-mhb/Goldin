from django.db import models
from django.conf import settings


class GoldWallet(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gold_wallet"
    )

    available_grams = models.DecimalField(max_digits=18, decimal_places=4, default=0)

    locked_grams = models.DecimalField(max_digits=18, decimal_places=4, default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)
