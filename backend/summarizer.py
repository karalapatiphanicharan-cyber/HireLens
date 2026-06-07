from typing import List, Dict, Any

def generate_summary(data: Dict[str, Any]) -> str:
    name = data.get("name", "The candidate")
    education = data.get("education", [])
    skills = data.get("skills", [])
    projects = data.get("projects", [])
    experience = data.get("experience", [])
    certs = data.get("certifications", [])

    summary_parts = []

    # Intro & Education
    edu_str = ""
    if education and education[0].get("degree") != "Not Detected":
        edu = education[0]
        uni = f" at {edu.get('university')}" if edu.get('university') != "Not Detected" else ""
        edu_str = f" is a {edu.get('degree')} student{uni}"

    summary_parts.append(f"{name}{edu_str}")

    # Skills
    if skills:
        top_skills = ", ".join(skills[:5])
        summary_parts.append(f"with expertise in {top_skills}.")

    # Projects
    if projects and projects[0].get("title") != "Not Detected":
        project_titles = [p.get("title") for p in projects[:2]]
        p_str = " and ".join(project_titles)
        summary_parts.append(f"They have developed notable projects such as {p_str}.")

    # Experience
    if experience and experience[0] != "Not Detected":
        summary_parts.append(f"Their professional background includes experience as {experience[0]}.")

    # Certifications
    if certs and certs[0] != "Not Detected":
        valid_certs = [c for c in certs if c != "Not Detected"]
        if valid_certs:
            c_str = ", ".join(valid_certs[:2])
            summary_parts.append(f"They are also certified in {c_str}.")

    return " ".join(summary_parts)
