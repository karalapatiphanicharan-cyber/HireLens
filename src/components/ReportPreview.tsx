import React from 'react';
import { CheckCircle2, AlertCircle, BarChart3, Target, UserCheck } from 'lucide-react';
import type { ParsedData, AnalysisResponse } from '../types';

interface ReportPreviewProps {
  data: ParsedData;
  analysis: AnalysisResponse;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ data, analysis }) => {
  return (
    <div className="bg-[#030712] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
      <div className="p-8 md:p-12 space-y-12 max-h-[80vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-3xl font-black text-white">Report Preview</h2>
            <p className="text-muted font-medium">Generated for {data.name}</p>
          </div>
          <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-primary font-black text-sm uppercase tracking-widest">Confidential</span>
          </div>
        </div>

        {/* Page 1: Overview */}
        <section className="space-y-8">
          <h3 className="text-sm uppercase font-black text-primary tracking-[0.3em]">Executive Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScoreWidget label="ATS Score" value={analysis.ats_score} icon={<BarChart3 size={20} />} color="text-primary" />
            <ScoreWidget label="Job Match" value={analysis.job_match_score} icon={<Target size={20} />} color="text-secondary" />
            <ScoreWidget label="Readiness" value={analysis.interview_prep?.readiness.score || 0} icon={<UserCheck size={20} />} color="text-accent" />
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 italic text-lg font-medium text-white/90">
             "{analysis.recruiter_report?.assessment}"
          </div>
        </section>

        {/* Page 2: Skills & Match */}
        <section className="space-y-8">
          <h3 className="text-sm uppercase font-black text-secondary tracking-[0.3em]">Role Alignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-black flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-500" />
                Matching Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.matching_skills.map(s => (
                  <span key={s} className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-xs font-bold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black flex items-center gap-2">
                <AlertCircle size={18} className="text-red-500" />
                Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missing_skills.map(s => (
                  <span key={s} className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-bold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Page 3: Recruiter Insights */}
        <section className="space-y-8">
          <h3 className="text-sm uppercase font-black text-accent tracking-[0.3em]">Recruiter Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
               <h4 className="text-white font-black mb-4">Strengths</h4>
               <ul className="space-y-2">
                 {analysis.recruiter_report?.strengths.map((s, i) => (
                   <li key={i} className="text-sm text-muted flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                     {s}
                   </li>
                 ))}
               </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
               <h4 className="text-white font-black mb-4">Concerns</h4>
               <ul className="space-y-2">
                 {analysis.recruiter_report?.concerns.map((c, i) => (
                   <li key={i} className="text-sm text-muted flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                     {c}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ScoreWidget: React.FC<{ label: string, value: number, icon: React.ReactNode, color: string }> = ({ label, value, icon, color }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
    <div className={`w-10 h-10 ${color} bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4`}>
      {icon}
    </div>
    <p className="text-xs font-black text-muted uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-3xl font-black ${color}`}>{value}%</p>
  </div>
);

export default ReportPreview;
