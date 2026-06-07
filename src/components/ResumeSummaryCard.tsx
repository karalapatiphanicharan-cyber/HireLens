import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ResumeSummaryCardProps {
  summary: string;
}

const ResumeSummaryCard: React.FC<ResumeSummaryCardProps> = ({ summary }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-primary/20 transition-all mb-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary glow-primary">
          <Sparkles size={24} />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">AI Resume Summary</h3>
      </div>

      <div className="relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent rounded-full opacity-50" />
        <p className="text-muted text-xl font-medium leading-relaxed italic pl-6">
          "{summary}"
        </p>
      </div>
    </motion.div>
  );
};

export default ResumeSummaryCard;
