from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user model to use email as authentication field"""

    username = None  # Remove username field from model
    email = models.EmailField(unique=True)
    profile_image = models.ImageField(upload_to="images/", blank=True, null=True)

    # Use email as auth field
    USERNAME_FIELD = "email"

    # Only for creating superuser. Ask first name and last name explicitly
    REQUIRED_FIELDS = ("first_name", "last_name")

    groups_joined = models.ManyToManyField(
        "group.Groups", through="group.GroupMembership"
    )
