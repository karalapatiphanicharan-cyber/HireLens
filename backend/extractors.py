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

MAJOR_HEADERS = ["Education", "Academic", "Experience", "Work", "Employment", "Projects", "Personal Projects", "Skills", "Certifications", "Licenses", "Awards", "Links", "Contact", "Experience Simulations"]

def extract_name(text: str) -> str:
    lines = text.split('\n')[:10]
    cleaned_lines = []
    for line in lines:
        line = line.strip()
        if not line: continue
        if '@' in line or 'linkedin' in line.lower() or 'github' in line.lower() or re.search(r'\d{10}', line) or 'http' in line.lower():
            continue
        if any(kw.lower() in line.lower() for kw in ["Skills", "Languages", "Education", "Projects", "Experience", "Certifications", "Summary", "Objective", "Curriculum", "Resume"]):
            continue
        if any(kw in line.lower() for kw in ["b.tech", "university", "college", "institute", "school"]):
            continue
        cleaned_lines.append(line)

    if not cleaned_lines: return "Not Detected"

    for line in cleaned_lines[:3]:
        doc = nlp(line)
        for ent in doc.ents:
            if ent.label_ == "PERSON" and 2 <= len(line.split()) <= 4:
                return line

    for line in cleaned_lines[:2]:
        words = line.split()
        if 2 <= len(words) <= 4 and all(w[0].isupper() for w in words if w[0].isalpha()):
            if not any(char.isdigit() for char in line):
                return line

    return cleaned_lines[0] if cleaned_lines else "Not Detected"

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
    links = {"linkedin": "Not Detected", "github": "Not Detected", "portfolio": "Not Detected"}
    linkedin_pattern = r'(?:https?://)?(?:www\.)?linkedin\.com/in/[\w-]+'
    github_pattern = r'(?:https?://)?(?:www\.)?github\.com/[\w-]+'

    linkedin = re.findall(linkedin_pattern, text)
    if linkedin: links["linkedin"] = linkedin[0] if linkedin[0].startswith("http") else "https://" + linkedin[0]

    github = re.findall(github_pattern, text)
    if github: links["github"] = github[0] if github[0].startswith("http") else "https://" + github[0]

    portfolio_pattern = r'(https?://(?:www\.)?[\w-]+\.(?:com|io|me|net|org)(?!.*linkedin|.*github))'
    portfolios = re.findall(portfolio_pattern, text)
    if portfolios: links["portfolio"] = portfolios[0]

    return links

def extract_projects(text: str) -> List[Dict[str, str]]:
    lines = text.split('\n')
    projects = []
    in_section = False
    current_project = None

    PROJECT_STOP_HEADERS = ["Experience Simulations", "Certifications", "Education", "Skills", "Academic", "Experience", "Work", "Employment", "Awards", "Links", "Contact"]
    INVALID_TITLE_STARTS = ["Built", "Developed", "Implemented", "Enabled", "Improved", "Analyzed", "Delivered", "Integrated", "Detected", "Used", "Created"]
    INVALID_TITLE_FRAGMENTS = ["Generation (RAG)", "and LLMs", "plans"]

    for line in lines:
        line_clean = line.strip()
        if not line_clean: continue

        line_clean_norm = line_clean.replace('\u00b7', '•').replace('\u2022', '•')

        if any(kw.lower() in line_clean.lower() for kw in ["Projects", "Personal Projects"]) and len(line_clean) < 30:
            in_section = True
            continue

        if in_section and any(line_clean.lower() == h.lower() or line_clean.lower().startswith(h.lower()) for h in PROJECT_STOP_HEADERS):
             break

        if in_section:
            is_bullet = any(line_clean_norm.startswith(b) for b in ['•', '-', '*', '## •'])

            # Strict Title Detection Rules
            is_valid_format = any(c in line_clean for c in [":", "-", "—"]) or \
                             (re.search(r'\(.*\)', line_clean) is not None)

            starts_with_action = any(line_clean.startswith(word) for word in INVALID_TITLE_STARTS)
            contains_fragment = any(frag in line_clean for frag in INVALID_TITLE_FRAGMENTS)

            is_likely_title = not is_bullet and \
                              is_valid_format and \
                              not starts_with_action and \
                              not contains_fragment and \
                              len(line_clean) < 80 and \
                              not line_clean.endswith('.')

            if is_likely_title:
                if current_project:
                    projects.append(current_project)
                current_project = {"title": line_clean, "description": ""}
            elif current_project:
                current_project["description"] += (line_clean_norm + "\n")

    if current_project:
        projects.append(current_project)

    final_projects = []
    for p in projects:
        desc = p["description"].strip()
        title = p["title"].strip()
        if desc and len(title.split()) <= 15:
            final_projects.append({"title": title, "description": desc})
        elif final_projects and desc:
            final_projects[-1]["description"] += ("\n" + title + "\n" + desc)

    return final_projects if final_projects else [{"title": "Not Detected", "description": "Not Detected"}]

def extract_education(text: str) -> List[Dict[str, str]]:
    lines = text.split('\n')
    education = []
    in_section = False
    current_edu = {"degree": "", "university": "", "duration": "", "cgpa": "Not Detected"}

    for line in lines:
        line_clean = line.strip()
        if not line_clean: continue

        line_clean_norm = line_clean.replace('\u00b7', '-').replace('\u2022', '-')

        if any(kw.lower() in line_clean.lower() for kw in ["Education", "Academic"]) and len(line_clean) < 30:
            in_section = True
            continue

        if in_section and any(line_clean.lower() == h.lower() or line_clean.lower().startswith(h.lower()) for h in MAJOR_HEADERS if h.lower() not in ["education", "academic"]):
            break

        if in_section:
            cgpa_match = re.search(r'(?:CGPA|GPA)\s*[:\-\s]?\s*(\d+(?:\.\d+)?)', line_clean, re.I)
            if cgpa_match:
                current_edu["cgpa"] = cgpa_match.group(1)
                continue # Moved to next line

            if re.search(r'\d{4}', line_clean):
                current_edu["duration"] = line_clean_norm
                continue

            is_uni = any(kw in line_clean.lower() for kw in ["university", "institute", "college", "school"])
            is_deg = any(kw in line_clean.lower() for kw in ["bachelor", "master", "b.tech", "m.tech", "degree", "be", "me", "high school"])

            # If we have a university already and this line is also a university, it might be a new entry
            if is_uni and current_edu["university"]:
                education.append(current_edu)
                current_edu = {"degree": "", "university": line_clean, "duration": "", "cgpa": "Not Detected"}
            elif is_uni:
                current_edu["university"] = line_clean
            elif is_deg:
                current_edu["degree"] = line_clean

    if current_edu["university"] or current_edu["degree"]:
        education.append(current_edu)

    final_edu = []
    for e in education:
        # Merge logic if multiple entries have same university
        existing = next((x for x in final_edu if x["university"] == e["university"] and x["university"] != ""), None)
        if existing:
            if not existing["degree"] and e["degree"]: existing["degree"] = e["degree"]
            if existing["duration"] == "Not Detected" and e["duration"]: existing["duration"] = e["duration"]
            if existing["cgpa"] == "Not Detected" and e["cgpa"] != "Not Detected": existing["cgpa"] = e["cgpa"]
        else:
            final_edu.append(e)

    for e in final_edu:
        for k in e:
            if not e[k]: e[k] = "Not Detected"

    return final_edu if final_edu else [{"degree": "Not Detected", "university": "Not Detected", "duration": "Not Detected", "cgpa": "Not Detected"}]

def is_person_name(text: str, candidate_name: str = "") -> bool:
    """Check if a string looks like a person's name."""
    if not text: return False

    # Check against candidate name
    if candidate_name and (candidate_name.lower() in text.lower() or text.lower() in candidate_name.lower()):
        if len(text.split()) >= 2: # Avoid matching single names if they are keywords
             return True

    # Check using spaCy
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            # Double check it doesn't contain cert keywords
            if not any(kw.lower() in text.lower() for kw in ["Certification", "Certified", "Certificate", "Course", "Professional"]):
                return True

    # Initials + Name pattern (e.g., K. Sri Phani Charan)
    if re.search(r'^[A-Z][\.\s]\s?[A-Z][a-z]+', text):
        return True

    # Pattern-based rejection: 2-4 capitalized words
    words = text.split()
    if 2 <= len(words) <= 4 and all(w and w[0].isupper() for w in words if w[0].isalpha()):
        # Exclude if it contains common certification words though
        if not any(kw.lower() in text.lower() for kw in ["Certification", "Certified", "Certificate", "Course", "Professional", "Fundamentals", "Associate", "Practitioner"]):
            return True

    return False

def extract_certifications(text: str, candidate_name: str = "", project_titles: List[str] = None) -> List[str]:
    certs = []
    lines = text.split('\n')
    in_section = False
    empty_line_count = 0

    CERT_HEADERS = ["Certifications", "Certification", "Certificates", "Courses & Certifications", "Professional Certifications", "Licenses", "Awards"]
    STOP_HEADERS = ["Education", "Skills", "Projects", "Experience", "Internships", "Achievements", "Publications", "Activities", "Leadership", "Contact", "Languages", "Interests"]

    VALID_KEYWORDS = ["Certification", "Certified", "Certificate", "Course", "Training", "Professional", "Fundamentals", "Associate", "Practitioner", "Engineering"]
    KNOWN_COURSES = ["SQL for Data Science", "Prompt Engineering", "Machine Learning", "Data Analytics", "AWS Cloud Practitioner", "Google Data Analytics"]

    for line in lines:
        line_clean = line.strip()

        if not line_clean:
            if in_section:
                empty_line_count += 1
                if empty_line_count >= 2:
                    break
            continue

        empty_line_count = 0

        # Detect Section Start
        if not in_section:
            if any(line_clean.lower() == h.lower() or (line_clean.lower().startswith(h.lower()) and len(line_clean) < 35) for h in CERT_HEADERS):
                in_section = True
                continue

        # Detect Section End
        if in_section:
            if any(line_clean.lower() == h.lower() or (line_clean.lower().startswith(h.lower()) and len(line_clean) < 30) for h in STOP_HEADERS):
                break

            # Stop if it's the candidate name
            if is_person_name(line_clean, candidate_name):
                # Only break if it's NOT a course title (Prompt Engineering might be flagged as a name if we are not careful)
                if not any(course.lower() in line_clean.lower() for course in KNOWN_COURSES) and \
                   not any(kw.lower() in line_clean.lower() for kw in VALID_KEYWORDS):
                    break

            # Reject contact info
            if '@' in line_clean or 'linkedin.com' in line_clean.lower() or 'github.com' in line_clean.lower() or re.search(r'\d{10}', line_clean):
                continue

            # Reject Education entries
            if any(kw.lower() in line_clean.lower() for kw in ["B.Tech", "B.E", "M.Tech", "M.S", "MBA", "University", "College", "Institute"]):
                continue

            # Reject Project titles
            if project_titles and any(line_clean.lower() == p.lower() for p in project_titles):
                continue

            # Validation Rule
            is_valid = any(kw.lower() in line_clean.lower() for kw in VALID_KEYWORDS) or \
                       any(course.lower() in line_clean.lower() for course in KNOWN_COURSES)

            if is_valid:
                # Clean bullet points
                cleaned_cert = re.sub(r'^[•\-\*\d\.\s]+', '', line_clean).strip()
                if cleaned_cert and cleaned_cert not in certs:
                    certs.append(cleaned_cert)

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

        if in_section and any(line_clean.lower() == h.lower() or line_clean.lower().startswith(h.lower()) for h in MAJOR_HEADERS if h.lower() not in ["experience", "work", "employment"]):
            break

        if in_section:
            experience.append(line_clean)

    return experience if experience else ["Not Detected"]
