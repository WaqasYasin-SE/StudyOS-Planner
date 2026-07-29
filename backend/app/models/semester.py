from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Semester(Base):

    __tablename__ = "semesters"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    duration_weeks = Column(Integer, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"),nullable=False)

    user = relationship(
        "User",
        back_populates="semesters"
    )

    subjects = relationship(
        "Subject",
        back_populates="semester",
        cascade="all, delete-orphan"
    )