from uuid import uuid4

from django.db import models

from apps.shared.models import CreatorModel, TimestampModel


class Groups(TimestampModel, CreatorModel):
    name = models.CharField(max_length=30, blank=False)
    group_id = models.UUIDField(default=uuid4, unique=True, editable=False)
    description = models.CharField(max_length=100, blank=True)
    profile_image = models.ImageField(upload_to="images/", blank=True, null=True)
