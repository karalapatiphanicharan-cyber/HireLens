from typing import List, Dict, Any, Optional
import re

def calculate_readiness(data: Dict[str, Any], ats_score: int, job_match_score: int) -> Dict[str, Any]:
    # Weights for readiness
    # ATS: 20, Job Match: 20, Skills: 20, Projects: 20, Experience: 10, Certs: 10

    score = (ats_score * 0.2) + (job_match_score * 0.2)

    skills = data.get("skills", [])
    if len(skills) >= 8: score += 20
    elif len(skills) >= 5: score += 15
    elif len(skills) > 0: score += 10

    projects = [p for p in data.get("projects", []) if p.get("title") != "Not Detected"]
    if len(projects) >= 2: score += 20
    elif len(projects) == 1: score += 15

    exp = [e for e in data.get("experience", []) if e != "Not Detected"]
    if exp: score += 10

    certs = [c for c in data.get("certifications", []) if c != "Not Detected"]
    if len(certs) >= 2: score += 10
    elif len(certs) == 1: score += 5

    score = int(min(100, score))

    level = "Needs Preparation"
    if score >= 86: level = "Strong Candidate"
    elif score >= 71: level = "Interview Ready"
    elif score >= 51: level = "Developing Candidate"

    return {
        "score": score,
        "level": level,
        "explanation": f"Based on your profile strength of {score}%, you are classified as a {level}. " +
                      "Focus on the recommended topics below to boost your confidence."
    }

def get_technical_questions(skills: List[str]) -> List[Dict[str, Any]]:
    questions_db = {
        "python": [
            {"question": "Difference between List and Tuple?", "topics": ["Immutability", "Memory", "Methods"]},
            {"question": "What are Decorators in Python?", "topics": ["Higher-order functions", "Wrappers", "@syntax"]},
            {"question": "Explain Multithreading vs Multiprocessing in Python.", "topics": ["GIL", "CPU-bound vs I/O-bound", "Processes"]}
        ],
        "machine learning": [
            {"question": "What is Overfitting and how to prevent it?", "topics": ["Regularization", "Cross-validation", "Dropout"]},
            {"question": "Explain Bias vs Variance tradeoff.", "topics": ["Complexity", "Error analysis", "Underfitting"]},
            {"question": "Difference between Random Forest and XGBoost.", "topics": ["Bagging vs Boosting", "Trees", "Parallelism"]}
        ],
        "sql": [
            {"question": "Difference between WHERE and HAVING clauses.", "topics": ["Aggregation", "Filtering", "Group By"]},
            {"question": "Explain different types of Joins in SQL.", "topics": ["Inner", "Outer", "Left/Right"]},
            {"question": "Explain SQL Indexing and its importance.", "topics": ["Search optimization", "B-Trees", "Performance"]}
        ],
        "react": [
            {"question": "What are React Hooks and why use them?", "topics": ["useState", "useEffect", "Functional components"]},
            {"question": "Explain the Virtual DOM.", "topics": ["Reconciliation", "Rendering", "Diffing algorithm"]},
            {"question": "How to handle state management in large React apps?", "topics": ["Redux", "Context API", "Zustand"]}
        ],
        "fastapi": [
            {"question": "What are the advantages of FastAPI over Flask?", "topics": ["Pydantic", "Asynchronous", "Speed"]},
            {"question": "Explain Dependency Injection in FastAPI.", "topics": ["Depends", "Modularity", "Security"]},
            {"question": "How does FastAPI handle validation?", "topics": ["Pydantic", "Type hints", "JSON Schema"]}
        ],
        "docker": [
            {"question": "Difference between a Docker Image and a Container.", "topics": ["Read-only layer", "Running instance", "Registry"]},
            {"question": "What is Docker Compose used for?", "topics": ["Multi-container", "YAML", "Orchestration"]},
            {"question": "Explain the difference between a VM and a Container.", "topics": ["Hypervisor", "Kernel sharing", "Isolation"]}
        ],
        "javascript": [
            {"question": "What is Closure in JavaScript?", "topics": ["Scope", "Lexical environment", "Inner functions"]},
            {"question": "Explain Promises and Async/Await.", "topics": ["Event loop", "Callbacks", "Non-blocking"]},
            {"question": "Difference between == and ===.", "topics": ["Type coercion", "Strict equality", "Values"]}
        ]
    }

    results = []
    skills_lower = [s.lower() for s in skills]

    for skill, q_list in questions_db.items():
        if skill in skills_lower:
            results.extend(q_list)

    # Default general tech questions if no skills match
    if not results:
        results = [
            {"question": "What is an API?", "topics": ["REST", "Endpoints", "JSON"]},
            {"question": "Explain Git version control.", "topics": ["Commits", "Branches", "Merges"]}
        ]

    return results[:12] # Limit to 12 questions

def get_project_questions(projects: List[Dict[str, str]]) -> List[Dict[str, Any]]:
    results = []
    for proj in projects:
        title = proj.get("title", "")
        if title == "Not Detected": continue

        desc = proj.get("description", "").lower()

        # Generic project questions
        results.append({
            "question": f"In your project '{title}', explain the overall system architecture.",
            "topics": ["Layers", "Technologies", "Data flow"]
        })

        if "rag" in desc or "llm" in desc or "ai" in desc:
            results.append({
                "question": f"Regarding '{title}', why did you choose RAG over fine-tuning?",
                "topics": ["Context window", "Accuracy", "Real-time data"]
            })
            results.append({
                "question": f"How did you handle chunking and embeddings in '{title}'?",
                "topics": ["Chunk size", "Overlap", "Vector DB"]
            })

        if "ml" in desc or "machine learning" in desc or "recommendation" in desc:
            results.append({
                "question": f"Which ML algorithm did you use for '{title}' and why?",
                "topics": ["Performance", "Complexity", "Baseline"]
            })
            results.append({
                "question": f"How did you measure the performance of '{title}'?",
                "topics": ["Metrics", "Precision/Recall", "F1 Score"]
            })

        if "react" in desc or "frontend" in desc:
            results.append({
                "question": f"What was the most challenging UI part in '{title}'?",
                "topics": ["State", "Responsiveness", "Components"]
            })

    return results[:8]

def get_hr_behavioral_questions(data: Dict[str, Any]) -> Dict[str, List[Dict[str, Any]]]:
    name = data.get("name", "candidate")

    hr = [
        {"question": f"Hi {name}, tell me about yourself and your background.", "topics": ["Education", "Key Projects", "Career Goals"]},
        {"question": "Walk me through your resume and highlight your best work.", "topics": ["Structure", "Impact", "Growth"]},
        {"question": "Why should we hire you for this specific role?", "topics": ["Unique value", "Problem solving", "Alignment"]},
        {"question": "What are your greatest professional strengths and weaknesses?", "topics": ["Self-awareness", "Improvement", "Honesty"]}
    ]

    behavioral = [
        {"question": "Tell me about a time you faced a difficult technical challenge.", "topics": ["STAR method", "Resolution", "Learnings"]},
        {"question": "Describe a situation where you had to work in a diverse team.", "topics": ["Collaboration", "Communication", "Soft skills"]},
        {"question": "How do you handle tight deadlines and project pressure?", "topics": ["Prioritization", "Planning", "Focus"]},
        {"question": "Tell me about a conflict you had with a teammate and how you resolved it.", "topics": ["Empathy", "Professionalism", "Mediation"]}
    ]

    return {"hr": hr, "behavioral": behavioral}

def get_job_specific_questions(jd: str, missing_skills: List[str]) -> List[Dict[str, Any]]:
    if not jd: return []

    results = []
    # If Docker in JD but missing in resume
    if "docker" in jd.lower() and any("docker" in s.lower() for s in missing_skills):
        results.append({"question": "The role requires Docker. Explain what Docker containers are.", "topics": ["Isolation", "Images", "Portability"]})

    if "cloud" in jd.lower() or "aws" in jd.lower():
        results.append({"question": "Can you explain the benefits of cloud computing for this role?", "topics": ["Scalability", "Cost", "Availability"]})

    if "api" in jd.lower() or "rest" in jd.lower():
        results.append({"question": "Explain how you would design a scalable REST API.", "topics": ["Endpoints", "Security", "Versioning"]})

    return results[:4]

def get_weak_areas(ats_suggestions: List[str], missing_skills: List[str]) -> List[str]:
    weak_areas = []
    for skill in missing_skills[:4]:
        weak_areas.append(f"Technical gap in {skill}")

    for sugg in ats_suggestions:
        if "missing" in sugg.lower() or "add" in sugg.lower():
            weak_areas.append(sugg)

    if not weak_areas:
        weak_areas = ["No significant weak areas detected. Focus on advanced concepts."]

    return weak_areas[:5]

def get_interview_roadmap(missing_skills: List[str]) -> Dict[str, List[str]]:
    # Based on intelligence.py roadmap but focused on interview prep
    immediate = []
    short_term = []
    long_term = []

    if missing_skills:
        immediate = missing_skills[:2]
        short_term = missing_skills[2:4]

    if not immediate: immediate = ["Mock Interviews", "Core Fundamentals"]
    if not short_term: short_term = ["System Design", "Advanced DSA"]

    long_term = ["Full-stack Deployment", "Open Source Contribution", "Leadership skills"]

    return {
        "current": immediate,
        "next": short_term,
        "future": long_term
    }
