from django.urls import path

from .views import (
    CategoryListAPIView,
    SubCategoryListAPIView,
    BrandListAPIView,
    SpendRangeListAPIView,
    AreaListAPIView,
)


urlpatterns = [
    path(
        "categories/",
        CategoryListAPIView.as_view(),
        name="category-list",
    ),

    path(
        "subcategories/",
        SubCategoryListAPIView.as_view(),
        name="subcategory-list",
    ),

    path(
        "brands/",
        BrandListAPIView.as_view(),
        name="brand-list",
    ),

    path(
        "spend-ranges/",
        SpendRangeListAPIView.as_view(),
        name="spend-range-list",
    ),

    path(
        "areas/",
        AreaListAPIView.as_view(),
        name="area-list",
    ),
]