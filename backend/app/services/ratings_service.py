# backend/app/services/ratings_service.py
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Rating, RatingStatus


async def get_approved_ratings(db: AsyncSession, page: int, page_size: int):
    offset = (page - 1) * page_size

    total_stmt = select(func.count()).select_from(Rating).where(Rating.status == RatingStatus.approved)
    total = (await db.execute(total_stmt)).scalar_one()

    items_stmt = (
        select(Rating)
        .where(Rating.status == RatingStatus.approved)
        .order_by(Rating.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    items = (await db.execute(items_stmt)).scalars().all()

    return items, total


async def create_rating(db: AsyncSession, name: str, role_company: str, rating: int, quote: str, email: str | None):
    new_rating = Rating(
        name=name,
        role_company=role_company,
        rating=rating,
        quote=quote,
        email=email,
        status=RatingStatus.pending,
    )
    db.add(new_rating)
    await db.commit()
    return new_rating


async def get_all_ratings(db: AsyncSession):
    stmt = select(Rating).order_by(Rating.created_at.desc())
    result = await db.execute(stmt)
    return result.scalars().all()


async def update_rating_status(db: AsyncSession, rating_id, new_status: RatingStatus):
    stmt = select(Rating).where(Rating.id == rating_id)
    result = await db.execute(stmt)
    rating = result.scalar_one_or_none()
    if rating is None:
        return None
    rating.status = new_status
    await db.commit()
    await db.refresh(rating)
    return rating