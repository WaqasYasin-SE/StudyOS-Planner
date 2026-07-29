from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth
from app.routers import semester
from app.routers import subject
from app.routers import tasks
from app.routers import study_session
from app.routers import dashboard
from app.routers import analytics


app = FastAPI(
    title="StudySprint API"
)

# ==========================
# CORS Configuration
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Routers
# ==========================

app.include_router(auth.router)
app.include_router(semester.router)
app.include_router(subject.router)
app.include_router(tasks.router)
app.include_router(study_session.router)
app.include_router(dashboard.router)
app.include_router(analytics.router)

# ==========================
# Home Route
# ==========================

@app.get("/")
def home():
    return {
        "message": "StudySprint Backend Running"
    }