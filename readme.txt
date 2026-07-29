# 📚 StudySprint

StudySprint is a full-stack student productivity application designed to help students organize their academic life. It allows users to manage semesters, subjects, study tasks, and study sessions while tracking their overall learning progress through an interactive dashboard and analytics.

## ✨ Features

* 🔐 User Authentication (JWT)
* 📅 Semester Management
* 📖 Subject Management
* ✅ Task Management
* ⏱️ Study Session Tracking
* 📊 Dashboard & Analytics
* 🎯 Study Progress Monitoring
* 📱 Responsive React Frontend
* ⚡ FastAPI REST API Backend

## 🛠️ Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication
* Pydantic
* Python

### Frontend

* React
* Vite
* Axios
* CSS

## 📂 Project Structure

```
StudySprint/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

## 🚀 Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment and install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file and configure your PostgreSQL database connection.

Run the backend:

```bash
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📸 Screens

* Login
* Register
* Dashboard
* Semester Management
* Subject Management
* Task Management
* Study Sessions
* Analytics

## 🎯 Future Improvements

* AI-powered study recommendations
* Smart daily planner
* Calendar integration
* Email reminders
* Pomodoro timer
* Progress predictions
* Mobile application

## 👨‍💻 Author

**Waqas Gill**

Software Engineering Student | Python Backend Developer | React Developer | PostgreSQL | FastAPI
