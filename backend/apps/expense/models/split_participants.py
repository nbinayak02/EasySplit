from django.db import models

from apps.user.models import User

from .expense import Expense


class SplitParticipant(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="split_participant_user")
    expense = models.ForeignKey(to=Expense, on_delete=models.CASCADE, related_name="split_participant_expense")
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    