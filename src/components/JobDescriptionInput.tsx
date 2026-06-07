import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Send } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-12"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary glow-primary">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">Paste Job Description</h3>
            <p className="text-muted font-medium">Add the job details to see how well you match</p>
          </div>
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste job description here... (e.g. Skills, Requirements, Role details)"
          className="w-full h-64 bg-[#030712]/50 border border-white/10 rounded-3xl p-6 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-all resize-none font-medium text-lg mb-8"
        />

        <div className="flex justify-center">
          <button
            onClick={onSubmit}
            disabled={isLoading || !value.trim()}
            className="bg-primary text-white px-12 py-5 rounded-[1.5rem] font-black text-xl flex items-center gap-3 hover:bg-primary/90 transition-all shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 glow-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Send size={24} />
                </motion.div>
                Analyzing...
              </>
            ) : (
              <>
                <Send size={24} />
                Analyze Match
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDescriptionInput;
