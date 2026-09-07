from django.db import models

from apps.group.models.group import Groups
from apps.shared.models import TimestampModel
from apps.user.models import User


class Settlement(TimestampModel):
    group = models.ForeignKey(to=Groups, on_delete=models.CASCADE, related_name="settlement_group_joined")
    paid_by = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="settlement_paid_by"
    )
    paid_to = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="settlement_paid_to"
    )
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, blank=False
    )
