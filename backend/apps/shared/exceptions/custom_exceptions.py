from rest_framework.exceptions import APIException


class TokenExpiredException(APIException):
    status_code = 401
    default_code = "TOKEN_EXPIRED"
    default_detail = "Token is expired."


class ResourceNotFoundException(APIException):
    status_code = 404
    default_detail = "The requested resource not found."
