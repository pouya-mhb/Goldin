from django.db import models
from django.conf import settings


class Order(models.Model):

    BUY = "BUY"
    SELL = "SELL"

    ORDER_TYPES = [
        (BUY, BUY),
        (SELL, SELL),
    ]

    PENDING = "PENDING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

    STATUS_CHOICES = [
        (PENDING, PENDING),
        (COMPLETED, COMPLETED),
        (FAILED, FAILED),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    order_type = models.CharField(max_length=10, choices=ORDER_TYPES)

    grams = models.DecimalField(max_digits=18, decimal_places=4)

    unit_price = models.DecimalField(max_digits=18, decimal_places=2)

    total_price = models.DecimalField(max_digits=18, decimal_places=2)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
