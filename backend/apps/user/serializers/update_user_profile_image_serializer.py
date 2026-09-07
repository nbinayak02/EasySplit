from rest_framework import serializers

from apps.user.models import User


class UpdateUserProfileImageSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=True, allow_empty_file=False)

    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "profile_image", "email")
        read_only_fields = ("id", "first_name", "last_name", "email")
