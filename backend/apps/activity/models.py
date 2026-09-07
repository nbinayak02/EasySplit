from django.db import models

from apps.group.models.group import Groups
from apps.user.models import User


class ModulesType(models.TextChoices):
    USER = "usr", "user"
    GROUP = "grp", "group"
    EXPENSE = "exp", "expense"
    SETTLEMENT = "set", "settlement"
    PAYMENT = "pay", "payment"
    SPLIT = "spl", "split"


class ActionType(models.TextChoices):
    CREATE = "crt", "create"
    UPDATE = "upd", "update"
    DELETE = "del", "delete"
    JOIN = "joi", "join"
    LEAVE = "lve", "leave"


class Activity(models.Model):
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="activity_user"
    )
    group = models.ForeignKey(
        to=Groups,
        on_delete=models.SET_NULL,
        related_name="activity_group",
        null=True,
        blank=True,
    )
    module = models.CharField(
        max_length=3, choices=ModulesType, null=False, blank=False
    )
    action = models.CharField(max_length=3, choices=ActionType, null=False, blank=False)
    details = models.JSONField(blank=True, null=True, default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
