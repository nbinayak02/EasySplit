from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from apps.group.models import GroupMembership


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMembership

        fields = ("user", "group", "isAdmin", "created_at", "updated_at")

        read_only_fields = ("created_at", "updated_at")

        validators = [  # noqa: RUF012
            UniqueTogetherValidator(
                queryset=GroupMembership.objects.all(),
                message="User already exists in this group.",
                fields=["user", "group"],
            )
        ]
