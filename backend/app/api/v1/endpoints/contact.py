# backend/app/api/v1/endpoints/contact.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.db.models import ContactMessage
from app.models.contact import ContactSubmission
from app.services.email_service import send_contact_email

router = APIRouter()


@router.post("/contact")
async def submit_contact(payload: ContactSubmission, db: AsyncSession = Depends(get_db)):
    delivered = await send_contact_email(payload.name, payload.email, payload.message)

    record = ContactMessage(
        name=payload.name,
        email=payload.email,
        message=payload.message,
        email_delivered=delivered,
    )
    db.add(record)
    await db.commit()

    return {"status": "ok"}