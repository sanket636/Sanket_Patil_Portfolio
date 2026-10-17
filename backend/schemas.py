from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


ContactPurpose = Literal[
    "Job Opportunity",
    "Internship Opportunity",
    "Freelance Project",
    "Website Development",
    "AI/ML Project",
    "Data Analytics",
    "Data Engineering",
    "General Inquiry",
]


class ContactCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    mobile_number: str | None = Field(default=None, max_length=20)
    company_name: str | None = Field(default=None, max_length=150)
    purpose: ContactPurpose
    project_details: str | None = Field(default=None, max_length=5000)
    message: str = Field(min_length=10, max_length=5000)


class ContactResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    purpose: str
    created_at: str | None = None