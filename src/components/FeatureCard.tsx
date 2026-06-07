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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="liquid-glass p-8 rounded-3xl group"
    >
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-text">{feature.title}</h3>
      <p className="text-muted leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
