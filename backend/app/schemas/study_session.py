from datetime import datetime
from pydantic import BaseModel, Field


class StudySessionCreate(BaseModel):
    duration_minutes: int = Field(gt=0)
    subject_id: int = Field(gt=0)
    started_at: datetime | None = None
    ended_at: datetime | None = None


class StudySessionUpdate(BaseModel):
    duration_minutes: int | None = Field(
        default=None,
        gt=0
    )
    started_at: datetime | None = None
    ended_at: datetime | None = None


class StudySessionResponse(BaseModel):
    id: int
    duration_minutes: int
    started_at: datetime | None = None
    ended_at: datetime | None = None
    subject_id: int
    user_id: int

    class Config:
        from_attributes = True