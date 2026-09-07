from django.db import models

from apps.user.models import User


class TimestampModel(models.Model):
    """Abstract model that has created_at and updated_at field."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class CreatorModel(models.Model):
    """Abstract model that contains created_by and updated_by fields"""

    created_by = models.ForeignKey(
        to=User, on_delete=models.SET_NULL, null=True, related_name="%(app_label)s_%(class)s_created_by"
    )
    updated_by = models.ForeignKey(
        to=User, on_delete=models.SET_NULL, null=True, related_name="%(app_label)s_%(class)s_updated_by"
    )

    class Meta:
        abstract = True
