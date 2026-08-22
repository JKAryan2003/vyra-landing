from rest_framework import generics

from apps.core.models import (
    Category,
    SubCategory,
    Brand,
    SpendRange,
    Area,
)

from .serializers import (
    CategorySerializer,
    SubCategorySerializer,
    BrandSerializer,
    SpendRangeSerializer,
    AreaSerializer,
)


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer


class SubCategoryListAPIView(generics.ListAPIView):
    queryset = SubCategory.objects.filter(is_active=True)
    serializer_class = SubCategorySerializer


class BrandListAPIView(generics.ListAPIView):
    queryset = Brand.objects.filter(is_active=True)
    serializer_class = BrandSerializer


class SpendRangeListAPIView(generics.ListAPIView):
    queryset = SpendRange.objects.filter(is_active=True)
    serializer_class = SpendRangeSerializer


class AreaListAPIView(generics.ListAPIView):
    queryset = Area.objects.filter(is_active=True)
    serializer_class = AreaSerializer