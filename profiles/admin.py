from django.contrib import admin

from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "national_code",
    )

    search_fields = (
        "user__phone",
        "national_code",
    )
