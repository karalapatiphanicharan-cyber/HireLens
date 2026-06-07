from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
try:
    from .parser import parse_resume
    from .schemas import UploadResponse, ParsedData, AnalysisRequest, AnalysisResponse
    from .ats import calculate_ats_score
    from .matcher import calculate_job_match
    from .summarizer import generate_summary
    from .intelligence import calculate_strength, get_career_recommendations, generate_roadmap, get_recruiter_insights, get_smart_recommendations
    from .interviewer import (
        calculate_readiness, get_technical_questions, get_project_questions,
        get_hr_behavioral_questions, get_job_specific_questions, get_weak_areas, get_interview_roadmap
    )
except ImportError:
    from parser import parse_resume
    from schemas import UploadResponse, ParsedData, AnalysisRequest, AnalysisResponse
    from ats import calculate_ats_score
    from matcher import calculate_job_match
    from summarizer import generate_summary
    from intelligence import calculate_strength, get_career_recommendations, generate_roadmap, get_recruiter_insights, get_smart_recommendations
    from interviewer import (
        calculate_readiness, get_technical_questions, get_project_questions,
        get_hr_behavioral_questions, get_job_specific_questions, get_weak_areas, get_interview_roadmap
    )

app = FastAPI(title="HireLens API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "name": "HireLens API",
        "version": "1.0.0",
        "status": "running",
        "message": "HireLens AI Resume Analyzer API is running successfully",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/api/upload-resume", response_model=UploadResponse)
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are allowed.")

    try:
        content = await file.read()
        parsed_data = parse_resume(content, file.filename)

        return UploadResponse(
            success=True,
            data=ParsedData(**parsed_data)
        )
    except Exception as e:
        print(f"Error parsing resume: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to parse resume: {str(e)}")

@app.post("/api/analyze-resume", response_model=AnalysisResponse)
async def analyze_resume(request: AnalysisRequest):
    try:
        # Convert Pydantic model to dict for engine consumption
        resume_dict = request.resume_data.dict()

        # 1. Calculate ATS Score
        ats_result = calculate_ats_score(resume_dict)

        # 2. Calculate Job Match
        match_result = calculate_job_match(request.resume_data.skills, request.job_description)

        # Merge suggestions
        all_suggestions = ats_result["suggestions"] + match_result["suggestions"]

        hr_behavioral = get_hr_behavioral_questions(resume_dict)

        interview_prep = {
            "readiness": calculate_readiness(resume_dict, ats_result["ats_score"], match_result["job_match_score"]),
            "technical_questions": get_technical_questions(request.resume_data.skills),
            "project_questions": get_project_questions(resume_dict.get("projects", [])),
            "hr_questions": hr_behavioral["hr"],
            "behavioral_questions": hr_behavioral["behavioral"],
            "job_specific_questions": get_job_specific_questions(request.job_description, match_result["missing_skills"]),
            "weak_areas": get_weak_areas(all_suggestions, match_result["missing_skills"]),
            "success_roadmap": get_interview_roadmap(match_result["missing_skills"])
        }

        return AnalysisResponse(
            ats_score=ats_result["ats_score"],
            job_match_score=match_result["job_match_score"],
            matching_skills=match_result["matching_skills"],
            missing_skills=match_result["missing_skills"],
            suggestions=all_suggestions,
            summary=generate_summary(resume_dict),
            strength=calculate_strength(resume_dict),
            recommendations=get_career_recommendations(request.resume_data.skills),
            roadmap=generate_roadmap(request.resume_data.skills),
            insights=get_recruiter_insights(resume_dict),
            smart_recs=get_smart_recommendations(resume_dict),
            interview_prep=interview_prep
        )
    except Exception as e:
        print(f"Error analyzing resume: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to analyze resume: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
