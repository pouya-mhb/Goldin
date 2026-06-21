# partners/models.py

from django.db import models


class Partner(models.Model):

    name = models.CharField(max_length=100)

    api_url = models.URLField()

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class PartnerInventory(models.Model):

    partner = models.OneToOneField(
        Partner, on_delete=models.CASCADE, related_name="inventory"
    )

    available_grams = models.DecimalField(max_digits=18, decimal_places=4, default=0)

    reserved_grams = models.DecimalField(max_digits=18, decimal_places=4, default=0)

    updated_at = models.DateTimeField(auto_now=True)
