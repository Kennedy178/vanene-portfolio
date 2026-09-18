# backend/app/models/analytics.py
from pydantic import BaseModel


class PageviewSubmission(BaseModel):
    session_id: str
    path: str


class DailyPageView(BaseModel):
    date: str
    views: int


class SessionTrendPoint(BaseModel):
    date: str
    sessions: int


class TopPage(BaseModel):
    path: str
    views: int


class TopCountry(BaseModel):
    country: str
    visits: int


class DeviceBreakdown(BaseModel):
    desktop: int
    mobile: int


class VisitorSummary(BaseModel):
    sessionsToday: int
    sessionsThisWeek: int
    pageViewsThisWeek: int
    sessionsThisMonth: int
    dailyPageViews: list[DailyPageView]
    sessionTrend: list[SessionTrendPoint]
    topPages: list[TopPage]
    topCountries: list[TopCountry]
    deviceBreakdown: DeviceBreakdown