from pydantic import BaseModel
from typing import List, Optional

class ParsedData(BaseModel):
    name: str
    email: str
    phone: str
    skills: List[str]
    education: List[str]
    experience: List[str]
    projects: List[str]
    certifications: List[str]
    linkedin: str
    github: str
    portfolio: str

class UploadResponse(BaseModel):
    success: bool
    data: ParsedData
