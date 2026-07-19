from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Category, SubCategory, Brand, SpendRange


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = (
        "id",
        "name",
        "display_order",
        "is_active",
        "created_at",
    )

    search_fields = ("name",)
    list_filter = ("is_active",)
    ordering = ("display_order", "name")

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    exclude = ("slug",)

    list_per_page = 20


@admin.register(SubCategory)
class SubCategoryAdmin(ModelAdmin):
    list_display = (
        "id",
        "name",
        "display_order",
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
    )

    list_filter = (
        "is_active",
    )

    ordering = ("display_order", "name")

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    exclude = ("slug",)

    list_per_page = 20


@admin.register(Brand)
class BrandAdmin(ModelAdmin):
    list_display = (
        "id",
        "name",
        "display_order",
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
    )

    list_filter = (
        "is_active",
    )

    ordering = ("display_order", "name")

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    exclude = ("slug",)

    list_per_page = 20


@admin.register(SpendRange)
class SpendRangeAdmin(ModelAdmin):
    list_display = (
      "id",
      "spend_range",
      "display_order",
      "is_active",
      "created_at",
    )

    list_filter = ("is_active",)

    ordering = (
        "display_order",
        "low_range",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    list_per_page = 20

    @admin.display(description="Spend Range")
    def spend_range(self, obj):
      return f"₹{obj.low_range} - ₹{obj.high_range}"