from pydantic import BaseModel

from app.schemas.task import TaskResponse
from app.schemas.study_session import StudySessionResponse


class DashboardResponse(BaseModel):

    total_semesters: int
    total_subjects: int

    total_tasks: int
    completed_tasks: int
    in_progress_tasks: int
    pending_tasks: int
    overdue_tasks: int

    completed_percentage: float

    total_sessions: int

    total_study_minutes: int
    total_study_hours: float

    motivation: str

    upcoming_tasks: list[TaskResponse]

    recent_sessions: list[StudySessionResponse]