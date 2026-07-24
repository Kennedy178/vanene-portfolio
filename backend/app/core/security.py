# backend/app/core/security.py
import hashlib
import hmac
import time

from app.core.config import get_settings

settings = get_settings()

COOKIE_NAME = "admin_session"
SESSION_MAX_AGE = 60 * 60 * 8  # 8 hours


def _sign(value: str) -> str:
    return hmac.new(settings.session_secret.encode(), value.encode(), hashlib.sha256).hexdigest()


def create_session_token() -> str:
    issued_at = str(int(time.time()))
    signature = _sign(issued_at)
    return f"{issued_at}.{signature}"


def verify_session_token(token: str | None) -> bool:
    if not token or "." not in token:
        return False
    issued_at, signature = token.split(".", 1)
    if not hmac.compare_digest(_sign(issued_at), signature):
        return False
    if int(time.time()) - int(issued_at) > SESSION_MAX_AGE:
        return False
    return True


def check_admin_password(password: str) -> bool:
    return hmac.compare_digest(password, settings.admin_secret)