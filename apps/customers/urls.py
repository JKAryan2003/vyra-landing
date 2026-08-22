from django.urls import path

from .views import CustomerCreateAPIView


urlpatterns = [
    path(
        "customers/",
        CustomerCreateAPIView.as_view(),
        name="customer-create",
    ),
]