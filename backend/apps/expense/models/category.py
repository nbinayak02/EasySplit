from django.db import models

from apps.group.models import Groups
from apps.shared.models import CreatorModel, TimestampModel


class ExpenseCategory(TimestampModel, CreatorModel):
    name = models.CharField(max_length=30, blank=False)
    group = models.ForeignKey(
        to=Groups, on_delete=models.CASCADE, related_name="category_group"
    )
