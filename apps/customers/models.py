from django.db import models
from apps.core.models import Category, SubCategory, Brand, SpendRange, Area


class Customer(models.Model):
  name = models.CharField(max_length=150)
  mobile = models.CharField(max_length=10, unique=True)
  email = models.EmailField(blank=True, null=True)

  area = models.ForeignKey(
        Area,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="customers",
    )

  category = models.ForeignKey(
      Category,
      on_delete=models.SET_NULL,
      null=True,
      blank=True,
      related_name="customers",
  )

  subcategories = models.ManyToManyField(
      SubCategory,
      blank=True,
      related_name="customers",
  )

  brands = models.ManyToManyField(
      Brand,
      blank=True,
      related_name="customers",
  )

  spend_range = models.ForeignKey(
      SpendRange,
      on_delete=models.SET_NULL,
      null=True,
      blank=True,
      related_name="customers",
  )

  note = models.TextField(blank=True, null=True)

  notify_me = models.BooleanField(default=False)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name = "Customer"
    verbose_name_plural = "Customers"
    ordering = ["-created_at"]

  def __str__(self):
      return f"{self.name}"