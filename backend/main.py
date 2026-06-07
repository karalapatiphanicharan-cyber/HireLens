from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
try:
    from .parser import parse_resume
    from .schemas import UploadResponse, ParsedData
except ImportError:
    from parser import parse_resume
    from schemas import UploadResponse, ParsedData

app = FastAPI(title="HireLens API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
