import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Info } from 'lucide-react';
import type { InterviewReadiness } from '../types';

interface Props {
  readiness: InterviewReadiness;
}

const InterviewReadinessCard: React.FC<Props> = ({ readiness }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-primary/20 transition-all"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary glow-primary">
          <CheckCircle size={24} />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">Interview Readiness</h3>
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
              animate={{ strokeDashoffset: 440 - (440 * readiness.score) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-primary"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white">{readiness.score}%</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-muted font-black text-xs uppercase tracking-[0.3em] mb-2">Readiness Status</p>
          <h4 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6">
            {readiness.level}
          </h4>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 text-left">
            <Info size={20} className="text-primary flex-shrink-0 mt-1" />
            <p className="text-muted font-medium text-sm leading-relaxed">
              {readiness.explanation}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewReadinessCard;
