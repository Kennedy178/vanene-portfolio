# backend/app/api/v1/endpoints/ratings.py
from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.db.models import RatingStatus
from app.models.ratings import RatingSubmission, PaginatedRatings, AdminRating, UpdateRatingStatus
from app.services import ratings_service
from app.api.v1.endpoints.admin import require_admin

router = APIRouter()


@router.get("/ratings/approved", response_model=PaginatedRatings)
async def list_approved_ratings(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=6, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    items, total = await ratings_service.get_approved_ratings(db, page, page_size)
    return {
        "items": items,
        "total": total,
        "page": page,
        "pageSize": page_size,
    }


@router.post("/ratings")
async def submit_rating(payload: RatingSubmission, db: AsyncSession = Depends(get_db)):
    if payload.honeypot:
        # Silently discard, never touches the pending queue
        return {"status": "ok"}

    await ratings_service.create_rating(
        db,
        name=payload.name,
        role_company=payload.role_company,
        rating=payload.rating,
        quote=payload.quote,
        email=payload.email,
    )
    return {"status": "ok"}


@router.get("/admin/ratings", response_model=list[AdminRating])
async def list_all_ratings(db: AsyncSession = Depends(get_db), _: None = Depends(require_admin)):
    return await ratings_service.get_all_ratings(db)


@router.patch("/admin/ratings/{rating_id}", response_model=AdminRating)
async def patch_rating(
    rating_id: str,
    payload: UpdateRatingStatus,
    db: AsyncSession = Depends(get_db),
    _: None = Depends(require_admin),
):
    rating = await ratings_service.update_rating_status(db, rating_id, RatingStatus(payload.status))
    if rating is None:
        raise HTTPException(status_code=404, detail="Rating not found")
    return rating