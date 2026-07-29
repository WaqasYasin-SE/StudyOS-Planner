from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user

from app.models.subject import Subject
from app.models.semester import Semester
from app.models.user import User

from app.schemas.subject import (
    SubjectCreate,
    SubjectUpdate,
    SubjectResponse
)

router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"]
)


# =========================
# Create Subject
# =========================
@router.post(
    "/",
    response_model=SubjectResponse,
    status_code=status.HTTP_201_CREATED
)
def create_subject(
    subject_data: SubjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Normalize name
    name = subject_data.name.strip().title()

    # Verify semester belongs to current user
    semester = db.query(Semester).filter(
        Semester.id == subject_data.semester_id,
        Semester.user_id == current_user.id
    ).first()

    if semester is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Semester not found."
        )

    # Prevent duplicate subjects in same semester
    existing_subject = db.query(Subject).filter(
        Subject.name == name,
        Subject.semester_id == subject_data.semester_id,
        Subject.user_id == current_user.id
    ).first()

    if existing_subject:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Subject already exists in this semester."
        )

    new_subject = Subject(
        name=name,
        daily_study_target=subject_data.daily_study_target,
        priority=subject_data.priority.value,
        semester_id=subject_data.semester_id,
        user_id=current_user.id
    )

    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)

    return new_subject


# =========================
# Get All Subjects
# =========================
@router.get(
    "/",
    response_model=list[SubjectResponse]
)
def get_subjects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return db.query(Subject).filter(
        Subject.user_id == current_user.id
    ).order_by(
        Subject.name.asc()
    ).all()


# =========================
# Get Single Subject
# =========================
@router.get(
    "/{subject_id}",
    response_model=SubjectResponse
)
def get_subject(
    subject_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    subject = db.query(Subject).filter(
        Subject.id == subject_id,
        Subject.user_id == current_user.id
    ).first()

    if subject is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subject not found."
        )

    return subject


# =========================
# Update Subject
# =========================
@router.patch(
    "/{subject_id}",
    response_model=SubjectResponse
)
def update_subject(
    subject_id: int,
    subject_data: SubjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    subject = db.query(Subject).filter(
        Subject.id == subject_id,
        Subject.user_id == current_user.id
    ).first()

    if subject is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subject not found."
        )

    update_data = subject_data.model_dump(
        exclude_unset=True
    )

    if "priority" in update_data:
        update_data["priority"] = update_data["priority"].value

    for key, value in update_data.items():
        setattr(subject, key, value)

    db.commit()
    db.refresh(subject)

    return subject


# =========================
# Delete Subject
# =========================
@router.delete(
    "/{subject_id}",
    status_code=status.HTTP_200_OK
)
def delete_subject(
    subject_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    subject = db.query(Subject).filter(
        Subject.id == subject_id,
        Subject.user_id == current_user.id
    ).first()

    if subject is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subject not found."
        )

    db.delete(subject)
    db.commit()

    return {
        "message": "Subject deleted successfully."
    }