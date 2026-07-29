from enum import Enum

from pydantic import BaseModel, Field


class SubjectPriority(str, Enum):
    low = "Low"
    medium = "Medium"
    high = "High"


class SubjectCreate(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100
    )

    daily_study_target: int = Field(
        gt=0,
        le=1440,
        description="Daily study target in minutes"
    )

    priority: SubjectPriority = SubjectPriority.medium

    semester_id: int = Field(gt=0)


class SubjectUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100
    )

    daily_study_target: int | None = Field(
        default=None,
        gt=0,
        le=1440
    )

    priority: SubjectPriority | None = None


class SubjectResponse(BaseModel):
    id: int
    name: str
    daily_study_target: int
    priority: SubjectPriority
    semester_id: int
    user_id: int

    class Config:
        from_attributes = True