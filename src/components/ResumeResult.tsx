import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Globe, Book, Briefcase, Code, Award, Target } from 'lucide-react';
import type { ParsedData } from '../types';
import SkillTag from './SkillTag';

interface ResumeResultProps {
  data: ParsedData;
}

const ResultSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] mb-8">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-white">{title}</h3>
    </div>
    {children}
  </div>
);

const ResumeResult: React.FC<ResumeResultProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter">
          Analysis <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Complete</span>
        </h2>
        <p className="text-xl text-muted font-medium">We've successfully extracted intelligence from your resume.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ResultSection title="Personal Info" icon={<User size={24} />}>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <User size={20} className="text-muted" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-muted">Full Name</p>
                <p className="text-lg font-bold text-white">{data.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail size={20} className="text-muted" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-muted">Email Address</p>
                <p className="text-lg font-bold text-white">{data.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={20} className="text-muted" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-muted">Phone Number</p>
                <p className="text-lg font-bold text-white">{data.phone}</p>
              </div>
            </div>
          </div>
        </ResultSection>

        <ResultSection title="Links" icon={<Globe size={24} />}>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Globe size={20} className="text-muted" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-muted">LinkedIn</p>
                <p className="text-lg font-bold text-white truncate max-w-xs">{data.linkedin}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Globe size={20} className="text-muted" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-muted">GitHub</p>
                <p className="text-lg font-bold text-white truncate max-w-xs">{data.github}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Globe size={20} className="text-muted" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-muted">Portfolio</p>
                <p className="text-lg font-bold text-white truncate max-w-xs">{data.portfolio}</p>
              </div>
            </div>
          </div>
        </ResultSection>
      </div>

      <ResultSection title="Skills Intelligence" icon={<Target size={24} />}>
        <div className="flex flex-wrap gap-3">
          {data.skills.map((skill, i) => (
            <SkillTag key={i} skill={skill} />
          ))}
          {data.skills.length === 0 && <p className="text-muted">Not Detected</p>}
        </div>
      </ResultSection>

      <div className="grid grid-cols-1 gap-8">
        <ResultSection title="Experience" icon={<Briefcase size={24} />}>
          <ul className="space-y-4">
            {data.experience.map((item, i) => (
              <li key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <p className="text-muted font-medium leading-relaxed">{item}</p>
              </li>
            ))}
            {data.experience.length === 0 || data.experience[0] === 'Not Detected' && <p className="text-muted">Not Detected</p>}
          </ul>
        </ResultSection>

        <ResultSection title="Education" icon={<Book size={24} />}>
          <ul className="space-y-4">
            {data.education.map((item, i) => (
              <li key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                <p className="text-muted font-medium leading-relaxed">{item}</p>
              </li>
            ))}
            {data.education.length === 0 || data.education[0] === 'Not Detected' && <p className="text-muted">Not Detected</p>}
          </ul>
        </ResultSection>

        <ResultSection title="Projects" icon={<Code size={24} />}>
          <ul className="space-y-4">
            {data.projects.map((item, i) => (
              <li key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <p className="text-muted font-medium leading-relaxed">{item}</p>
              </li>
            ))}
            {data.projects.length === 0 || data.projects[0] === 'Not Detected' && <p className="text-muted">Not Detected</p>}
          </ul>
        </ResultSection>

        <ResultSection title="Certifications" icon={<Award size={24} />}>
          <ul className="space-y-4">
            {data.certifications.map((item, i) => (
              <li key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                <p className="text-muted font-medium leading-relaxed">{item}</p>
              </li>
            ))}
            {data.certifications.length === 0 || data.certifications[0] === 'Not Detected' && <p className="text-muted">Not Detected</p>}
          </ul>
        </ResultSection>
      </div>

      <div className="text-center mt-12 pb-20">
        <button
          onClick={() => window.location.reload()}
          className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-[1.5rem] font-black text-xl hover:bg-white/10 transition-all hover:scale-105"
        >
          Upload Another Resume
        </button>
      </div>
    </motion.div>
  );
};

export default ResumeResult;
