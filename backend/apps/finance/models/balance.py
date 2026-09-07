from django.db import models

from apps.group.models import Groups
from apps.user.models import User


class Balance(models.Model):
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="balance_user"
    )
    group = models.ForeignKey(
        to=Groups, on_delete=models.CASCADE, related_name="balance_group_joined"
    )
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        constraints = [  # noqa: RUF012
            models.UniqueConstraint(
                fields=["user", "group"], name="balance_user_group_unique"
            )
        ]
