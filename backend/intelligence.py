from typing import List, Dict, Any

def calculate_strength(data: Dict[str, Any]) -> Dict[str, Any]:
    score = 0

    # Technical Skills (20)
    skills = data.get("skills", [])
    if len(skills) >= 10: score += 20
    elif len(skills) >= 5: score += 15
    elif len(skills) > 0: score += 10

    # Projects (20)
    projects = [p for p in data.get("projects", []) if p.get("title") != "Not Detected"]
    if len(projects) >= 3: score += 20
    elif len(projects) >= 1: score += 15

    # Experience (20)
    exp = [e for e in data.get("experience", []) if e != "Not Detected"]
    if len(exp) >= 2: score += 20
    elif len(exp) >= 1: score += 15

    # Certifications (15)
    certs = [c for c in data.get("certifications", []) if c != "Not Detected"]
    if len(certs) >= 2: score += 15
    elif len(certs) >= 1: score += 10

    # Professional Profiles (15)
    if data.get("linkedin") != "Not Detected": score += 7
    if data.get("github") != "Not Detected": score += 8

    # Education (10)
    edu = data.get("education", [])
    if edu and edu[0].get("degree") != "Not Detected": score += 10

    level = "Beginner"
    if score >= 85: level = "Strong Candidate"
    elif score >= 70: level = "Advanced"
    elif score >= 40: level = "Intermediate"

    return {"score": score, "level": level}

def get_career_recommendations(skills: List[str]) -> List[Dict[str, str]]:
    skills_lower = [s.lower() for s in skills]
    roles = []

    mappings = {
        "python": ["Python Developer Intern", "Data Analyst Intern"],
        "machine learning": ["ML Engineer Intern", "AI Researcher"],
        "react": ["Frontend Developer", "React Developer"],
        "javascript": ["Web Developer", "Fullstack Developer"],
        "sql": ["Database Administrator", "Data Engineer"],
        "fastapi": ["Backend Developer", "API Engineer"],
        "docker": ["DevOps Intern", "Cloud Engineer"]
    }

    for skill, recommended_roles in mappings.items():
        if skill in skills_lower:
            for role in recommended_roles:
                if role not in roles:
                    roles.append(role)

    # Default roles if no skills match
    if not roles:
        roles = ["Software Engineer Intern", "Junior Developer"]

    return [{"title": role} for role in roles[:4]]

def generate_roadmap(skills: List[str]) -> Dict[str, List[str]]:
    skills_lower = [s.lower() for s in skills]

    # Heuristic based on common stacks
    next_skills = []
    future_skills = []

    if "python" in skills_lower and "fastapi" not in skills_lower:
        next_skills.append("FastAPI")
    if "react" in skills_lower and "typescript" not in skills_lower:
        next_skills.append("TypeScript")
    if ("python" in skills_lower or "javascript" in skills_lower) and "docker" not in skills_lower:
        next_skills.append("Docker")
    if "docker" in skills_lower and "kubernetes" not in skills_lower:
        future_skills.append("Kubernetes")
    if "machine learning" in skills_lower:
        next_skills.append("PyTorch")
        future_skills.append("MLOps")
        future_skills.append("LLM Engineering")

    # Defaults
    if not next_skills: next_skills = ["System Design", "Cloud Basics"]
    if not future_skills: future_skills = ["AWS Certified Architect", "Microservices"]

    return {
        "current": skills[:5],
        "next": next_skills[:3],
        "future": future_skills[:3]
    }

def get_recruiter_insights(data: Dict[str, Any]) -> Dict[str, List[str]]:
    strengths = []
    weaknesses = []

    skills = data.get("skills", [])
    projects = [p for p in data.get("projects", []) if p.get("title") != "Not Detected"]
    certs = [c for c in data.get("certifications", []) if c != "Not Detected"]

    if len(skills) > 8: strengths.append("Strong technical foundation with diverse skill set")
    if len(projects) >= 2: strengths.append("Hands-on project experience in relevant domains")
    if certs: strengths.append("Committed to continuous learning through certifications")

    skills_lower = [s.lower() for s in skills]
    if "docker" not in skills_lower: weaknesses.append("Missing containerization skills (Docker)")
    if "aws" not in skills_lower: weaknesses.append("Missing cloud deployment experience (AWS/GCP)")
    if len(projects) < 2: weaknesses.append("Limited project portfolio")

    return {"strengths": strengths, "weaknesses": weaknesses}

def get_smart_recommendations(data: Dict[str, Any]) -> List[str]:
    recs = []
    skills_lower = [s.lower() for s in data.get("skills", [])]
    projects = [p for p in data.get("projects", []) if p.get("title") != "Not Detected"]

    if projects:
        recs.append("Add live deployment links to your top projects.")
    if "docker" not in skills_lower:
        recs.append("Learn Docker to containerize your applications for production.")
    if "aws" not in skills_lower and "azure" not in skills_lower:
        recs.append("Gain foundational knowledge in Cloud (AWS/Azure).")
    if len(projects) < 3:
        recs.append("Build a full-stack AI application to showcase end-to-end skills.")

    return recs[:4]
