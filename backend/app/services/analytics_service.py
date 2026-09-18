# backend/app/services/analytics_service.py
from datetime import datetime, timedelta, timezone

from sqlalchemy import select, func, distinct, cast, Date
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import AnalyticsEvent


def parse_device(user_agent: str) -> str:
    ua = user_agent.lower()
    mobile_markers = ["mobile", "android", "iphone", "ipad"]
    if any(marker in ua for marker in mobile_markers):
        return "mobile"
    return "desktop"


async def record_pageview(db: AsyncSession, session_id: str, path: str, country: str | None, device: str):
    event = AnalyticsEvent(
        session_id=session_id,
        path=path,
        country=country,
        device=device,
    )
    db.add(event)
    await db.commit()


async def get_visitor_summary(db: AsyncSession) -> dict:
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=today_start.weekday())
    month_start = today_start.replace(day=1)
    thirty_days_ago = today_start - timedelta(days=30)

    sessions_today = await _distinct_session_count(db, today_start)
    sessions_this_week = await _distinct_session_count(db, week_start)
    sessions_this_month = await _distinct_session_count(db, month_start)
    pageviews_this_week = await _pageview_count(db, week_start)

    daily_pageviews = await _daily_pageviews(db, thirty_days_ago)
    session_trend = await _session_trend(db, thirty_days_ago)
    top_pages = await _top_pages(db, thirty_days_ago)
    top_countries = await _top_countries(db, thirty_days_ago)
    device_breakdown = await _device_breakdown(db, thirty_days_ago)

    return {
        "sessionsToday": sessions_today,
        "sessionsThisWeek": sessions_this_week,
        "pageViewsThisWeek": pageviews_this_week,
        "sessionsThisMonth": sessions_this_month,
        "dailyPageViews": daily_pageviews,
        "sessionTrend": session_trend,
        "topPages": top_pages,
        "topCountries": top_countries,
        "deviceBreakdown": device_breakdown,
    }


async def _distinct_session_count(db: AsyncSession, since: datetime) -> int:
    stmt = select(func.count(distinct(AnalyticsEvent.session_id))).where(AnalyticsEvent.created_at >= since)
    return (await db.execute(stmt)).scalar_one()


async def _pageview_count(db: AsyncSession, since: datetime) -> int:
    stmt = select(func.count()).select_from(AnalyticsEvent).where(AnalyticsEvent.created_at >= since)
    return (await db.execute(stmt)).scalar_one()


async def _daily_pageviews(db: AsyncSession, since: datetime) -> list[dict]:
    day_col = cast(AnalyticsEvent.created_at, Date)
    stmt = (
        select(day_col.label("date"), func.count().label("views"))
        .where(AnalyticsEvent.created_at >= since)
        .group_by(day_col)
        .order_by(day_col)
    )
    rows = (await db.execute(stmt)).all()
    return [{"date": str(row.date), "views": row.views} for row in rows]


async def _session_trend(db: AsyncSession, since: datetime) -> list[dict]:
    day_col = cast(AnalyticsEvent.created_at, Date)
    stmt = (
        select(day_col.label("date"), func.count(distinct(AnalyticsEvent.session_id)).label("sessions"))
        .where(AnalyticsEvent.created_at >= since)
        .group_by(day_col)
        .order_by(day_col)
    )
    rows = (await db.execute(stmt)).all()
    return [{"date": str(row.date), "sessions": row.sessions} for row in rows]


async def _top_pages(db: AsyncSession, since: datetime, limit: int = 10) -> list[dict]:
    stmt = (
        select(AnalyticsEvent.path, func.count().label("views"))
        .where(AnalyticsEvent.created_at >= since)
        .group_by(AnalyticsEvent.path)
        .order_by(func.count().desc())
        .limit(limit)
    )
    rows = (await db.execute(stmt)).all()
    return [{"path": row.path, "views": row.views} for row in rows]


async def _top_countries(db: AsyncSession, since: datetime, limit: int = 10) -> list[dict]:
    stmt = (
        select(AnalyticsEvent.country, func.count().label("visits"))
        .where(AnalyticsEvent.created_at >= since, AnalyticsEvent.country.is_not(None))
        .group_by(AnalyticsEvent.country)
        .order_by(func.count().desc())
        .limit(limit)
    )
    rows = (await db.execute(stmt)).all()
    return [{"country": row.country, "visits": row.visits} for row in rows]


async def _device_breakdown(db: AsyncSession, since: datetime) -> dict:
    stmt = (
        select(AnalyticsEvent.device, func.count().label("count"))
        .where(AnalyticsEvent.created_at >= since)
        .group_by(AnalyticsEvent.device)
    )
    rows = (await db.execute(stmt)).all()
    result = {"desktop": 0, "mobile": 0}
    for row in rows:
        if row.device in result:
            result[row.device] = row.count
    return result