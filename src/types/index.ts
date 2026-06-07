export interface Education {
  degree: string;
  university: string;
  duration: string;
  cgpa: string;
}

export interface Project {
  title: string;
  description: string;
}

export interface ParsedData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  education: Education[];
  experience: string[];
  projects: Project[];
  certifications: string[];
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface UploadResponse {
  success: boolean;
  data: ParsedData;
}

export interface AnalysisRequest {
  resume_data: ParsedData;
  job_description: string;
}

export interface InterviewQuestion {
  question: string;
  topics: string[];
}

export interface InterviewReadiness {
  score: number;
  level: string;
  explanation: string;
}

export interface InterviewPrep {
  readiness: InterviewReadiness;
  technical_questions: InterviewQuestion[];
  project_questions: InterviewQuestion[];
  hr_questions: InterviewQuestion[];
  behavioral_questions: InterviewQuestion[];
  job_specific_questions: InterviewQuestion[];
  weak_areas: string[];
  success_roadmap: {
    current: string[];
    next: string[];
    future: string[];
  };
}

export interface AnalysisResponse {
  ats_score: number;
  job_match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  suggestions: string[];
  summary?: string;
  strength?: {
    score: number;
    level: string;
  };
  recommendations?: { title: string }[];
  roadmap?: {
    current: string[];
    next: string[];
    future: string[];
  };
  insights?: {
    strengths: string[];
    weaknesses: string[];
  };
  smart_recs?: string[];
  interview_prep?: InterviewPrep;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}
