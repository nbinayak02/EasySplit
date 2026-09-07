from django.db import models

from apps.expense.models.expense import Expense
from apps.user.models import User


class InitialPayment(models.Model):
    
    expense = models.ForeignKey(
        to=Expense, on_delete=models.CASCADE, related_name="initial_payment_expense"
    )
    paid_by = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="initial_payment_paid_by"
    )
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, blank=False, null=False
    )
