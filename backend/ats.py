from typing import List, Dict, Any

def calculate_ats_score(data: Dict[str, Any]) -> Dict[str, Any]:
    score = 0
    suggestions = []

    # Contact Information (+15)
    has_email = data.get("email") != "Not Detected"
    has_phone = data.get("phone") != "Not Detected"
    if has_email and has_phone:
        score += 15
    else:
        suggestions.append("Add complete contact information (Email and Phone)")

    # Skills Section (+20)
    skills = data.get("skills", [])
    if skills and len(skills) > 0:
        score += 20
    else:
        suggestions.append("Add a technical skills section")

    # Projects Section (+20)
    projects = data.get("projects", [])
    if projects and len(projects) > 0 and projects[0].get("title") != "Not Detected":
        score += 20
    else:
        suggestions.append("Add more technical projects to showcase your experience")

    # Education Section (+10)
    education = data.get("education", [])
    if education and len(education) > 0 and education[0].get("degree") != "Not Detected":
        score += 10
    else:
        suggestions.append("Add your educational background")

    # Experience Section (+15)
    experience = data.get("experience", [])
    if experience and len(experience) > 0 and experience[0] != "Not Detected":
        score += 15
    else:
        suggestions.append("Include your work experience or internships")

    # Certifications (+10)
    certs = data.get("certifications", [])
    if certs and len(certs) > 0 and certs[0] != "Not Detected":
        score += 10
    else:
        suggestions.append("Add relevant certifications to boost credibility")

    # LinkedIn (+5)
    if data.get("linkedin") != "Not Detected":
        score += 5
    else:
        suggestions.append("Add your LinkedIn profile link")

    # GitHub (+5)
    if data.get("github") != "Not Detected":
        score += 5
    else:
        suggestions.append("Add your GitHub profile link to showcase your code")

    # Additional Logic for low ATS score
    if score < 70:
        suggestions.append("Ensure your resume uses standard section headers for better parsing")

    return {
        "ats_score": score,
        "suggestions": suggestions
    }
