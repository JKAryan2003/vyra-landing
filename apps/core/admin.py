from django.contrib import admin
from .models import Category, SubCategory, Brand, SpendRange

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
  list_display = ("id", "name", "slug")
  search_fields = ("name",)
  ordering = ("id",)

  exclude = ("slug",)


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
  list_display = ("id", "name", "slug")
  search_fields = ("name",)
  ordering = ("id",)

  exclude = ("slug",)


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
  list_display = ("id", "name", "slug")
  search_fields = ("name",)
  ordering = ("id",)

  exclude = ("slug",)


@admin.register(SpendRange)
class SpendRangeAdmin(admin.ModelAdmin):
  list_display = ("id", "low_range", "high_range")
  ordering = ("id",)