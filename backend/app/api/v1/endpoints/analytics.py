# backend/app/api/v1/endpoints/analytics.py
from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.analytics import PageviewSubmission, VisitorSummary
from app.services import analytics_service
from app.services.analytics_service import parse_device
from app.api.v1.endpoints.admin import require_admin

router = APIRouter()


def get_client_ip(request: Request) -> str | None:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    if request.client:
        return request.client.host
    return None


async def lookup_country(ip: str | None) -> str | None:
    if not ip or ip in ("127.0.0.1", "localhost"):
        return None
    try:
        import httpx
        async with httpx.AsyncClient(timeout=2.0) as client:
            response = await client.get(f"https://ipapi.co/{ip}/country/")
            if response.status_code == 200:
                code = response.text.strip()
                if code and len(code) == 2:
                    return code
    except Exception:
        pass
    return None


@router.post("/analytics/pageview", status_code=204)
async def record_pageview(
    payload: PageviewSubmission,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    ip = get_client_ip(request)
    country = await lookup_country(ip)
    user_agent = request.headers.get("user-agent", "")
    device = parse_device(user_agent)

    await analytics_service.record_pageview(
        db,
        session_id=payload.session_id,
        path=payload.path,
        country=country,
        device=device,
    )
    return None


@router.get("/admin/analytics", response_model=VisitorSummary)
async def get_analytics(db: AsyncSession = Depends(get_db), _: None = Depends(require_admin)):
    return await analytics_service.get_visitor_summary(db)