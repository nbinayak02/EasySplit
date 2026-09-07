from rest_framework.serializers import ImageField, ModelSerializer

from apps.group.models import Groups


class UpdateGroupSerializer(ModelSerializer):
    class Meta:
        model = Groups
        fields = ("id", "name", "group_id", "description", "profile_image")
        read_only_fields = ("id", "group_id", "profile_image")


class UpdateGroupProfileImageSerializer(ModelSerializer):
    profile_image = ImageField(required=True, allow_empty_file=False)

    class Meta:
        model = Groups
        fields = ("id", "name", "group_id", "description", "profile_image")
        read_only_fields = ("id", "group_id", "name", "description")
