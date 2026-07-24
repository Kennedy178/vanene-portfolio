# backend/app/models/ratings.py
from datetime import datetime
from typing import Literal
from uuid import UUID
from pydantic import BaseModel, Field


class RatingSubmission(BaseModel):
    name: str
    role_company: str
    rating: int = Field(ge=1, le=5)
    quote: str
    email: str | None = None
    honeypot: str | None = None


class ApprovedRating(BaseModel):
    id: UUID
    name: str
    role_company: str
    rating: int
    quote: str
    created_at: datetime

    class Config:
        from_attributes = True


class AdminRating(ApprovedRating):
    status: str
    email: str | None = None


class PaginatedRatings(BaseModel):
    items: list[ApprovedRating]
    total: int
    page: int
    pageSize: int


class UpdateRatingStatus(BaseModel):
    status: Literal["approved", "rejected"]