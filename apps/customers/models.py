from django.db import models
from apps.core.models import Category, SubCategory, Brand, SpendRange


class Customer(models.Model):
  name = models.CharField(max_length=150)
  mobile = models.CharField(max_length=10, unique=True)
  email = models.EmailField(blank=True, null=True)

  area = models.CharField(max_length=255)

  category = models.ForeignKey(
      Category,
      on_delete=models.SET_NULL,
      null=True,
      blank=True,
  )

  subcategories = models.ManyToManyField(
      SubCategory,
      blank=True,
  )

  brands = models.ManyToManyField(
      Brand,
      blank=True,
  )

  spend_range = models.ForeignKey(
      SpendRange,
      on_delete=models.SET_NULL,
      null=True,
      blank=True,
  )

  note = models.TextField(blank=True, null=True)

  notify_me = models.BooleanField(default=False)

  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
      return f"{self.name} ({self.mobile})"