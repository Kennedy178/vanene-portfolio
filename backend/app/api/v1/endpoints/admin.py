# backend/app/api/v1/endpoints/admin.py
from fastapi import APIRouter, Cookie, HTTPException, Response

from app.core.security import (
    COOKIE_NAME,
    check_admin_password,
    create_session_token,
    verify_session_token,
)
from app.core.config import get_settings

router = APIRouter()
settings = get_settings()


async def require_admin(admin_session: str | None = Cookie(default=None)):
    if not verify_session_token(admin_session):
        raise HTTPException(status_code=401, detail="Not authenticated")


@router.post("/admin/login")
async def admin_login(payload: dict, response: Response):
    password = payload.get("password", "")
    if not check_admin_password(password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    token = create_session_token()
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        secure=settings.is_production,
        samesite="lax",
        max_age=60 * 60 * 8,
    )
    return {"status": "ok"}