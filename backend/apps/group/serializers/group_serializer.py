from rest_framework import serializers

from apps.group.models import Groups


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups

        fields = [  # noqa: RUF012
            "id",
            "name",
            "group_id",
            "description",
            "profile_image",
            "created_by",
            "updated_by",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [  # noqa: RUF012
            "group_id",
            "created_at",
            "updated_at",
            "id",
        ]
