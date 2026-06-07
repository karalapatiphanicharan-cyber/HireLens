import re
from typing import List, Dict, Any
try:
    from .extractors import extract_skills
except ImportError:
    from extractors import extract_skills

def calculate_job_match(resume_skills: List[str], job_description: str) -> Dict[str, Any]:
    # 1. Extract skills from JD using the same extractor logic
    jd_skills = extract_skills(job_description)

    if not jd_skills:
        return {
            "job_match_score": 0,
            "matching_skills": [],
            "missing_skills": [],
            "suggestions": ["Job description does not contain recognizable technical skills."]
        }

    # Normalize for comparison
    resume_skills_lower = [s.lower() for s in resume_skills]
    matching_skills = []
    missing_skills = []

    for skill in jd_skills:
        if skill.lower() in resume_skills_lower:
            matching_skills.append(skill)
        else:
            missing_skills.append(skill)

    # Calculate score
    match_score = int((len(matching_skills) / len(jd_skills)) * 100)

    # Suggestions based on missing skills
    suggestions = []
    if missing_skills:
        for skill in missing_skills[:3]: # Suggest top 3 missing skills
            suggestions.append(f"Consider learning or adding '{skill}' to your resume to better match this role.")

    return {
        "job_match_score": match_score,
        "matching_skills": matching_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions
    }
