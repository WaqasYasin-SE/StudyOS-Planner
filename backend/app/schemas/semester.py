from pydantic import BaseModel


class SemesterCreate(BaseModel):
    name: str
    duration_weeks: int


class SemesterUpdate(BaseModel):
    name: str | None = None
    duration_weeks: int | None = None


class SemesterResponse(BaseModel):
    id: int
    name: str
    duration_weeks: int
    user_id: int

    class Config:
        from_attributes = True