from datetime import date

from sqlalchemy import func
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user

from app.models.user import User
from app.models.semester import Semester
from app.models.subject import Subject
from app.models.task import Task
from app.models.study_session import StudySession

from app.schemas.dashboard import DashboardResponse


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/",
    response_model=DashboardResponse
)
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # ==========================
    # Basic Counts
    # ==========================

    total_semesters = db.query(Semester).filter(
        Semester.user_id == current_user.id
    ).count()

    total_subjects = db.query(Subject).filter(
        Subject.user_id == current_user.id
    ).count()

    total_tasks = db.query(Task).filter(
        Task.user_id == current_user.id
    ).count()

    total_sessions = db.query(StudySession).filter(
        StudySession.user_id == current_user.id
    ).count()

    # ==========================
    # Task Statistics
    # ==========================

    completed_tasks = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.status == "Completed"
    ).count()

    in_progress_tasks = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.status == "In Progress"
    ).count()

    pending_tasks = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.status == "Not Started"
    ).count()

    overdue_tasks = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.deadline.isnot(None),
        Task.deadline < date.today(),
        Task.status != "Completed"
    ).count()

    # ==========================
    # Study Statistics
    # ==========================

    total_study_minutes = db.query(
        func.sum(StudySession.duration_minutes)
    ).filter(
        StudySession.user_id == current_user.id
    ).scalar() or 0

    total_study_hours = round(
        total_study_minutes / 60,
        2
    )

    # ==========================
    # Completion Percentage
    # ==========================

    completed_percentage = (
        round((completed_tasks / total_tasks) * 100, 2)
        if total_tasks > 0
        else 0
    )

    # ==========================
    # Upcoming Tasks
    # ==========================

    upcoming_tasks = (
        db.query(Task)
        .filter(
            Task.user_id == current_user.id,
            Task.status != "Completed",
            Task.deadline.isnot(None)
        )
        .order_by(Task.deadline.asc())
        .limit(5)
        .all()
    )

    # ==========================
    # Recent Study Sessions
    # ==========================

    recent_sessions = (
        db.query(StudySession)
        .filter(
            StudySession.user_id == current_user.id
        )
        .order_by(
            StudySession.started_at.desc()
        )
        .limit(5)
        .all()
    )

    # ==========================
    # Motivational Message
    # ==========================

    if completed_percentage >= 80:
        motivation = "🔥 Excellent! You're making amazing progress."

    elif completed_percentage >= 50:
        motivation = "🚀 Great work! Keep the momentum going."

    elif completed_percentage > 0:
        motivation = "💪 Keep studying. You're getting there."

    else:
        motivation = "📚 Start your first task today!"

    # ==========================
    # Response
    # ==========================

    return {

        "total_semesters": total_semesters,

        "total_subjects": total_subjects,

        "total_tasks": total_tasks,

        "completed_tasks": completed_tasks,

        "in_progress_tasks": in_progress_tasks,

        "pending_tasks": pending_tasks,

        "overdue_tasks": overdue_tasks,

        "completed_percentage": completed_percentage,

        "total_sessions": total_sessions,

        "total_study_minutes": total_study_minutes,

        "total_study_hours": total_study_hours,

        "motivation": motivation,

        "upcoming_tasks": upcoming_tasks,

        "recent_sessions": recent_sessions

    }