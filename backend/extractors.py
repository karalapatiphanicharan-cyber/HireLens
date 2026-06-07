import re
import spacy
from typing import List

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import spacy.cli
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

SKILLS_LIST = [
    "Python", "Java", "C++", "JavaScript", "TypeScript", "React", "Node.js",
    "Express", "MongoDB", "SQL", "MySQL", "PostgreSQL", "Machine Learning",
    "Deep Learning", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas",
    "NumPy", "FastAPI", "Flask", "Docker", "Kubernetes", "AWS", "Git", "GitHub"
]

def extract_name(text: str) -> str:
    doc = nlp(text[:500])  # Look at the beginning of the resume
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text.strip()
    # Fallback: take the first line if it looks like a name
    lines = text.split('\n')
    if lines:
        first_line = lines[0].strip()
        if len(first_line) > 0 and len(first_line) < 50:
            return first_line
    return "Not Detected"

def extract_email(text: str) -> str:
    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    emails = re.findall(email_pattern, text)
    return emails[0] if emails else "Not Detected"

def extract_phone(text: str) -> str:
    phone_pattern = r'\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b'
    phones = re.findall(phone_pattern, text)
    return phones[0] if phones else "Not Detected"

def extract_skills(text: str) -> List[str]:
    found_skills = []
    text_lower = text.lower()
    for skill in SKILLS_LIST:
        # Use regex to find skills as whole words
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        if re.search(pattern, text_lower):
            found_skills.append(skill)
    return list(set(found_skills))

def extract_links(text: str) -> dict:
    links = {
        "linkedin": "Not Detected",
        "github": "Not Detected",
        "portfolio": "Not Detected"
    }
    linkedin_pattern = r'(https?://(?:www\.)?linkedin\.com/in/[\w-]+)'
    github_pattern = r'(https?://(?:www\.)?github\.com/[\w-]+)'

    linkedin = re.findall(linkedin_pattern, text)
    if linkedin: links["linkedin"] = linkedin[0]

    github = re.findall(github_pattern, text)
    if github: links["github"] = github[0]

    # Simple portfolio pattern for common personal site indicators
    portfolio_pattern = r'(https?://(?:www\.)?[\w-]+\.(?:com|io|me|net|org)(?!.*linkedin|.*github))'
    portfolios = re.findall(portfolio_pattern, text)
    if portfolios: links["portfolio"] = portfolios[0]

    return links

def extract_section(text: str, keywords: List[str]) -> List[str]:
    lines = text.split('\n')
    sections = []
    current_section = []
    in_section = False

    for line in lines:
        line_clean = line.strip()
        if not line_clean: continue

        # Check if line is a header
        if any(keyword.lower() in line_clean.lower() for keyword in keywords) and len(line_clean) < 30:
            in_section = True
            continue

        # If we hit another likely header, stop (simple heuristic)
        headers = ["education", "experience", "work", "projects", "skills", "certifications", "links", "contact"]
        if in_section and any(h.lower() == line_clean.lower() for h in headers):
            break

        if in_section:
            current_section.append(line_clean)

    return current_section if current_section else ["Not Detected"]

def extract_education(text: str) -> List[str]:
    return extract_section(text, ["Education", "Academic"])

def extract_experience(text: str) -> List[str]:
    return extract_section(text, ["Experience", "Work", "Employment"])

def extract_projects(text: str) -> List[str]:
    return extract_section(text, ["Projects", "Personal Projects"])

def extract_certifications(text: str) -> List[str]:
    return extract_section(text, ["Certifications", "Licenses", "Awards"])
