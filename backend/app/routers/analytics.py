from datetime import date, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.dependencies import get_db, get_current_user

from app.models.user import User
from app.models.subject import Subject
from app.models.task import Task
from app.models.study_session import StudySession

from app.schemas.analytics import AnalyticsResponse


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get(
    "/",
    response_model=AnalyticsResponse
)
def get_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # ====================
    # Task Analytics
    # ====================

    total = db.query(Task).filter(
        Task.user_id == current_user.id
    ).count()

    completed = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.status == "Completed"
    ).count()

    in_progress = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.status == "In Progress"
    ).count()

    pending = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.status == "Not Started"
    ).count()

    overdue = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.deadline.is_not(None),
        Task.deadline < date.today(),
        Task.status != "Completed"
    ).count()

    task_analytics = {
        "total": total,
        "completed": completed,
        "in_progress": in_progress,
        "pending": pending,
        "overdue": overdue
    }

    # ====================
    # Subject Statistics
    # ====================

    stats = db.query(
        Subject.name,
        func.sum(
            StudySession.duration_minutes
        )
    ).outerjoin(
        StudySession,
        StudySession.subject_id == Subject.id
    ).filter(
        Subject.user_id == current_user.id
    ).group_by(
        Subject.id
    ).all()

    subject_statistics = [
        {
            "subject_name": name,
            "study_minutes": minutes or 0,
            "study_hours": round(
                (minutes or 0) / 60,
                2
            )
        }
        for name, minutes in stats
    ]

    # ====================
    # Weekly Statistics
    # ====================

    weekly_statistics = []

    for i in range(7):

        current_day = (
            date.today()
            - timedelta(days=6 - i)
        )

        minutes = db.query(
            func.sum(
                StudySession.duration_minutes
            )
        ).filter(
            StudySession.user_id == current_user.id,
            func.date(
                StudySession.started_at
            ) == current_day
        ).scalar() or 0

        weekly_statistics.append({
            "day": current_day.strftime("%a"),
            "study_minutes": minutes
        })

    return {
        "task_analytics": task_analytics,
        "subject_statistics": subject_statistics,
        "weekly_statistics": weekly_statistics
    }