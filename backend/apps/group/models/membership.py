from django.db import models

from apps.group.models import Groups
from apps.shared.models import TimestampModel
from apps.user.models import User


class GroupMembership(TimestampModel):
    # User cannot delete their account when joined in group.
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="member_user"
    )

    # If group is deleted, delete this also.
    group = models.ForeignKey(
        to=Groups, on_delete=models.CASCADE, related_name="member_group"
    )

    isAdmin = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "group"], name="unique_user_group_constraint"
            )
        ]
