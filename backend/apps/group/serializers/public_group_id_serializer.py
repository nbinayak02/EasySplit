from rest_framework import serializers


class PublicGroupIdSerializer(serializers.Serializer):
    group_id = serializers.UUIDField(format="hex_verbose")
