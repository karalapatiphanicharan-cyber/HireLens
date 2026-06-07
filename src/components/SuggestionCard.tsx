import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SuggestionCardProps {
  suggestions: string[];
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 mt-12"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Sparkles size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white">Improvement Suggestions</h3>
          <p className="text-muted font-medium">Personalized recommendations to boost your profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 bg-[#030712]/40 border border-white/5 rounded-3xl group hover:border-accent/20 transition-all"
            >
              <div className="mt-1 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform">
                <ArrowRight size={14} />
              </div>
              <p className="text-white/90 font-bold leading-relaxed">{suggestion}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-muted font-medium">Your profile looks great! No suggestions at this time.</p>
        )}
      </div>
    </motion.div>
  );
};

export default SuggestionCard;
