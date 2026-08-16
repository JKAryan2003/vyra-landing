from rest_framework import serializers

from .models import Category, SubCategory, Brand, SpendRange


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
            "category",
        )


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = (
            "id",
            "name",
            "slug",
            "category",
        )


class SpendRangeSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()

    class Meta:
        model = SpendRange
        fields = (
            "id",
            "low_range",
            "high_range",
            "label",
        )

    def get_label(self, obj):
        return f"₹{obj.low_range} - ₹{obj.high_range}"