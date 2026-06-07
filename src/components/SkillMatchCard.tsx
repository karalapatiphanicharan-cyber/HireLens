import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SkillMatchCardProps {
  matching: string[];
  missing: string[];
}

const SkillMatchCard: React.FC<SkillMatchCardProps> = ({ matching, missing }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {/* Matching Skills */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
            <CheckCircle2 size={20} />
          </div>
          <h3 className="text-xl font-black text-white">Matching Skills</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {matching.length > 0 ? (
            matching.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                {skill}
              </span>
            ))
          ) : (
            <p className="text-muted text-sm font-medium">No matching skills found.</p>
          )}
        </div>
      </motion.div>

      {/* Missing Skills */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400">
            <XCircle size={20} />
          </div>
          <h3 className="text-xl font-black text-white">Missing Skills</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {missing.length > 0 ? (
            missing.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                {skill}
              </span>
            ))
          ) : (
            <p className="text-muted text-sm font-medium">No missing skills detected.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillMatchCard;
