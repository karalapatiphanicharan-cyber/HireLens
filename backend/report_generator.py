from typing import List, Dict, Any

def generate_assessment(resume_data: Dict[str, Any], ats_score: int, job_match_score: int) -> str:
    """Generates an overall executive assessment of the candidate."""
    skills = resume_data.get("skills", [])
    projects = resume_data.get("projects", [])

    if job_match_score >= 85:
        assessment = f"Candidate demonstrates exceptional alignment with the role requirements, particularly in {', '.join(skills[:3]) if skills else 'core technical areas'}."
    elif job_match_score >= 70:
        assessment = f"Candidate shows strong fundamentals in {', '.join(skills[:2]) if skills else 'technical domains'} with relevant project experience."
    else:
        assessment = "Candidate has a foundational background but may require additional upskilling in specific role-required technologies."

    if projects:
        assessment += f" Hands-on experience with {projects[0].get('title', 'key projects')} highlights practical application of skills."

    if ats_score < 70:
        assessment += " Optimization of resume structure and keyword density could further improve ATS visibility."

    return assessment

def get_recruiter_report(resume_data: Dict[str, Any], ats_score: int, job_match_score: int, missing_skills: List[str]) -> Dict[str, Any]:
    """Generates a detailed recruiter-focused report."""
    skills = resume_data.get("skills", [])

    # Strengths
    strengths = []
    if len(skills) > 8: strengths.append("Diverse technical skill set")
    if resume_data.get("projects"): strengths.append("Practical project-based experience")
    if ats_score > 80: strengths.append("Strong professional profile presentation")
    if job_match_score > 80: strengths.append("High alignment with technical requirements")

    # Concerns
    concerns = []
    if not missing_skills:
        pass
    elif len(missing_skills) > 5:
        concerns.append(f"Significant skill gap in: {', '.join(missing_skills[:3])}")
    else:
        concerns.append(f"Missing core competencies: {', '.join(missing_skills)}")

    if ats_score < 60:
        concerns.append("Resume formatting may not be fully ATS-compliant")

    # Recommended Roles
    recommended_roles = []
    if "Python" in skills or "FastAPI" in skills: recommended_roles.append("Python Developer")
    if "React" in skills or "JavaScript" in skills: recommended_roles.append("Frontend Engineer")
    if "Machine Learning" in skills or "NLP" in skills: recommended_roles.append("AI/ML Engineer")
    if not recommended_roles: recommended_roles.append("Software Engineer")

    # Hiring Readiness
    if job_match_score >= 85 and ats_score >= 80:
        readiness = "Immediate Hire"
    elif job_match_score >= 70:
        readiness = "Interview Ready"
    else:
        readiness = "Upskilling Recommended"

    return {
        "assessment": generate_assessment(resume_data, ats_score, job_match_score),
        "strengths": strengths,
        "concerns": concerns,
        "recommended_roles": recommended_roles,
        "hiring_readiness": readiness
    }
