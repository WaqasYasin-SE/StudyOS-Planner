from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship

from app.database import Base


class StudySession(Base):

    __tablename__ = "study_sessions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    duration_minutes = Column(
        Integer,
        nullable=False
    )

    started_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=True
    )

    ended_at = Column(
        DateTime,
        nullable=True
    )

    subject_id = Column(
        Integer,
        ForeignKey("subjects.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    subject = relationship(
        "Subject",
        back_populates="study_sessions"
    )

    user = relationship(
        "User",
        back_populates="study_sessions"
    )