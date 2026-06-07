import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

interface ResumeStrengthCardProps {
  score: number;
  level: string;
}

const ResumeStrengthCard: React.FC<ResumeStrengthCardProps> = ({ score, level }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-secondary/20 transition-all"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <ShieldCheck size={24} />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">Resume Strength</h3>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={440}
              initial={{ strokeDashoffset: 440 }}
              animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-secondary"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white">{score}%</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-muted font-black text-xs uppercase tracking-[0.3em] mb-2">Candidate Level</p>
          <h4 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent mb-6">
            {level}
          </h4>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1.5 }}
              className="h-full bg-gradient-to-r from-secondary to-accent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeStrengthCard;
