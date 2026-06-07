import re
import spacy
from typing import List, Dict, Any

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

IGNORE_KEYWORDS = ["Skills", "Languages", "Education", "Projects", "Experience", "Certifications", "Summary", "Objective"]

def extract_name(text: str) -> str:
    lines = text.split('\n')[:20]
    cleaned_lines = []
    for line in lines:
        line = line.strip()
        if not line: continue
        # Ignore lines with contact info
        if '@' in line or 'linkedin' in line.lower() or 'github' in line.lower() or re.search(r'\d{10}', line) or 'http' in line.lower():
            continue
        # Ignore headers
        if any(kw.lower() in line.lower() for kw in IGNORE_KEYWORDS):
            continue
        # Specific filter for degree/uni in first 20 lines if they sneak in
        if any(kw in line.lower() for kw in ["b.tech", "university", "college", "institute"]):
            continue
        cleaned_lines.append(line)

    # Try spaCy on each line for PERSON
    for line in cleaned_lines:
        doc = nlp(line)
        for ent in doc.ents:
            # Name should be 2-4 words and contain only letters/dots
            if ent.label_ == "PERSON" and 2 <= len(line.split()) <= 4:
                # Sanity check: no numbers or common non-name words
                if not any(char.isdigit() for char in line) and not any(kw in line.lower() for kw in ["built", "using", "designed"]):
                    return line

    # Fallback: First properly capitalized line with 2-4 words
    for line in cleaned_lines:
        words = line.split()
        if 2 <= len(words) <= 4 and all(w[0].isupper() for w in words if w[0].isalpha()):
            if not any(char.isdigit() for char in line) and not any(kw in line.lower() for kw in ["built", "using", "designed"]):
                return line

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

    linkedin_pattern = r'(?:https?://)?(?:www\.)?linkedin\.com/in/[\w-]+'
    github_pattern = r'(?:https?://)?(?:www\.)?github\.com/[\w-]+'

    linkedin = re.findall(linkedin_pattern, text)
    if linkedin:
        url = linkedin[0]
        links["linkedin"] = url if url.startswith("http") else "https://" + url

    github = re.findall(github_pattern, text)
    if github:
        url = github[0]
        links["github"] = url if url.startswith("http") else "https://" + url

    portfolio_pattern = r'(https?://(?:www\.)?[\w-]+\.(?:com|io|me|net|org)(?!.*linkedin|.*github))'
    portfolios = re.findall(portfolio_pattern, text)
    if portfolios: links["portfolio"] = portfolios[0]

    return links

def extract_projects(text: str) -> List[Dict[str, str]]:
    lines = text.split('\n')
    projects = []
    in_section = False
    current_project = None

    for line in lines:
        line_clean = line.strip()
        if not line_clean: continue

        if any(kw.lower() in line_clean.lower() for kw in ["Projects", "Personal Projects"]) and len(line_clean) < 30:
            in_section = True
            continue

        headers = ["education", "experience", "work", "skills", "certifications", "links", "contact"]
        if in_section and any(h.lower() == line_clean.lower() for h in headers):
            break

        if in_section:
            if len(line_clean) < 50 and not line_clean.endswith('.') and not current_project:
                current_project = {"title": line_clean, "description": ""}
            elif current_project:
                if len(line_clean) < 50 and not line_clean.endswith('.') and current_project["description"]:
                    projects.append(current_project)
                    current_project = {"title": line_clean, "description": ""}
                else:
                    current_project["description"] += (line_clean + " ")

    if current_project:
        projects.append(current_project)

    for p in projects:
        p["description"] = p["description"].strip()

    return projects if projects else [{"title": "Not Detected", "description": "Not Detected"}]

def extract_education(text: str) -> List[Dict[str, str]]:
    lines = text.split('\n')
    education = []
    in_section = False
    current_edu = {"degree": "", "university": "", "duration": "", "cgpa": ""}

    for line in lines:
        line_clean = line.strip()
        if not line_clean: continue

        if any(kw.lower() in line_clean.lower() for kw in ["Education", "Academic"]) and len(line_clean) < 30:
            in_section = True
            continue

        headers = ["experience", "work", "projects", "skills", "certifications", "links", "contact"]
        if in_section and any(h.lower() == line_clean.lower() for h in headers):
            break

        if in_section:
            if re.search(r'\d{4}', line_clean):
                current_edu["duration"] = line_clean
            elif any(kw in line_clean.lower() for kw in ["university", "institute", "college", "school"]):
                current_edu["university"] = line_clean
            elif any(kw in line_clean.lower() for kw in ["bachelor", "master", "b.tech", "m.tech", "degree", "be", "me"]):
                current_edu["degree"] = line_clean
            elif "cgpa" in line_clean.lower() or "gpa" in line_clean.lower():
                current_edu["cgpa"] = line_clean

            if current_edu["university"] and current_edu["degree"] and (current_edu["duration"] or current_edu["cgpa"]):
                education.append(current_edu)
                current_edu = {"degree": "", "university": "", "duration": "", "cgpa": ""}

    if current_edu["university"] or current_edu["degree"]:
        education.append(current_edu)

    for e in education:
        for k in e:
            if not e[k]: e[k] = "Not Detected"

    return education if education else [{"degree": "Not Detected", "university": "Not Detected", "duration": "Not Detected", "cgpa": "Not Detected"}]

def extract_certifications(text: str) -> List[str]:
    certs = []
    lines = text.split('\n')
    in_section = False

    doc_full = nlp(text[:1000])
    people = [ent.text.lower() for ent in doc_full.ents if ent.label_ == "PERSON"]

    for line in lines:
        line_clean = line.strip()
        if not line_clean: continue

        if any(kw.lower() in line_clean.lower() for kw in ["Certifications", "Licenses", "Awards"]) and len(line_clean) < 30:
            in_section = True
            continue

        headers = ["education", "experience", "work", "projects", "skills", "links", "contact"]
        if in_section and any(h.lower() == line_clean.lower() for h in headers):
            break

        if in_section:
            if line_clean.lower() in people: continue
            if any(kw in line_clean.lower() for kw in ["university", "college", "institute"]): continue
            if len(line_clean) > 100: continue
            if any(kw in line_clean.lower() for kw in ["built", "developed", "system", "using"]): continue
            certs.append(line_clean)

    return certs if certs else ["Not Detected"]

def extract_experience(text: str) -> List[str]:
    lines = text.split('\n')
    experience = []
    in_section = False

    for line in lines:
        line_clean = line.strip()
        if not line_clean: continue

        if any(kw.lower() in line_clean.lower() for kw in ["Experience", "Work", "Employment"]) and len(line_clean) < 30:
            in_section = True
            continue

        headers = ["education", "projects", "skills", "certifications", "links", "contact"]
        if in_section and any(h.lower() == line_clean.lower() for h in headers):
            break

        if in_section:
            experience.append(line_clean)

    return experience if experience else ["Not Detected"]
