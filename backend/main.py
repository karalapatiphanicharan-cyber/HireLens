from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
try:
    from .parser import parse_resume
    from .schemas import UploadResponse, ParsedData, AnalysisRequest, AnalysisResponse
    from .ats import calculate_ats_score
    from .matcher import calculate_job_match
except ImportError:
    from parser import parse_resume
    from schemas import UploadResponse, ParsedData, AnalysisRequest, AnalysisResponse
    from ats import calculate_ats_score
    from matcher import calculate_job_match

app = FastAPI(title="HireLens API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

        return AnalysisResponse(
            ats_score=ats_result["ats_score"],
            job_match_score=match_result["job_match_score"],
            matching_skills=match_result["matching_skills"],
            missing_skills=match_result["missing_skills"],
            suggestions=all_suggestions
        )
    except Exception as e:
        print(f"Error analyzing resume: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to analyze resume: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
