from django.db import models
from django.utils.text import slugify

# Create your models here.
class Category(models.Model):
  name = models.CharField(max_length=100, unique=True)
  slug = models.SlugField(unique=True)


  display_order = models.PositiveIntegerField(default=0)
  is_active = models.BooleanField(default=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name = "Category"
    verbose_name_plural = "Categories"
    ordering = ["display_order", "name"]

  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.name)
    super().save(*args, **kwargs)

  def __str__(self):
    return self.name


class SubCategory(models.Model):
  name = models.CharField(max_length=100, unique=True)
  slug = models.SlugField(unique=True)

  display_order = models.PositiveIntegerField(default=0)
  is_active = models.BooleanField(default=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
      verbose_name = "Sub Category"
      verbose_name_plural = "Sub Categories"
      ordering = ["display_order", "name"]

  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.name)
    super().save(*args, **kwargs)

  def __str__(self):
      return self.name


class Brand(models.Model):
  name = models.CharField(max_length=100, unique=True)
  slug = models.SlugField(unique=True)

  display_order = models.PositiveIntegerField(default=0)
  is_active = models.BooleanField(default=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name = "Brand"
    verbose_name_plural = "Brands"
    ordering = ["display_order", "name"]

  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.name)
    super().save(*args, **kwargs)

  def __str__(self):
      return self.name


class SpendRange(models.Model):
  low_range = models.PositiveIntegerField()
  high_range = models.PositiveIntegerField()

  display_order = models.PositiveIntegerField(default=0)
  is_active = models.BooleanField(default=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name = "Spend Range"
    verbose_name_plural = "Spend Ranges"
    ordering = ["display_order", "low_range"]

  def __str__(self):
      return f"{self.low_range} - {self.high_range}"

class Area(models.Model):
  name = models.CharField(max_length=255, unique=True)
  slug = models.SlugField(unique=True, blank=True)

  is_active = models.BooleanField(default=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
      verbose_name = "Area"
      verbose_name_plural = "Areas"
      ordering = ["name"]

  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.name)
    super().save(*args, **kwargs)

  def __str__(self):
      return self.name