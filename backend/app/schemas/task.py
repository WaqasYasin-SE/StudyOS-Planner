from datetime import date
from enum import Enum

from pydantic import BaseModel, Field


class TaskPriority(str, Enum):
    low = "Low"
    medium = "Medium"
    high = "High"


class TaskStatus(str, Enum):
    not_started = "Not Started"
    in_progress = "In Progress"
    completed = "Completed"


class TaskCreate(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    description: str | None = Field(
        default=None,
        max_length=1000
    )
    deadline: date | None = None
    priority: TaskPriority = TaskPriority.medium
    status: TaskStatus = TaskStatus.not_started
    subject_id: int


class TaskUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        min_length=3,
        max_length=200
    )
    description: str | None = Field(
        default=None,
        max_length=1000
    )
    deadline: date | None = None
    priority: TaskPriority | None = None
    status: TaskStatus | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    deadline: date | None
    priority: TaskPriority
    status: TaskStatus
    subject_id: int
    user_id: int

    class Config:
        from_attributes = True