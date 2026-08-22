from rest_framework import serializers

from apps.customers.models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            "id",
            "name",
            "mobile",
            "email",
            "area",
            "category",
            "subcategories",
            "brands",
            "spend_range",
            "note",
            "notify_me",
            "created_at",
        )
        read_only_fields = (
            "id",
            "created_at",
        )