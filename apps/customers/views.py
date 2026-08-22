from rest_framework import generics

from apps.customers.models import Customer

from .serializers import CustomerSerializer


class CustomerCreateAPIView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer