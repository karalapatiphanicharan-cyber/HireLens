from typing import List, Dict, Any, Optional
import re

def calculate_readiness(data: Dict[str, Any], ats_score: int, job_match_score: int) -> Dict[str, Any]:
    # Weights for readiness
    # ATS: 20, Job Match: 20, Skills: 25, Projects: 15, Experience: 10, Certs: 10

    score = (ats_score * 0.2) + (job_match_score * 0.2)

    skills = data.get("skills", [])
    if len(skills) >= 10: score += 25
    elif len(skills) >= 5: score += 18
    elif len(skills) > 0: score += 10

    projects = [p for p in data.get("projects", []) if p.get("title") != "Not Detected"]
    if len(projects) >= 2: score += 15
    elif len(projects) == 1: score += 10

    exp = [e for e in data.get("experience", []) if e != "Not Detected"]
    if exp: score += 10

    certs = [c for c in data.get("certifications", []) if c != "Not Detected"]
    if len(certs) >= 2: score += 10
    elif len(certs) == 1: score += 5

    score = int(min(100, score))

    level = "Needs Preparation"
    if score >= 86: level = "Strong Candidate"
    elif score >= 71: level = "Interview Ready"
    elif score >= 51: level = "Developing Candidate"

    return {
        "score": score,
        "level": level,
        "explanation": f"Based on your comprehensive profile evaluation ({score}%), you are currently classified as a {level}. " +
                      "Use the dynamic preparation module below to bridge any remaining gaps."
    }

def get_technical_questions(skills: List[str]) -> List[Dict[str, Any]]:
    questions_db = {
        "python": [
            {
                "question": "What are Python decorators and how do they work?",
                "topics": ["Higher-order functions", "Wrappers", "@syntax", "Function objects"],
                "follow_ups": ["Can a decorator accept arguments?", "Explain functools.wraps."]
            },
            {
                "question": "Explain the difference between Generators and Iterators.",
                "topics": ["yield keyword", "__iter__", "__next__", "Memory efficiency"],
                "follow_ups": ["When would you use a generator over a list?", "What is a StopIteration exception?"]
            },
            {
                "question": "Explain Multithreading vs Multiprocessing in Python.",
                "topics": ["GIL (Global Interpreter Lock)", "CPU-bound vs I/O-bound", "Processes vs Threads"],
                "follow_ups": ["How does the GIL affect performance?", "Explain the 'multiprocessing' module."]
            },
            {
                "question": "What are Context Managers and the 'with' statement?",
                "topics": ["Resource management", "__enter__", "__exit__", "Exception handling"],
                "follow_ups": ["How do you create a custom context manager?", "Can you use contextlib for this?"]
            },
            {
                "question": "Difference between Deep Copy and Shallow Copy.",
                "topics": ["copy module", "Nested objects", "Reference vs Value"],
                "follow_ups": ["How does 'copy.deepcopy()' work?", "What happens with mutable objects?"]
            }
        ],
        "machine learning": [
            {
                "question": "Explain Overfitting and Underfitting with examples.",
                "topics": ["Bias-Variance Tradeoff", "Model complexity", "Generalization"],
                "follow_ups": ["How do you detect overfitting?", "What is Regularization (L1/L2)?"]
            },
            {
                "question": "What is Cross-Validation and why is it used?",
                "topics": ["K-Fold", "Training/Validation split", "Model evaluation"],
                "follow_ups": ["How does K-fold differ from Leave-one-out?", "When is CV not recommended?"]
            },
            {
                "question": "Difference between Random Forest and XGBoost.",
                "topics": ["Bagging vs Boosting", "Trees", "Parallelism vs Sequential"],
                "follow_ups": ["What are hyperparameters in XGBoost?", "Explain Gradient Descent."]
            },
            {
                "question": "Explain Feature Engineering and its importance.",
                "topics": ["Scaling", "One-hot encoding", "Feature selection", "Domain knowledge"],
                "follow_ups": ["How do you handle missing values?", "What is PCA?"]
            },
            {
                "question": "What is the difference between Generative and Discriminative models?",
                "topics": ["Probability distribution", "Decision boundary", "Examples (NB vs LR)"],
                "follow_ups": ["Which one is used for GANs?", "How does Naive Bayes work?"]
            }
        ],
        "sql": [
            {
                "question": "Difference between WHERE and HAVING clauses.",
                "topics": ["Aggregation", "Filtering", "Group By", "Execution order"],
                "follow_ups": ["Can you use HAVING without GROUP BY?", "Explain the execution flow of a SELECT query."]
            },
            {
                "question": "Explain SQL Indexing and how it improves performance.",
                "topics": ["B-Trees", "Search optimization", "Primary Key vs Secondary Index"],
                "follow_ups": ["What is a Clustered Index?", "When should you NOT use an index?"]
            },
            {
                "question": "Explain Database Normalization (1NF, 2NF, 3NF).",
                "topics": ["Redundancy", "Data integrity", "Relationships", "Anomalies"],
                "follow_ups": ["What is Denormalization?", "When is Denormalization preferred?"]
            },
            {
                "question": "What are Window Functions in SQL?",
                "topics": ["OVER clause", "RANK", "ROW_NUMBER", "PARTITION BY"],
                "follow_ups": ["Difference between RANK and DENSE_RANK?", "How do they differ from GROUP BY?"]
            },
            {
                "question": "Explain ACID properties in Databases.",
                "topics": ["Atomicity", "Consistency", "Isolation", "Durability", "Transactions"],
                "follow_ups": ["Explain Transaction Isolation levels.", "What is a Deadlock?"]
            }
        ],
        "react": [
            {
                "question": "What are React Hooks and why were they introduced?",
                "topics": ["useState", "useEffect", "Functional components", "Code reuse"],
                "follow_ups": ["Explain the rules of hooks.", "How to create a custom hook?"]
            },
            {
                "question": "Explain the Virtual DOM and the Reconciliation process.",
                "topics": ["Rendering", "Diffing algorithm", "Performance", "Fiber"],
                "follow_ups": ["How does the diffing algorithm handle keys?", "Does React update the real DOM directly?"]
            },
            {
                "question": "Difference between State and Props.",
                "topics": ["Unidirectional data flow", "Immutability", "Component communication"],
                "follow_ups": ["Can you change props?", "Explain Lifting State Up."]
            },
            {
                "question": "Explain React Server Components (RSC).",
                "topics": ["Server-side rendering", "Hydration", "Bundle size", "Performance"],
                "follow_ups": ["Difference between RSC and SSR?", "When should you use 'use client'?"]
            }
        ],
        "docker": [
            {
                "question": "Difference between a Docker Image and a Container.",
                "topics": ["Read-only layer", "Running instance", "Registry", "Dockerfile"],
                "follow_ups": ["What is the 'docker run' command doing?", "How to see running containers?"]
            },
            {
                "question": "Explain Docker Compose and its use cases.",
                "topics": ["Multi-container apps", "YAML configuration", "Orchestration", "Links"],
                "follow_ups": ["How to scale services in Compose?", "Explain 'depends_on' vs 'healthcheck'."]
            },
            {
                "question": "Explain the difference between a VM and a Container.",
                "topics": ["Hypervisor", "OS Kernel sharing", "Boot time", "Resource efficiency"],
                "follow_ups": ["Which one is more secure?", "Why are containers faster?"]
            }
        ]
    }

    results = []
    skills_lower = [s.lower() for s in skills]

    for skill, q_list in questions_db.items():
        if any(skill in s for s in skills_lower):
            results.extend(q_list)

    # Default general tech questions if no major skills match
    if len(results) < 5:
        results.extend([
            {
                "question": "What is an API and how does REST differ from GraphQL?",
                "topics": ["Endpoints", "Schemas", "Performance", "Data fetching"],
                "follow_ups": ["Explain the HTTP methods.", "What is a status code?"]
            },
            {
                "question": "Explain Git version control and the common workflow.",
                "topics": ["Commit", "Branch", "Merge", "Rebase", "Pull Requests"],
                "follow_ups": ["Difference between Merge and Rebase?", "How to resolve a conflict?"]
            },
            {
                "question": "Explain the concept of 'Big O' notation.",
                "topics": ["Time complexity", "Space complexity", "Scalability", "Algorithms"],
                "follow_ups": ["What is the complexity of binary search?", "Compare O(n) and O(log n)."]
            }
        ])

    return results

def get_behavioral_questions() -> List[Dict[str, Any]]:
    return [
        {
            "question": "Tell me about a time you faced a difficult technical challenge.",
            "topics": ["STAR Method", "Problem Solving", "Result", "Technical depth"],
            "follow_ups": ["What would you do differently now?", "How did you measure the success of the solution?"]
        },
        {
            "question": "Describe a situation where you had to work in a diverse team.",
            "topics": ["Collaboration", "Communication", "Conflict resolution", "Soft skills"],
            "follow_ups": ["How did you handle disagreements?", "How did you ensure everyone was on the same page?"]
        },
        {
            "question": "Explain a situation where you solved a difficult problem with limited resources.",
            "topics": ["Resourcefulness", "Creativity", "Efficiency", "Prioritization"],
            "follow_ups": ["How did you justify the trade-offs?", "What was the final impact?"]
        },
        {
            "question": "Describe a project you are proud of and your specific contribution.",
            "topics": ["Ownership", "Leadership", "Technology stack", "Impact"],
            "follow_ups": ["What was the hardest part?", "How did you handle the deployment?"]
        },
        {
            "question": "Tell me about a failure and what you learned from it.",
            "topics": ["Self-awareness", "Growth mindset", "Resilience", "Honesty"],
            "follow_ups": ["How did you apply that lesson later?", "Who did you communicate the failure to?"]
        }
    ]

def get_hr_questions() -> List[Dict[str, Any]]:
    return [
        {
            "question": "Tell me about yourself.",
            "topics": ["Current role", "Background", "Key achievements", "Career aspirations"],
            "follow_ups": ["Why did you choose this career path?", "What drives you professionally?"]
        },
        {
            "question": "Walk me through your resume.",
            "topics": ["Structure", "Career progression", "Relevance to role"],
            "follow_ups": ["Why did you leave your previous role?", "Explain this gap in your resume."]
        },
        {
            "question": "Why should we hire you for this role?",
            "topics": ["Value proposition", "Role alignment", "Skill match", "Company culture"],
            "follow_ups": ["What unique perspective do you bring?", "How quickly can you start contributing?"]
        },
        {
            "question": "What are your greatest professional strengths and weaknesses?",
            "topics": ["Honesty", "Self-improvement", "Confidence", "Examples"],
            "follow_ups": ["How do you work on your weaknesses?", "Give an example of your strength in action."]
        },
        {
            "question": "Where do you see yourself in 5 years?",
            "topics": ["Ambition", "Stability", "Learning goals", "Company loyalty"],
            "follow_ups": ["How does this role help you get there?", "Are you interested in leadership?"]
        }
    ]

def get_situational_problem_solving() -> Dict[str, List[Dict[str, Any]]]:
    situational = [
        {
            "question": "If you are given a task with a tight deadline and you realize you can't finish it, what do you do?",
            "topics": ["Communication", "Expectation management", "Prioritization"],
            "follow_ups": ["Who would you notify first?", "How would you propose a partial delivery?"]
        },
        {
            "question": "How do you handle a situation where a senior teammate gives you feedback you disagree with?",
            "topics": ["Professionalism", "Objectivity", "Learning", "Data-driven decisions"],
            "follow_ups": ["How would you present your counter-argument?", "What if they still insist?"]
        }
    ]

    problem_solving = [
        {
            "question": "How would you design a URL shortening service like Bitly?",
            "topics": ["System Design", "Scalability", "Hashing", "Databases"],
            "follow_ups": ["How to handle collisions?", "What about expiration of links?"]
        },
        {
            "question": "Explain how you would debug a production application that is suddenly running slow.",
            "topics": ["Monitoring", "Logs", "Profiling", "Isolation", "Bottlenecks"],
            "follow_ups": ["Which tools would you use?", "How to ensure minimal user impact during debugging?"]
        }
    ]

    return {"situational": situational, "problem_solving": problem_solving}

def get_job_specific_questions(jd: str, missing_skills: List[str]) -> List[Dict[str, Any]]:
    if not jd: return []

    results = []
    # Dynamic generation based on keywords in JD
    if "docker" in jd.lower():
        results.append({
            "question": "The job description mentions Docker. Can you explain container orchestration?",
            "topics": ["Kubernetes", "Scalability", "High Availability", "Nodes"],
            "follow_ups": ["Have you used Docker Swarm or K8s?", "Explain a 'Pod'."]
        })

    if "aws" in jd.lower() or "cloud" in jd.lower():
        results.append({
            "question": "How would you ensure security in a cloud-based deployment (AWS)?",
            "topics": ["IAM", "VPC", "Encryption", "Security Groups"],
            "follow_ups": ["What is the Principle of Least Privilege?", "Explain S3 bucket policies."]
        })

    if "deployment" in jd.lower() or "ci/cd" in jd.lower():
        results.append({
            "question": "Explain a typical CI/CD pipeline you would implement for this role.",
            "topics": ["Automation", "Testing", "Staging vs Prod", "GitHub Actions/Jenkins"],
            "follow_ups": ["How to handle rollbacks?", "Where does automated testing fit in?"]
        })

    # Default if no specific matches
    if not results:
        results.append({
            "question": "How do your skills specifically align with the responsibilities mentioned in the JD?",
            "topics": ["Alignment", "Transferable skills", "Passion"],
            "follow_ups": ["Which part of the role excites you most?", "Which requirement is the biggest challenge?"]
        })

    return results

def get_improvement_areas(ats_suggestions: List[str], missing_skills: List[str]) -> Dict[str, List[str]]:
    strengths = ["Strong foundational knowledge", "Relevant academic background"]
    if len(missing_skills) < 2:
        strengths.append("High technical compatibility with target roles")

    weak_areas = []
    for skill in missing_skills[:3]:
        weak_areas.append(f"Technical depth in {skill}")

    if not weak_areas:
        weak_areas = ["No critical technical gaps detected. Focus on advanced system design."]

    suggested_learning = []
    for skill in missing_skills[:4]:
        suggested_learning.append(f"Advanced {skill} concepts and practical application")

    if not suggested_learning:
        suggested_learning = ["System Design Patterns", "Cloud Native Architectures", "MLOps"]

    return {
        "strengths": strengths,
        "weak_areas": weak_areas[:3],
        "suggested_learning": suggested_learning[:3]
    }
