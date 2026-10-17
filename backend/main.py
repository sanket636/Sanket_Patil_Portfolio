from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import ContactMessage
from schemas import ContactCreate

app = FastAPI(title="Sanket Patil Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Sanket Portfolio API is running"}


@app.get("/health/database")
def database_health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {"database": "connected"}

    except SQLAlchemyError:
        raise HTTPException(
            status_code=503,
            detail="Database connection unavailable",
        )


@app.post("/contact", status_code=201)
def create_contact(
    payload: ContactCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    # A production deployment must also enforce rate limiting
    # and spam protection at the server or hosting layer.

    contact = ContactMessage(
        full_name=payload.full_name.strip(),
        email=str(payload.email),
        mobile_number=payload.mobile_number,
        company_name=payload.company_name,
        purpose=payload.purpose,
        project_details=payload.project_details,
        message=payload.message.strip(),
    )

    try:
        db.add(contact)
        db.commit()
        db.refresh(contact)

        return {
            "success": True,
            "message": "Your message has been saved successfully.",
            "id": contact.id,
        }

    except SQLAlchemyError:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Unable to save your message. Please try again later.",
        )