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

class StrengthAnalysis(BaseModel):
    score: int
    level: str

class Roadmap(BaseModel):
    current: List[str]
    next: List[str]
    future: List[str]

class RecruiterInsights(BaseModel):
    strengths: List[str]
    weaknesses: List[str]

class CareerRole(BaseModel):
    title: str

class InterviewQuestion(BaseModel):
    question: str
    topics: List[str]

class InterviewReadiness(BaseModel):
    score: int
    level: str
    explanation: str

class InterviewPrep(BaseModel):
    readiness: InterviewReadiness
    technical_questions: List[InterviewQuestion]
    project_questions: List[InterviewQuestion]
    hr_questions: List[InterviewQuestion]
    behavioral_questions: List[InterviewQuestion]
    job_specific_questions: List[InterviewQuestion]
    weak_areas: List[str]
    success_roadmap: Roadmap

class AnalysisResponse(BaseModel):
    ats_score: int
    job_match_score: int
    matching_skills: List[str]
    missing_skills: List[str]
    suggestions: List[str]
    # Phase 4
    summary: Optional[str] = None
    strength: Optional[StrengthAnalysis] = None
    recommendations: Optional[List[CareerRole]] = None
    roadmap: Optional[Roadmap] = None
    insights: Optional[RecruiterInsights] = None
    smart_recs: Optional[List[str]] = None
    # Phase 5
    interview_prep: Optional[InterviewPrep] = None
