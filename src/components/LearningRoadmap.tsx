import React from 'react';
import { motion } from 'framer-motion';
import { Map, ChevronRight, Zap, Target, Rocket } from 'lucide-react';

interface RoadmapProps {
  roadmap: {
    current: string[];
    next: string[];
    future: string[];
  };
}

const LearningRoadmap: React.FC<RoadmapProps> = ({ roadmap }) => {
  const steps = [
    { title: "Current Skills", skills: roadmap.current, icon: <Zap size={20} />, color: "from-primary/50 to-primary" },
    { title: "Next To Learn", skills: roadmap.next, icon: <Target size={20} />, color: "from-secondary/50 to-secondary" },
    { title: "Future Goals", skills: roadmap.future, icon: <Rocket size={20} />, color: "from-accent/50 to-accent" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-primary/20 transition-all mt-8"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary glow-primary">
          <Map size={24} />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">Learning Roadmap</h3>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-[5.5rem] left-[5rem] right-[5rem] h-[2px] bg-white/5" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-8 shadow-2xl group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <h4 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                {step.title} {index < steps.length - 1 && <ChevronRight size={18} className="hidden lg:block text-muted" />}
              </h4>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {step.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-muted">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LearningRoadmap;
