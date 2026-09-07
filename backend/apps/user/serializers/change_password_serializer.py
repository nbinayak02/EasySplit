from rest_framework import serializers


class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8)

    # manually has the password because serializer won't do it
    def update(self, instance, validated_data):
        password = validated_data.pop("password")
        instance.set_password(password)
        instance.save()
        return instance
