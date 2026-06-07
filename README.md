# HireLens — AI Resume Intelligence Platform

HireLens is a production-quality AI-powered Resume Analyzer, ATS Optimizer, and Job Match Platform designed for modern candidates and recruiters. It transforms static resumes into actionable professional intelligence.

## 🚀 Key Features

- **Resume Parsing**: Instantly extract skills, education, and experience from PDF/DOCX files.
- **ATS Score Analysis**: Get detailed feedback on how well your resume performs against Applicant Tracking Systems.
- **Job Match Analysis**: Compare your profile against job descriptions with semantic matching scores.
- **Skill Gap Detection**: Identify missing competencies required for your target roles.
- **AI Resume Summary**: Generate professional executive summaries automatically.
- **Interview Preparation**: Get personalized technical, behavioral, and situational questions based on your background.
- **PDF Report Export**: Download comprehensive analysis reports for recruiters or personal tracking.
- **Recruiter Insights**: Executive-level assessment of candidate hiring readiness.

## 🛠 Tech Stack

### Frontend
- **React 19** with **TypeScript**
- **Vite** for lightning-fast builds
- **Tailwind CSS v4** for modern styling
- **Framer Motion** for premium animations
- **Lucide React** for consistent iconography
- **jsPDF** for professional report generation

### Backend
- **FastAPI** (Python)
- **PyMuPDF** & **python-docx** for robust parsing
- **spaCy** (Natural Language Processing)
- **Pydantic** for strict data validation

## 📦 Installation & Local Setup

### Prerequisites
- Node.js (v18+)
- Python (3.9+)

### Frontend Setup
1. Navigate to the project root:
   ```bash
   npm install
   npm run dev
   ```
2. The frontend will be available at `http://localhost:5173`.

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   python main.py
   ```
2. The API will be available at `http://localhost:8000`.

## 🏗 Architecture

HireLens follows a decoupled architecture:
1. **Intelligence Engine (Backend)**: Processes raw documents using NLP to extract entities and calculate alignment scores.
2. **Interactive UI (Frontend)**: A high-fidelity, "Liquid Glass" inspired dashboard that visualizes data and handles report generation locally.

## 🚢 Deployment

### Frontend (Vercel)
- The project is configured for one-click deployment on Vercel.
- Ensure `VITE_API_URL` environment variable points to your deployed backend.

### Backend (Render/Heroku)
- Use the provided `requirements.txt`.
- Set `PYTHON_VERSION` to 3.9 or higher.

## 🗺 Roadmap
- [ ] Multi-resume comparison dashboard
- [ ] Real-time LinkedIn profile optimization
- [ ] Integration with major job boards (Indeed, LinkedIn API)
- [ ] Team collaboration features for recruiters

## 📄 License
MIT License - Copyright (c) 2024 HireLens
