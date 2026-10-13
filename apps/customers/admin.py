from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Customer


@admin.register(Customer)
class CustomerAdmin(ModelAdmin):
    list_display = (
        "id",
        "name",
        "mobile",
        "email",
        "area",
        "categories_display",
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
        "categories",
        "spend_range",
        "notify_me",
        "created_at",
    )

    filter_horizontal = (
        "subcategories",
        "brands",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = ("-created_at",)

    list_per_page = 20

    date_hierarchy = "created_at"

    @admin.display(description="Categories")
    def categories_display(self, obj):
        return ", ".join(
            obj.categories.values_list("name", flat=True)
        )