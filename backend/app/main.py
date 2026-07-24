# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.api.v1.endpoints import ratings, admin, contact

settings = get_settings()

app = FastAPI(title="Vanene Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ratings.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")
app.include_router(contact.router, prefix="/api/v1")


@app.get("/health")
async def health():
    return {"status": "ok"}