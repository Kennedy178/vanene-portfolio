# backend/app/db/models.py
import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Integer, Text, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
import enum


class Base(DeclarativeBase):
    pass


class RatingStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"


class Rating(Base):
    __tablename__ = "ratings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False)
    role_company: Mapped[str] = mapped_column(String, nullable=False)
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    quote: Mapped[str] = mapped_column(Text, nullable=False)
    email: Mapped[str | None] = mapped_column(String, nullable=True)
    status: Mapped[RatingStatus] = mapped_column(
        Enum(RatingStatus, name="rating_status"), default=RatingStatus.pending, nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    sent_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    email_delivered: Mapped[bool] = mapped_column(default=False)