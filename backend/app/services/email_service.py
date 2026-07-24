# backend/app/services/email_service.py
import httpx

from app.core.config import get_settings

settings = get_settings()

RESEND_STUB_ACTIVE = settings.resend_api_key == "stub_not_configured_yet"


async def send_contact_email(name: str, email: str, message: str) -> bool:
    if RESEND_STUB_ACTIVE:
        print(f"[email stub] Would send contact email from {name} <{email}>: {message}")
        return False

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {settings.resend_api_key}"},
            json={
                "from": settings.resend_from_email,
                "to": settings.contact_to_email,
                "subject": f"Portfolio contact from {name}",
                "reply_to": email,
                "text": message,
            },
        )
        return response.status_code == 200