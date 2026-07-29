from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY not found")