import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const Icon = (Icons as any)[feature.icon] || Icons.HelpCircle;

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="gradient-border p-10 rounded-[2.5rem] group overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-colors" />

      <div className="w-20 h-20 bg-white/5 rounded-[1.5rem] flex items-center justify-center mb-10 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 shadow-xl group-hover:shadow-primary/20">
        <Icon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-500" />
      </div>

      <h3 className="text-2xl font-bold mb-5 text-white tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
      <p className="text-muted leading-relaxed text-lg font-medium">
        {feature.description}
      </p>

      <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-transform">
        Learn more <Icons.ArrowRight size={16} />
      </div>
    </motion.div>
  );
};

export default FeatureCard;
