# backend/app/core/config.py
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Database
    database_url: str

    # Admin auth
    admin_secret: str
    session_secret: str

    # CORS, comma separated string parsed into a list
    allowed_origins: str = "http://localhost:5173"

    # Resend, stubbed until domain is verified
    resend_api_key: str = "stub_not_configured_yet"
    resend_from_email: str = "noreply@vanene.online"
    contact_to_email: str = ""

    # Umami, added later
    umami_api_url: str = ""
    umami_api_key: str = ""
    umami_website_id: str = ""

    environment: str = "development"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    @property
    def allowed_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]

    @property
    def is_production(self) -> bool:
        return self.environment == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()