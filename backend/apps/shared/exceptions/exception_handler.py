from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.views import exception_handler

from apps.shared.response import APIResponse


def custom_exception_handler(exception, context):
    """Custom exception handler for consistent API Response."""

    # Call parent exception_handler
    exception_response = exception_handler(exception, context)

    if isinstance(exception, ValidationError):
        message = "Validation failed."
    else:
        message = "Request unsuccessful."
        # we can add more exception check also

    # If this exception is not known by drf
    if exception_response is None:
        response = APIResponse(
            success=False,
            message="Something went wrong.",
            data=None,
            errors=None,
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            meta=None,
        )

    else:
        response = APIResponse(
            success=False,
            message=message,
            errors=exception_response.data,
            error_code=exception.get_codes(),
            status_code=exception_response.status_code,
        )

    return response
