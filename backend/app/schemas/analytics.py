from pydantic import BaseModel


class SubjectAnalytics(BaseModel):
    subject_name: str
    study_minutes: int
    study_hours: float


class WeeklyAnalytics(BaseModel):
    day: str
    study_minutes: int


class TaskAnalytics(BaseModel):
    total: int
    completed: int
    in_progress: int
    pending: int
    overdue: int


class AnalyticsResponse(BaseModel):
    task_analytics: TaskAnalytics
    subject_statistics: list[SubjectAnalytics]
    weekly_statistics: list[WeeklyAnalytics]