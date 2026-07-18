from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "mobile",
        "email",
        "category",
        "spend_range",
        "notify_me",
        "created_at",
    )

    search_fields = (
        "name",
        "mobile",
        "email",
        "area",
    )

    list_filter = (
        "category",
        "spend_range",
        "notify_me",
        "created_at",
    )

    filter_horizontal = (
        "subcategories",
        "brands",
    )

    readonly_fields = ("created_at",)