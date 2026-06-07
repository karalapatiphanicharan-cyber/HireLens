import jsPDF from 'jspdf';
import type { AnalysisResponse, ParsedData } from '../types';

export const generatePDFReport = async (data: ParsedData, analysis: AnalysisResponse) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Helper to add a new page with a header
  const addNewPage = (title: string) => {
    doc.addPage();
    doc.setFillColor(3, 7, 18); // Dark background like the app
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(59, 130, 246); // Primary blue
    doc.text(title, margin, margin + 10);

    doc.setDrawColor(255, 255, 255, 0.1);
    doc.line(margin, margin + 15, margin + 50, margin + 15);

    return margin + 30; // Return starting Y for content
  };

  // --- PAGE 1: COVER ---
  doc.setFillColor(3, 7, 18);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Logo
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(40);
  doc.setFont('helvetica', 'bold');
  doc.text('HireLens', margin, 40);

  doc.setFontSize(16);
  doc.setTextColor(148, 163, 184); // Muted
  doc.text('AI Resume Analysis & Interview Readiness Report', margin, 50);

  // Candidate Info
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.text(data.name, margin, 90);

  doc.setFontSize(14);
  doc.setTextColor(148, 163, 184);
  doc.text(`Analysis Date: ${new Date().toLocaleDateString()}`, margin, 100);
  doc.text(`Email: ${data.email}`, margin, 110);

  // Score Cards (Simulated with Rects)
  const drawScore = (label: string, score: number, x: number, y: number, color: [number, number, number]) => {
    doc.setFillColor(255, 255, 255, 0.05);
    doc.roundedRect(x, y, 55, 45, 5, 5, 'F');

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(label.toUpperCase(), x + 27.5, y + 12, { align: 'center' });

    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(28);
    doc.text(`${score}%`, x + 27.5, y + 32, { align: 'center' });
  };

  drawScore('ATS Score', analysis.ats_score, margin, 130, [59, 130, 246]);
  drawScore('Job Match', analysis.job_match_score, margin + 65, 130, [139, 92, 246]);
  drawScore('Readiness', analysis.interview_prep?.readiness.score || 0, margin + 130, 130, [6, 182, 212]);

  // Executive Summary Preview
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  const splitSummary = doc.splitTextToSize(analysis.recruiter_report?.assessment || analysis.summary || "", contentWidth);
  doc.text(splitSummary, margin, 195);

  // --- PAGE 2: PROFILE DETAILS ---
  let yPos = addNewPage('Candidate Profile');

  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text('Skills Overview', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  const skillsText = data.skills.join(' • ');
  const splitSkills = doc.splitTextToSize(skillsText, contentWidth);
  doc.text(splitSkills, margin, yPos);
  yPos += splitSkills.length * 5 + 10;

  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text('Experience', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  data.experience.forEach(exp => {
    const splitExp = doc.splitTextToSize(`• ${exp}`, contentWidth);
    doc.text(splitExp, margin, yPos);
    yPos += splitExp.length * 5 + 3;
  });
  yPos += 7;

  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text('Projects', margin, yPos);
  yPos += 8;
  data.projects.forEach(proj => {
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255, 1);
    doc.setFont('helvetica', 'bold');
    doc.text(proj.title, margin, yPos);
    yPos += 5;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 200, 200);
    const splitDesc = doc.splitTextToSize(proj.description, contentWidth);
    doc.text(splitDesc, margin, yPos);
    yPos += splitDesc.length * 4 + 6;
  });

  // --- PAGE 3: MATCH ANALYSIS ---
  yPos = addNewPage('Role Alignment');

  const drawList = (title: string, items: string[], x: number, y: number, color: [number, number, number]) => {
    doc.setFontSize(14);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(title, x, y);
    let currentY = y + 8;
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    items.forEach(item => {
      doc.text(`• ${item}`, x, currentY);
      currentY += 6;
    });
    return currentY;
  };

  const nextY = drawList('Matching Skills', analysis.matching_skills, margin, yPos, [34, 197, 94]);
  drawList('Missing Skills', analysis.missing_skills, margin + contentWidth/2, yPos, [239, 68, 68]);

  yPos = Math.max(nextY, yPos) + 20;

  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text('Recruiter Insights', margin, yPos);
  yPos += 10;

  doc.setFillColor(255, 255, 255, 0.03);
  doc.roundedRect(margin, yPos, contentWidth, 60, 5, 5, 'F');
  yPos += 10;

  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Strengths:', margin + 5, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  analysis.recruiter_report?.strengths.forEach(s => {
    doc.text(`- ${s}`, margin + 5, yPos);
    yPos += 5;
  });

  yPos += 5;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Concerns:', margin + 5, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  analysis.recruiter_report?.concerns.forEach(c => {
    doc.text(`- ${c}`, margin + 5, yPos);
    yPos += 5;
  });

  // --- PAGE 4: INTERVIEW PREP ---
  yPos = addNewPage('Interview Preparation');

  doc.setFontSize(14);
  doc.setTextColor(6, 182, 212); // Accent
  doc.text('Preparation Strategy', margin, yPos);
  yPos += 10;

  const prep = analysis.interview_prep?.improvement_areas;
  if (prep) {
    yPos = drawList('Focus Areas (Technical)', prep.weak_areas, margin, yPos, [59, 130, 246]);
    yPos += 10;
    yPos = drawList('Recommended Learning', prep.suggested_learning, margin, yPos, [139, 92, 246]);
  }

  yPos += 15;
  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text('Recommended Career Roles', margin, yPos);
  yPos += 8;
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  analysis.recruiter_report?.recommended_roles.forEach((role, i) => {
    doc.text(`${i+1}. ${role}`, margin, yPos);
    yPos += 7;
  });

  // Footer on all pages
  const totalPages = (doc.internal as any).getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`HireLens Analysis Report - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text('Confidential - Generated by HireLens AI', margin, pageHeight - 10);
  }

  doc.save(`HireLens_Report_${data.name.replace(/\s+/g, '_')}.pdf`);
};

export const saveLastReport = (data: ParsedData, analysis: AnalysisResponse) => {
  localStorage.setItem('hirelens_last_report', JSON.stringify({ data, analysis, timestamp: Date.now() }));
};

export const getLastReport = () => {
  const saved = localStorage.getItem('hirelens_last_report');
  return saved ? JSON.parse(saved) : null;
};
