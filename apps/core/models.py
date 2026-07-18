from django.db import models
from django.utils.text import slugify

# Create your models here.
class Category(models.Model):
  name = models.CharField(max_length=100, unique=True)
  slug = models.SlugField(unique=True)

  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.name)
    super().save(*args, **kwargs)

  def __str__(self):
    return self.name


class SubCategory(models.Model):
  name = models.CharField(max_length=100, unique=True)
  slug = models.SlugField(unique=True)

  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.name)
    super().save(*args, **kwargs)

  def __str__(self):
      return self.name


class Brand(models.Model):
  name = models.CharField(max_length=100, unique=True)
  slug = models.SlugField(unique=True)

  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.name)
    super().save(*args, **kwargs)

  def __str__(self):
      return self.name


class SpendRange(models.Model):
  low_range = models.PositiveIntegerField()
  high_range = models.PositiveIntegerField()

  def __str__(self):
      return f"{self.low_range} - {self.high_range}"