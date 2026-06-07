import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Globe, Book, Briefcase, Code, Award, Target, Calendar, GraduationCap, ExternalLink } from 'lucide-react';
import type { ParsedData } from '../types';
import SkillTag from './SkillTag';

interface ResumeResultProps {
  data: ParsedData;
}

const ResultSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className = "" }) => (
  <div className={`bg-white/5 border border-white/10 p-10 rounded-[3rem] ${className}`}>
    <div className="flex items-center gap-5 mb-10">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary glow-primary">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-white tracking-tight">{title}</h3>
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
      className="w-full max-w-5xl mx-auto space-y-10"
    >
      <div className="text-center mb-20">
        <h2 className="text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
          Analysis <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Complete</span>
        </h2>
        <p className="text-2xl text-muted font-medium max-w-2xl mx-auto">We've extracted deep professional intelligence from your profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ResultSection title="Personal Identity" icon={<User size={28} />}>
          <div className="space-y-8">
            <div className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/5">
              <User size={24} className="text-primary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted mb-1">Full Name</p>
                <p className="text-xl font-bold text-white">{data.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/5">
              <Mail size={24} className="text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted mb-1">Email Address</p>
                <p className="text-xl font-bold text-white">{data.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/5">
              <Phone size={24} className="text-accent" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted mb-1">Phone Number</p>
                <p className="text-xl font-bold text-white">{data.phone}</p>
              </div>
            </div>
          </div>
        </ResultSection>

        <ResultSection title="Connect Intelligence" icon={<Globe size={28} />}>
          <div className="space-y-8">
            {[
              { label: 'LinkedIn', value: data.linkedin, icon: Globe, color: 'text-primary' },
              { label: 'GitHub', value: data.github, icon: Globe, color: 'text-white' },
              { label: 'Portfolio', value: data.portfolio, icon: Globe, color: 'text-accent' }
            ].map((link, i) => (
              <a
                key={i}
                href={link.value.startsWith('http') ? link.value : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <link.icon size={24} className={link.color} />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-muted mb-1">{link.label}</p>
                    <p className="text-lg font-bold text-white truncate max-w-[200px]">{link.value}</p>
                  </div>
                </div>
                <ExternalLink size={20} className="text-muted group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </ResultSection>
      </div>

      <ResultSection title="Core Competencies" icon={<Target size={28} />}>
        <div className="flex flex-wrap gap-4">
          {data.skills.map((skill, i) => (
            <SkillTag key={i} skill={skill} />
          ))}
          {data.skills.length === 0 && <p className="text-muted text-lg font-medium italic">No specific technical skills detected</p>}
        </div>
      </ResultSection>

      <ResultSection title="Education & Academic Profile" icon={<Book size={28} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.education.map((edu, i) => (
            <div key={i} className="p-8 bg-white/5 rounded-[2rem] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-secondary mb-4">
                  <GraduationCap size={20} />
                  <span className="text-sm font-black uppercase tracking-widest">{edu.degree}</span>
                </div>
                <h4 className="text-2xl font-black text-white mb-2">{edu.university}</h4>
              </div>
              <div className="mt-8 flex items-center justify-between text-muted border-t border-white/5 pt-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="text-sm font-bold">{edu.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1 rounded-full border border-secondary/20">
                  <span className="text-xs font-black">CGPA: {edu.cgpa}</span>
                </div>
              </div>
            </div>
          ))}
          {data.education.length === 0 || data.education[0].degree === 'Not Detected' && <p className="text-muted text-lg font-medium italic">Academic background not clearly detected</p>}
        </div>
      </ResultSection>

      <ResultSection title="Professional Experience" icon={<Briefcase size={28} />}>
        <div className="space-y-6">
          {data.experience.map((item, i) => (
            <div key={i} className="flex gap-6 p-8 bg-white/5 rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-3 h-3 rounded-full bg-primary mt-3 shrink-0 glow-primary" />
              <p className="text-lg text-muted font-medium leading-relaxed">{item}</p>
            </div>
          ))}
          {data.experience.length === 0 || data.experience[0] === 'Not Detected' && <p className="text-muted text-lg font-medium italic">Experience details not detected</p>}
        </div>
      </ResultSection>

      <ResultSection title="Key Projects" icon={<Code size={28} />}>
        <div className="grid grid-cols-1 gap-8">
          {data.projects.map((project, i) => (
            <div key={i} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all">
              <h4 className="text-2xl font-black text-white mb-4 flex items-center gap-4">
                <div className="w-2 h-8 bg-accent rounded-full" />
                {project.title}
              </h4>
              <p className="text-lg text-muted font-medium leading-relaxed pl-6">{project.description}</p>
            </div>
          ))}
          {data.projects.length === 0 || data.projects[0].title === 'Not Detected' && <p className="text-muted text-lg font-medium italic">No specific projects identified</p>}
        </div>
      </ResultSection>

      <ResultSection title="Certifications & Recognition" icon={<Award size={28} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.certifications.map((item, i) => (
            <div key={i} className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/5">
              <Award className="text-amber-500 shrink-0" size={24} />
              <span className="text-lg font-bold text-white">{item}</span>
            </div>
          ))}
          {data.certifications.length === 0 || data.certifications[0] === 'Not Detected' && <p className="text-muted text-lg font-medium italic">No certifications detected</p>}
        </div>
      </ResultSection>

      <div className="text-center pt-10 pb-32">
        <button
          onClick={() => window.location.reload()}
          className="bg-white/5 text-white border border-white/20 px-12 py-6 rounded-[2rem] font-black text-2xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95 shadow-2xl"
        >
          Upload Another Resume
        </button>
      </div>
    </motion.div>
  );
};

export default ResumeResult;
