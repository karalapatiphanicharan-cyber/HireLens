import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface ScoreProps {
  score: number;
}

const ScoreRing: React.FC<{ score: number; color: string }> = ({ score, color }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-white/5"
        />
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut" }}
          className={color}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-black text-white"
        >
          {score}%
        </motion.span>
      </div>
    </div>
  );
};

const JobMatchCard: React.FC<ScoreProps> = ({ score }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 flex flex-col items-center text-center group hover:border-secondary/30 transition-all"
    >
      <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary mb-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        <Target size={24} />
      </div>
      <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest">Job Match</h3>
      <ScoreRing score={score} color="text-secondary" />
      <p className="mt-8 text-muted font-medium text-sm max-w-[200px]">
        Skill compatibility with the provided job description
      </p>
    </motion.div>
  );
};

export default JobMatchCard;
