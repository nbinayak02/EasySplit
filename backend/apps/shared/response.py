from rest_framework import status
from rest_framework.response import Response


def APIResponse(
    success=True,
    message="Success",
    data=None,
    status_code=status.HTTP_200_OK,
    meta=None,
    errors=None,
    error_code=None,
):
    """
    Response wrapper for custom response format
    """
    response = {
        "success": success,
        "message": message,
        "data": data,
    }

    # add error
    if errors is not None:
        response["errors"] = errors

    if error_code is not None:
        response["error_code"] = error_code

    # meta is used for pagination
    if meta is not None:
        response["meta"] = meta

    return Response(response, status=status_code)
