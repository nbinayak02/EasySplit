from apps.activity.serializers import ActivitySerializer


def create_activity(user_id, group_id, module, action, details=None):

    payload = {
        "user": user_id,
        "group": group_id,
        "module": module,
        "action": action,
        "details": details,
    }

    serializer = ActivitySerializer(data=payload)

    serializer.is_valid(raise_exception=True)

    serializer.save()
