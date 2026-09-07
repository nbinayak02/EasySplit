from drf_spectacular.extensions import OpenApiAuthenticationExtension

from apps.authentication.authenticate import JWTCookieAuthentication


class JWTCookieAuthScheme(OpenApiAuthenticationExtension):
    target_class = JWTCookieAuthentication
    name = "JWTCookieAuthentication"

    def get_security_definition(self, auto_schema):

        return {
            "type": "apiKey",
            "in": "cookie",
            "name": "access_token",
            "description": "JWT authentication token stored in HTTP-only cookie.",
        }
