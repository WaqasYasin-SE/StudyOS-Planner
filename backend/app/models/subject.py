from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Subject(Base):

    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    daily_study_target = Column(
        Integer,
        nullable=False
    )

    priority = Column(
        String,
        default="Medium",
        nullable=False
    )

    semester_id = Column(
        Integer,
        ForeignKey("semesters.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    semester = relationship(
        "Semester",
        back_populates="subjects"
    )

    user = relationship(
        "User",
        back_populates="subjects"
    )

    tasks = relationship(
        "Task",
        back_populates="subject",
        cascade="all, delete-orphan"
    )

    study_sessions = relationship(
        "StudySession",
        back_populates="subject",
        cascade="all, delete-orphan"
    )