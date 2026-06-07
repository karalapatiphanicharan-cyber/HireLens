# HireLens — AI Resume Intelligence Platform

HireLens is a full-stack AI-powered Resume Analysis Platform that helps candidates evaluate, optimize, and improve their resumes using ATS scoring, job matching, skill-gap analysis, recruiter insights, interview preparation, and downloadable reports.

## Live Demo

Frontend:
https://hire-lens-bice.vercel.app

Backend API:
https://hirelens-api-ex0c.onrender.com

API Documentation:
https://hirelens-api-ex0c.onrender.com/docs

---

## Features

### Resume Parsing
- Upload PDF and DOCX resumes
- Extract:
  - Name
  - Email
  - Phone
  - Skills
  - Education
  - Experience
  - Projects
  - Certifications
  - LinkedIn
  - GitHub

### ATS Resume Analysis
- Realistic ATS scoring
- Resume quality evaluation
- Keyword coverage analysis
- Missing section detection
- Recruiter readiness insights

### Job Match Analysis
- Paste any Job Description
- Match Score calculation
- Matching Skills detection
- Missing Skills identification
- Improvement recommendations

### AI Resume Intelligence
- AI-generated resume summary
- Resume strength evaluation
- Candidate level assessment
- Career roadmap generation
- Recruiter insights

### Interview Preparation
- Technical Interview Questions
- Behavioral Questions
- HR Interview Questions
- Situational Questions
- Problem Solving Questions

### Smart Recommendations
- Resume-specific suggestions
- Skill improvement recommendations
- Project enhancement guidance
- Career growth roadmap

### PDF Report Generation
- Download complete analysis report
- ATS score summary
- Job match insights
- Recommendations
- Resume intelligence report

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React

### Backend
- FastAPI
- Python
- Uvicorn
- PyPDF2
- PDFPlumber
- Python-docx

### Deployment
- Frontend: Vercel
- Backend: Render
- Source Control: GitHub

---

## Project Architecture

```text
Frontend (React + Vite)
        |
        |
        v
Backend (FastAPI)
        |
        |
        v
Resume Parser
        |
        |
        +------ ATS Engine
        |
        +------ Job Matching Engine
        |
        +------ Resume Intelligence Engine
        |
        +------ Interview Generator
        |
        +------ PDF Report Generator
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/karalapatiphanicharan-cyber/HireLens.git
cd HireLens
```

### Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

## Environment Variables

Create:

```text
.env
```

Frontend:

```env
VITE_API_URL=http://localhost:8000
```

Production:

```env
VITE_API_URL=https://hirelens-api-ex0c.onrender.com
```

---

## API Endpoints

### Health Check

```http
GET /health
```

### Upload Resume

```http
POST /api/upload-resume
```

### API Information

```http
GET /
```

### Swagger Documentation

```http
GET /docs
```

---

## Screenshots

### Landing Page
- Premium dark theme
- Liquid glass inspired UI
- Responsive design

### Resume Analysis
- ATS Score
- Job Match Score
- Skills Intelligence
- Recruiter Insights

### Interview Preparation
- Technical Questions
- Behavioral Questions
- HR Questions

---

## Future Improvements

- OpenAI Integration
- Gemini Integration
- Resume Rewrite Suggestions
- Cover Letter Generator
- Multi Resume Comparison
- Recruiter Dashboard
- Authentication System
- Resume Version Tracking

---

## Author

K. Sri Phani Charan

GitHub:
https://github.com/karalapatiphanicharan-cyber

LinkedIn:
https://linkedin.com/in/phani-charan

---

## License

MIT License

---

⭐ If you found this project useful, consider giving it a star.
