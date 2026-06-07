import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight } from 'lucide-react';

interface CareerRole {
  title: string;
}

interface CareerRecommendationsProps {
  roles: CareerRole[];
}

const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({ roles }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-accent/20 transition-all mt-8"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Briefcase size={24} />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">Recommended Roles</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 10 }}
            className="bg-[#030712]/40 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between group/role hover:border-accent/30 transition-all"
          >
            <div>
              <p className="text-accent font-black text-[10px] uppercase tracking-widest mb-2">Role Suggestion</p>
              <h4 className="text-xl font-black text-white">{role.title}</h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted group-hover/role:bg-accent group-hover/role:text-white transition-all">
              <ArrowUpRight size={20} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CareerRecommendations;
