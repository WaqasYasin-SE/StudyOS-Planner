from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    ForeignKey
)
from sqlalchemy.orm import relationship

from app.database import Base


class Task(Base):

    __tablename__ = "tasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    deadline = Column(
        Date,
        nullable=True
    )

    priority = Column(
        String,
        default="Medium",
        nullable=False
    )

    status = Column(
        String,
        default="Not Started",
        nullable=False
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
        back_populates="tasks"
    )

    user = relationship(
        "User",
        back_populates="tasks"
    )