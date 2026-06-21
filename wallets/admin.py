from django.contrib import admin

from .models import Wallet


@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "available_balance",
        "locked_balance",
        "available_gold",
        "locked_gold",
    )

    search_fields = ("user__phone",)
