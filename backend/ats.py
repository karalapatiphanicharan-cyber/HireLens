from typing import List, Dict, Any
import re

def calculate_ats_score(data: Dict[str, Any]) -> Dict[str, Any]:
    score = 0
    breakdown = {}
    suggestions = []

    # 1. Contact Information (15)
    contact_score = 0
    if data.get("name") and data.get("name") != "Not Detected": contact_score += 5
    if data.get("email") and data.get("email") != "Not Detected": contact_score += 5
    if data.get("phone") and data.get("phone") != "Not Detected": contact_score += 5
    score += contact_score
    breakdown["Contact Information"] = f"{contact_score}/15"

    # 2. Skills (15)
    skills = data.get("skills", [])
    skills_score = 0
    if len(skills) >= 8: skills_score = 15
    elif len(skills) >= 5: skills_score = 10
    elif len(skills) > 0: skills_score = 5
    score += skills_score
    breakdown["Skills"] = f"{skills_score}/15"

    # 3. Education (10)
    edu = data.get("education", [])
    edu_score = 0
    if edu and edu[0].get("degree") != "Not Detected": edu_score += 5
    if edu and edu[0].get("university") != "Not Detected": edu_score += 5
    score += edu_score
    breakdown["Education"] = f"{edu_score}/10"

    # 4. Projects (20)
    projects = [p for p in data.get("projects", []) if p.get("title") != "Not Detected"]
    project_score = 0
    if len(projects) >= 3: project_score = 15
    elif len(projects) >= 1: project_score = 10

    has_strong_desc = all(len(p.get("description", "").split()) > 12 for p in projects)
    if has_strong_desc and projects: project_score += 5

    score += project_score
    breakdown["Projects"] = f"{project_score}/20"

    # 5. Experience (15)
    exp = [e for e in data.get("experience", []) if e != "Not Detected"]
    exp_score = 0
    if exp:
        full_text = " ".join(exp)
        if len(full_text.split()) > 10: exp_score = 15
        elif len(full_text.split()) > 0: exp_score = 10
    score += exp_score
    breakdown["Experience"] = f"{exp_score}/15"

    # 6. Certifications (10)
    certs = [c for c in data.get("certifications", []) if c != "Not Detected"]
    cert_score = 0
    if len(certs) >= 2: cert_score = 10
    elif len(certs) >= 1: cert_score = 5
    score += cert_score
    breakdown["Certifications"] = f"{cert_score}/10"

    # 7. LinkedIn (5)
    li_score = 5 if data.get("linkedin") != "Not Detected" else 0
    score += li_score
    breakdown["LinkedIn"] = f"{li_score}/5"

    # 8. GitHub (5)
    gh_score = 5 if data.get("github") != "Not Detected" else 0
    score += gh_score
    breakdown["GitHub"] = f"{gh_score}/5"

    # 9. Content Quality (5)
    quality_score = 0
    all_text = str(data).lower()
    action_verbs = ["developed", "implemented", "managed", "designed", "optimized", "built", "engineered", "led"]
    if sum(1 for v in action_verbs if v in all_text) >= 5: quality_score += 3
    if len(all_text.split()) > 250: quality_score += 2
    score += quality_score
    breakdown["Content Quality"] = f"{quality_score}/5"

    # 10. Keyword Density (5)
    keyword_score = 0
    if len(skills) >= 10: keyword_score = 5
    elif len(skills) >= 5: keyword_score = 3
    score += keyword_score
    breakdown["Keyword Density"] = f"{keyword_score}/5"

    # DEDUCTIONS
    deductions = 0
    if data.get("portfolio") == "Not Detected":
        deductions += 2
        suggestions.append("Add a portfolio website link to showcase your work.")

    # Check for deployment links in projects
    has_deploy = "http" in "".join([p.get("description", "").lower() for p in projects])
    if not has_deploy:
        deductions += 3
        suggestions.append("Add live deployment links to your projects.")

    # Check for cloud skills
    cloud_keywords = ["aws", "azure", "gcp", "cloud", "docker", "kubernetes"]
    if not any(k in all_text for k in cloud_keywords):
        deductions += 5
        suggestions.append("Include cloud technologies (AWS, Docker, etc.) to your profile.")

    # Check for advanced certifications
    advanced_keywords = ["certified", "associate", "professional", "practitioner"]
    if not any(k in "".join(certs).lower() for k in advanced_keywords):
        deductions += 2
        suggestions.append("Earn advanced professional certifications.")

    if not has_strong_desc:
        deductions += 3
        suggestions.append("Strengthen project descriptions with more impact-focused bullet points.")

    score -= deductions
    score = max(0, min(100, score))

    # Realistic student cap
    is_student = edu_score > 0 and exp_score < 15
    if is_student and score > 95: score = 94

    # Generic suggestions based on missing sections
    if contact_score < 15: suggestions.append("Ensure your name, email, and phone are present.")
    if len(skills) < 8: suggestions.append("Add at least 8+ technical skills.")
    if project_score < 20: suggestions.append("Include 3+ technical projects with deep descriptions.")
    if cert_score < 10: suggestions.append("Add 2+ relevant professional certifications.")

    return {
        "ats_score": int(score),
        "breakdown": breakdown,
        "suggestions": list(set(suggestions))
    }
