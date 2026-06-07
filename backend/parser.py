import fitz  # PyMuPDF
from docx import Document
import io
try:
    from .extractors import (
        extract_name, extract_email, extract_phone, extract_skills,
        extract_education, extract_experience, extract_projects,
        extract_certifications, extract_links
    )
except ImportError:
    from extractors import (
        extract_name, extract_email, extract_phone, extract_skills,
        extract_education, extract_experience, extract_projects,
        extract_certifications, extract_links
    )

def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

def extract_text_from_docx(file_bytes: bytes) -> str:
    doc = Document(io.BytesIO(file_bytes))
    return "\n".join([para.text for para in doc.paragraphs])

def parse_resume(file_bytes: bytes, filename: str) -> dict:
    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(file_bytes)
    elif filename.endswith(".docx"):
        text = extract_text_from_docx(file_bytes)
    else:
        raise ValueError("Unsupported file format")

    links = extract_links(text)
    name = extract_name(text)
    projects = extract_projects(text)
    project_titles = [p.get("title") for p in projects if p.get("title") != "Not Detected"]

    return {
        "name": name,
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experience": extract_experience(text),
        "projects": projects,
        "certifications": extract_certifications(text, candidate_name=name, project_titles=project_titles),
        "linkedin": links["linkedin"],
        "github": links["github"],
        "portfolio": links["portfolio"]
    }
