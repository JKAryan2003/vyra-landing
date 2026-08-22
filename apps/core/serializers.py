from rest_framework import serializers

from apps.core.models import (
    Category,
    SubCategory,
    Brand,
    SpendRange,
    Area,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "slug",
        )


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = (
            "id",
            "name",
            "slug",
        )


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = (
            "id",
            "name",
            "slug",
        )


class SpendRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpendRange
        fields = (
            "id",
            "low_range",
            "high_range",
        )


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = (
            "id",
            "name",
            "slug",
        )