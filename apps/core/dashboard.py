from django.utils import timezone
from django.db.models import Count

from apps.customers.models import Customer
from .models import Category, Brand, SpendRange


def dashboard_callback(request, context):
    today = timezone.localdate()

    # -------------------------
    # KPI
    # -------------------------

    total_customers = Customer.objects.count()

    today_customers = Customer.objects.filter(
        created_at__date=today
    ).count()

    notify_me_count = Customer.objects.filter(
        notify_me=True
    ).count()

    active_categories = Category.objects.filter(
        is_active=True
    ).count()

    active_brands = Brand.objects.filter(
        is_active=True
    ).count()

    # -------------------------
    # Demand by Area
    # -------------------------

    demand_by_area = (
        Customer.objects
        .values("area")
        .annotate(total=Count("id"))
        .order_by("-total")[:10]
    )

    # -------------------------
    # Top Categories
    # -------------------------

    top_categories = (
        Category.objects
        .annotate(total=Count("customers"))
        .filter(total__gt=0)
        .order_by("-total")[:10]
    )

    # -------------------------
    # Top Brands
    # -------------------------

    top_brands = (
        Brand.objects
        .annotate(total=Count("customers"))
        .filter(total__gt=0)
        .order_by("-total")[:10]
    )

    # -------------------------
    # Spending Range
    # -------------------------

    spending_ranges = (
        SpendRange.objects
        .annotate(total=Count("customers"))
        .filter(total__gt=0)
        .order_by("display_order")
    )

    context.update({
        "dashboard_total_customers": total_customers,
        "dashboard_today_customers": today_customers,
        "dashboard_notify_me_count": notify_me_count,
        "dashboard_active_categories": active_categories,
        "dashboard_active_brands": active_brands,

        "dashboard_demand_by_area": demand_by_area,
        "dashboard_top_categories": top_categories,
        "dashboard_top_brands": top_brands,
        "dashboard_spending_ranges": spending_ranges,
    })

    return context