from fastapi import APIRouter, Depends, HTTPException,status    
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.semester import Semester
from app.models.user import User
from app.schemas.semester import (
    SemesterCreate,
    SemesterResponse,
    SemesterUpdate
)


router = APIRouter(
    prefix="/semesters",
    tags=["Semesters"]
)


# Create Semester
@router.post(
    "/",
    response_model=SemesterResponse,
    status_code=status.HTTP_201_CREATED 
)
def create_semester(
    semester: SemesterCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_semester = Semester(
        name=semester.name,
        duration_weeks=semester.duration_weeks,
        user_id=current_user.id
    )

    db.add(new_semester)
    db.commit()
    db.refresh(new_semester)

    return new_semester


# Get All Semesters
@router.get(
    "/",
    response_model=list[SemesterResponse]
)
def get_semesters(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    semesters = db.query(Semester).filter(
        Semester.user_id == current_user.id
    ).all()

    return semesters

#Get one smester
@router.get(
    "/{semester_id}",
    response_model=SemesterResponse
)
def get_semester(
    semester_id:int,
    db:Session=Depends(get_db),
    current_user:User = Depends(get_current_user)
):
    semester=db.query(Semester).filter(
        Semester.id == semester_id,
        Semester.user_id ==current_user.id
    ).first()
    
    if semester is None:
        
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Semester not found."
        )
    return semester


#update semester
@router.patch(
    "/{semester_id}",
    response_model=SemesterResponse
)
def update_semester(
    semester_id: int,
    semester_data: SemesterUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    semester = db.query(Semester).filter(
        Semester.id == semester_id,
        Semester.user_id == current_user.id
    ).first()

    if semester is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Semester not found."
        )

    if semester_data.name is not None:
        semester.name = semester_data.name

    if semester_data.duration_weeks is not None:
        semester.duration_weeks = semester_data.duration_weeks

    db.commit()
    db.refresh(semester)

    return semester

# Delete Semester
@router.delete(
    "/{semester_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_semester(
    semester_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    semester = db.query(Semester).filter(
        Semester.id == semester_id,
        Semester.user_id == current_user.id
    ).first()

    if semester is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Semester not found."
        )

    db.delete(semester)

    db.commit()

    return None