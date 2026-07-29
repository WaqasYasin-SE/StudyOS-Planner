from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user

from app.models.study_session import StudySession
from app.models.subject import Subject
from app.models.user import User

from app.schemas.study_session import (
    StudySessionCreate,
    StudySessionUpdate,
    StudySessionResponse
)

router = APIRouter(
    prefix="/study-sessions",
    tags=["Study Sessions"]
)


# =========================
# Create Study Session
# =========================
@router.post(
    "/",
    response_model=StudySessionResponse,
    status_code=status.HTTP_201_CREATED
)
def create_session(
    session_data: StudySessionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    subject = db.query(Subject).filter(
        Subject.id == session_data.subject_id,
        Subject.user_id == current_user.id
    ).first()

    if subject is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subject not found."
        )

    if (
        session_data.started_at
        and session_data.ended_at
        and session_data.ended_at <= session_data.started_at
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ended_at must be later than started_at."
        )

    duration_minutes = session_data.duration_minutes

    if session_data.started_at and session_data.ended_at:
        duration_minutes = int(
            (
                session_data.ended_at -
                session_data.started_at
            ).total_seconds() / 60
        )

    new_session = StudySession(
        subject_id=session_data.subject_id,
        user_id=current_user.id,
        duration_minutes=duration_minutes,
        started_at=session_data.started_at,
        ended_at=session_data.ended_at
    )

    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    return new_session


# =========================
# Get All Study Sessions
# =========================
@router.get(
    "/",
    response_model=list[StudySessionResponse]
)
def get_sessions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return db.query(StudySession).filter(
        StudySession.user_id == current_user.id
    ).order_by(
        StudySession.started_at.desc()
    ).all()


# =========================
# Get Single Study Session
# =========================
@router.get(
    "/{session_id}",
    response_model=StudySessionResponse
)
def get_session(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    session = db.query(StudySession).filter(
        StudySession.id == session_id,
        StudySession.user_id == current_user.id
    ).first()

    if session is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Study session not found."
        )

    return session


# =========================
# Update Study Session
# =========================
@router.patch(
    "/{session_id}",
    response_model=StudySessionResponse
)
def update_session(
    session_id: int,
    session_data: StudySessionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    session = db.query(StudySession).filter(
        StudySession.id == session_id,
        StudySession.user_id == current_user.id
    ).first()

    if session is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Study session not found."
        )

    update_data = session_data.model_dump(
        exclude_unset=True
    )

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No data provided for update."
        )

    for key, value in update_data.items():
        setattr(session, key, value)

    if (
        session.started_at
        and session.ended_at
        and session.ended_at <= session.started_at
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ended_at must be later than started_at."
        )

    if session.started_at and session.ended_at:
        session.duration_minutes = int(
            (
                session.ended_at -
                session.started_at
            ).total_seconds() / 60
        )

    db.commit()
    db.refresh(session)

    return session


# =========================
# Delete Study Session
# =========================
@router.delete(
    "/{session_id}",
    status_code=status.HTTP_200_OK
)
def delete_session(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    session = db.query(StudySession).filter(
        StudySession.id == session_id,
        StudySession.user_id == current_user.id
    ).first()

    if session is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Study session not found."
        )

    db.delete(session)
    db.commit()

    return {
        "message": "Study session deleted successfully."
    }