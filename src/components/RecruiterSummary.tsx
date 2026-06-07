import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Briefcase, UserCheck, Quote } from 'lucide-react';

interface RecruiterSummaryProps {
  report: {
    assessment: string;
    strengths: string[];
    concerns: string[];
    recommended_roles: string[];
    hiring_readiness: string;
  };
}

const RecruiterSummary: React.FC<RecruiterSummaryProps> = ({ report }) => {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
          <ShieldCheck size={24} />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Recruiter Analysis</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Assessment & Readiness */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <Quote size={80} />
            </div>
            <h3 className="text-sm uppercase font-black text-muted tracking-widest mb-4">Executive Summary</h3>
            <p className="text-xl font-bold text-white leading-relaxed italic">
              "{report.assessment}"
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6"
            >
              <h4 className="flex items-center gap-2 text-green-400 font-black mb-4">
                <ShieldCheck size={18} />
                Key Strengths
              </h4>
              <ul className="space-y-3">
                {report.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-bold text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6"
            >
              <h4 className="flex items-center gap-2 text-red-400 font-black mb-4">
                <AlertTriangle size={18} />
                Critical Concerns
              </h4>
              <ul className="space-y-3">
                {report.concerns.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-bold text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Right: Roles & Hiring Readiness */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 border border-primary/20 rounded-[2.5rem] p-8 text-center"
          >
            <UserCheck size={40} className="mx-auto text-primary mb-4" />
            <h3 className="text-sm uppercase font-black text-muted tracking-widest mb-2">Hiring Readiness</h3>
            <p className="text-3xl font-black text-white">{report.hiring_readiness}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8"
          >
            <h3 className="text-sm uppercase font-black text-muted tracking-widest mb-6 flex items-center gap-2">
              <Briefcase size={16} />
              Recommended Roles
            </h3>
            <div className="space-y-4">
              {report.recommended_roles.map((role, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-white font-bold flex items-center gap-3">
                   <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary text-xs">
                     {i+1}
                   </div>
                   {role}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSummary;
