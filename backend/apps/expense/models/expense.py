from django.db import models

from apps.group.models import Groups
from apps.shared.models import CreatorModel, TimestampModel

from .category import ExpenseCategory


class SplitType(models.TextChoices):
    EQUALLY = "EQUALLY", "Equally"
    AMOUNT = "AMOUNT", "Amount"
    PERCENTAGE = "PERCENTAGE", "Percentage"


class Expense(TimestampModel, CreatorModel):
    title = models.CharField(max_length=30, blank=False, null=False)
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, blank=False, null=False
    )
    category = models.ForeignKey(
        to=ExpenseCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="expense_category",
    )
    group = models.ForeignKey(
        to=Groups, on_delete=models.CASCADE, related_name="expense_group_joined"
    )
    split_type = models.CharField(
        max_length=10, choices=SplitType.choices, default=SplitType.EQUALLY
    )
