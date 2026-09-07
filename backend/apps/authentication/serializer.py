from rest_framework import serializers

from apps.user.models import User


class SignupSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=20, required=True, allow_blank=False)
    last_name = serializers.CharField(max_length=20, required=True, allow_blank=False)

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    # serializer won't hash the password so we override it's create method
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
