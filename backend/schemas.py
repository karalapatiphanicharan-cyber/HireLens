from pydantic import BaseModel
from typing import List, Optional

class Education(BaseModel):
    degree: str
    university: str
    duration: str
    cgpa: str

class Project(BaseModel):
    title: str
    description: str

class ParsedData(BaseModel):
    name: str
    email: str
    phone: str
    skills: List[str]
    education: List[Education]
    experience: List[str]
    projects: List[Project]
    certifications: List[str]
    linkedin: str
    github: str
    portfolio: str

class UploadResponse(BaseModel):
    success: bool
    data: ParsedData

class AnalysisRequest(BaseModel):
    resume_data: ParsedData
    job_description: str

class AnalysisResponse(BaseModel):
    ats_score: int
    job_match_score: int
    matching_skills: List[str]
    missing_skills: List[str]
    suggestions: List[str]
