import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Link as LinkIcon, Globe, GraduationCap, Briefcase, Code, Award, FileText } from 'lucide-react';
import type { ParsedData, AnalysisResponse } from '../types';
import SkillTag from './SkillTag';
import ATSScoreCard from './ATSScoreCard';
import JobMatchCard from './JobMatchCard';
import SkillMatchCard from './SkillMatchCard';
import SuggestionCard from './SuggestionCard';

// Using a generic icon for GitHub since "Github" export might be missing or named differently
const GitHubIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ResumeResultProps {
  data: ParsedData;
  analysis?: AnalysisResponse;
}

const ResumeResult: React.FC<ResumeResultProps> = ({ data, analysis }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter">
          Analysis <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Complete</span>
        </h1>
        <p className="text-muted text-xl font-medium">We've extracted deep professional intelligence from your profile.</p>
      </div>

      {/* Analysis Section (Phase 3) */}
      {analysis && (
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ATSScoreCard score={analysis.ats_score} />
            <JobMatchCard score={analysis.job_match_score} />
          </div>

          <SkillMatchCard
            matching={analysis.matching_skills}
            missing={analysis.missing_skills}
          />

          <SuggestionCard suggestions={analysis.suggestions} />

          <div className="mt-20 flex items-center gap-4 mb-10">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-muted font-black uppercase tracking-[0.3em] text-xs">Resume Details</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>
        </div>
      )}

      {/* Existing Data Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Info */}
        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-primary/20 transition-all">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary glow-primary">
              <User size={24} />
            </div>
            <h3 className="text-2xl font-black text-white">Personal Identity</h3>
          </div>
          <div className="space-y-6">
            <InfoItem icon={<User size={18} />} label="Full Name" value={data.name} />
            <InfoItem icon={<Mail size={18} />} label="Email Address" value={data.email} />
            <InfoItem icon={<Phone size={18} />} label="Phone Number" value={data.phone} />
          </div>
        </motion.div>

        {/* Links */}
        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-secondary/20 transition-all">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-black text-white">Connect Intelligence</h3>
          </div>
          <div className="space-y-6">
            <LinkItem icon={<LinkIcon size={18} />} label="LinkedIn" value={data.linkedin} />
            <LinkItem icon={<GitHubIcon size={18} />} label="GitHub" value={data.github} />
            <LinkItem icon={<Globe size={18} />} label="Portfolio" value={data.portfolio} />
          </div>
        </motion.div>
      </div>

      {/* Skills */}
      <motion.div variants={itemVariants} className="mt-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-accent/20 transition-all">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Code size={24} />
          </div>
          <h3 className="text-2xl font-black text-white">Core Competencies</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          {data.skills.map((skill) => (
            <SkillTag key={skill} skill={skill} />
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div variants={itemVariants} className="mt-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-primary/20 transition-all">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary glow-primary">
            <GraduationCap size={24} />
          </div>
          <h3 className="text-2xl font-black text-white">Education & Academic Profile</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.education.map((edu, index) => (
            <div key={index} className="bg-[#030712]/40 border border-white/5 p-8 rounded-[2rem] hover:border-primary/20 transition-all">
              <p className="text-primary font-black text-xs uppercase tracking-widest mb-3">{edu.degree}</p>
              <h4 className="text-2xl font-black text-white mb-6">{edu.university}</h4>
              <div className="flex items-center justify-between text-muted font-bold text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white/5 rounded flex items-center justify-center">
                    <div className="w-1 h-1 bg-muted rounded-full" />
                  </div>
                  {edu.duration}
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-lg border border-secondary/20">
                  CGPA: {edu.cgpa}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div variants={itemVariants} className="mt-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-secondary/20 transition-all">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Briefcase size={24} />
          </div>
          <h3 className="text-2xl font-black text-white">Professional Experience</h3>
        </div>
        <div className="bg-[#030712]/40 border border-white/5 p-8 rounded-[2rem] space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="flex items-start gap-4">
               <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
               <p className="text-muted font-medium leading-relaxed">{exp}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Projects */}
      <motion.div variants={itemVariants} className="mt-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-accent/20 transition-all">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Code size={24} />
          </div>
          <h3 className="text-2xl font-black text-white">Key Projects</h3>
        </div>
        <div className="space-y-8">
          {data.projects.map((project, index) => (
            <div key={index} className="bg-[#030712]/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-accent/20 transition-all group/proj">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-8 bg-accent rounded-full group-hover/proj:scale-y-125 transition-transform" />
                <h4 className="text-2xl font-black text-white">{project.title}</h4>
              </div>
              <ul className="space-y-4">
                {project.description.split('\n').filter((line: string) => line.trim()).map((line: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-muted font-medium leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    {line.replace(/^•\s*/, '').replace(/^-\s*/, '').replace(/^## •\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div variants={itemVariants} className="mt-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-primary/20 transition-all">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary glow-primary">
            <Award size={24} />
          </div>
          <h3 className="text-2xl font-black text-white">Certifications & Recognition</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.certifications.map((cert, index) => (
            <div key={index} className="bg-[#030712]/40 border border-white/5 p-6 rounded-2xl hover:bg-primary/5 transition-all flex items-center gap-4">
              <Award size={20} className="text-primary flex-shrink-0" />
              <p className="text-white font-bold text-sm leading-tight">{cert}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-20 flex justify-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all flex items-center gap-4 backdrop-blur-3xl"
        >
          <FileText size={24} />
          Upload Another Resume
        </button>
      </div>
    </motion.div>
  );
};

const InfoItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="bg-[#030712]/40 p-6 rounded-3xl border border-white/5 group/item hover:border-primary/20 transition-all">
    <p className="text-muted font-black text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
      {icon} {label}
    </p>
    <p className="text-white font-black text-lg truncate">{value}</p>
  </div>
);

const LinkItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="bg-[#030712]/40 p-6 rounded-3xl border border-white/5 group/item hover:border-secondary/20 transition-all">
    <p className="text-muted font-black text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
      {icon} {label}
    </p>
    <div className="flex items-center justify-between">
      <p className="text-white font-black text-lg truncate flex-1">{value}</p>
      {value !== "Not Detected" && (
        <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors">
          <LinkIcon size={18} />
        </a>
      )}
    </div>
  </div>
);

export default ResumeResult;
