from typing import List, Dict, Any
import re

def calculate_ats_score(data: Dict[str, Any]) -> Dict[str, Any]:
    score = 0
    breakdown = {}
    suggestions = []

    # 1. Contact Information (15)
    contact_score = 0
    if data.get("name") and data.get("name") != "Not Detected":
        contact_score += 5
    if data.get("email") and data.get("email") != "Not Detected":
        contact_score += 5
    if data.get("phone") and data.get("phone") != "Not Detected":
        contact_score += 5
    score += contact_score
    breakdown["Contact Information"] = f"{contact_score}/15"
    if contact_score < 15:
        suggestions.append("Ensure your name, email, and phone number are clearly visible.")

    # 2. Skills (15)
    skills = data.get("skills", [])
    skills_score = 0
    if len(skills) >= 8:
        skills_score = 15
    elif len(skills) >= 5:
        skills_score = 10
    elif len(skills) > 0:
        skills_score = 5
    score += skills_score
    breakdown["Skills"] = f"{skills_score}/15"
    if len(skills) < 8:
        suggestions.append("Add at least 8+ technical skills to demonstrate expertise.")

    # 3. Education (10)
    edu = data.get("education", [])
    edu_score = 0
    if edu and edu[0].get("degree") != "Not Detected":
        edu_score += 5
    if edu and edu[0].get("university") != "Not Detected":
        edu_score += 5
    score += edu_score
    breakdown["Education"] = f"{edu_score}/10"
    if edu_score < 10:
        suggestions.append("Clearly list your degree and institution.")

    # 4. Projects (20)
    projects = data.get("projects", [])
    valid_projects = [p for p in projects if p.get("title") != "Not Detected"]
    project_score = 0
    if len(valid_projects) >= 3:
        project_score = 15
    elif len(valid_projects) > 0:
        project_score = 10

    # Evaluate project description quality
    has_strong_desc = True
    for p in valid_projects:
        desc = p.get("description", "")
        if len(desc.split()) < 10:
            has_strong_desc = False
            break

    if has_strong_desc and len(valid_projects) > 0:
        project_score += 5

    score += project_score
    breakdown["Projects"] = f"{project_score}/20"
    if len(valid_projects) < 3:
        suggestions.append("Include at least 3 technical projects.")
    if not has_strong_desc:
        suggestions.append("Strengthen project descriptions with more technical details and impact.")

    # 5. Experience (15)
    exp = data.get("experience", [])
    exp_score = 0
    if exp and exp[0] != "Not Detected":
        # Check if there is actual content beyond just the header
        full_exp_text = " ".join(exp)
        if len(full_exp_text.split()) > 5:
            exp_score = 15
    score += exp_score
    breakdown["Experience"] = f"{exp_score}/15"
    if exp_score < 15:
        suggestions.append("Highlight internships, work experience, or research positions.")

    # 6. Certifications (10)
    certs = data.get("certifications", [])
    valid_certs = [c for c in certs if c != "Not Detected"]
    cert_score = 0
    if len(valid_certs) >= 2:
        cert_score = 10
    elif len(valid_certs) == 1:
        cert_score = 5
    score += cert_score
    breakdown["Certifications"] = f"{cert_score}/10"
    if len(valid_certs) < 2:
        suggestions.append("Add 2 or more professional certifications.")

    # 7 & 8. Links (LinkedIn & GitHub) (5 each)
    li_score = 5 if data.get("linkedin") != "Not Detected" else 0
    gh_score = 5 if data.get("github") != "Not Detected" else 0
    score += li_score + gh_score
    breakdown["LinkedIn"] = f"{li_score}/5"
    breakdown["GitHub"] = f"{gh_score}/5"
    if li_score == 0: suggestions.append("Add your LinkedIn profile.")
    if gh_score == 0: suggestions.append("Include your GitHub link to showcase projects.")

    # 9. Resume Content Quality (5)
    # Simple heuristic: average word count of sections and action verbs
    quality_score = 0
    all_text = str(data).lower()
    action_verbs = ["developed", "implemented", "managed", "created", "designed", "optimized", "built", "engineered", "led"]
    verb_count = sum(1 for verb in action_verbs if verb in all_text)
    if verb_count >= 5:
        quality_score += 3
    if len(all_text.split()) > 200:
        quality_score += 2
    score += quality_score
    breakdown["Content Quality"] = f"{quality_score}/5"
    if quality_score < 5:
        suggestions.append("Improve resume quality with action verbs and detailed content.")

    # 10. Keyword Density (5)
    # Heuristic: ratio of technical skills to total content
    keyword_score = 0
    if len(skills) >= 10:
        keyword_score = 5
    elif len(skills) >= 5:
        keyword_score = 3
    score += keyword_score
    breakdown["Keyword Density"] = f"{keyword_score}/5"
    if keyword_score < 5:
        suggestions.append("Optimize for ATS by including more relevant industry keywords.")

    # Additional Deductions
    if data.get("linkedin") == "Not Detected": score -= 2
    if data.get("github") == "Not Detected": score -= 2
    if len(valid_projects) < 3: score -= 3
    if len(skills) < 5: score -= 5
    if len(valid_certs) < 2: score -= 2

    # Cap score
    score = max(0, min(100, score))

    # If student profile (heuristic: education present but experience sparse)
    is_student = edu_score > 0 and exp_score < 15
    if is_student and score > 95:
        score = 94 # Students rarely hit 95+ without massive experience

    return {
        "ats_score": score,
        "breakdown": breakdown,
        "suggestions": suggestions
    }
