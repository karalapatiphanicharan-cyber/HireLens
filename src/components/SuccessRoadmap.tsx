import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Compass, Trophy, TrendingUp } from 'lucide-react';

interface Props {
  roadmap: {
    current: string[];
    next: string[];
    future: string[];
  };
}

const SuccessRoadmap: React.FC<Props> = ({ roadmap }) => {
  const steps = [
    { title: "Immediate Focus", skills: roadmap.current, icon: <Flag size={20} />, color: "text-primary" },
    { title: "Short-Term Focus", skills: roadmap.next, icon: <TrendingUp size={20} />, color: "text-secondary" },
    { title: "Long-Term Prep", skills: roadmap.future, icon: <Trophy size={20} />, color: "text-accent" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-primary/20 transition-all mt-8"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary glow-primary">
          <Compass size={24} />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">Interview Success Roadmap</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-[#030712]/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-primary/20 transition-all group/step">
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${step.color} mb-6 group-hover/step:scale-110 transition-transform`}>
              {step.icon}
            </div>
            <h4 className="text-xl font-black text-white mb-6 tracking-tight">{step.title}</h4>
            <div className="space-y-3">
              {step.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full bg-current ${step.color}`} />
                  <span className="text-muted font-bold text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SuccessRoadmap;
