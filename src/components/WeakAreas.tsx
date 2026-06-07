import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface Props {
  areas: string[];
}

const WeakAreas: React.FC<Props> = ({ areas }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-amber-500/20 transition-all mt-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
          <AlertCircle size={24} />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">Areas To Improve</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {areas.map((area, index) => (
          <div key={index} className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl flex items-center gap-4 group/area hover:bg-amber-500/10 transition-all">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <p className="text-white font-bold text-sm leading-tight">{area}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeakAreas;
