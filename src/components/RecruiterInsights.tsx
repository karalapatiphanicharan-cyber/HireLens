import React from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, AlertTriangle } from 'lucide-react';

interface RecruiterInsightsProps {
  insights: {
    strengths: string[];
    weaknesses: string[];
  };
}

const RecruiterInsights: React.FC<RecruiterInsightsProps> = ({ insights }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-secondary/20 transition-all mt-8"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <Search size={24} />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">Recruiter Insights</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#030712]/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-emerald-500/20 transition-all">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 size={20} className="text-emerald-500" />
            <h4 className="text-xl font-black text-white tracking-tight">Candidate Strengths</h4>
          </div>
          <ul className="space-y-4">
            {insights.strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-4 text-muted font-bold leading-relaxed">
                <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0" />
                {str}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#030712]/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-amber-500/20 transition-all">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle size={20} className="text-amber-500" />
            <h4 className="text-xl font-black text-white tracking-tight">Identified Gaps</h4>
          </div>
          <ul className="space-y-4">
            {insights.weaknesses.map((weak, i) => (
              <li key={i} className="flex items-start gap-4 text-muted font-bold leading-relaxed">
                <div className="w-1 h-1 rounded-full bg-amber-500 mt-2.5 flex-shrink-0" />
                {weak}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default RecruiterInsights;
