from django.contrib import admin

from .models import AccountOpeningRequest
from .services import approve_account_opening


@admin.action(description="Approve selected requests")
def approve_requests(modeladmin, request, queryset):

    for obj in queryset:
        approve_account_opening(obj.id)


@admin.register(AccountOpeningRequest)
class AccountOpeningRequestAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "status",
        "created_at",
        "reviewed_at",
    )

    actions = [approve_requests]
