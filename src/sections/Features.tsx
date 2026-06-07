import React from 'react';
import { motion } from 'framer-motion';
import { features } from '../data/features';
import FeatureCard from '../components/FeatureCard';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-[#030712] relative overflow-hidden">
      {/* Aurora Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full aurora-primary opacity-5 blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-6">Capabilities</h2>
            <h3 className="text-5xl lg:text-7xl font-black text-white mb-10 tracking-tighter">
              The Intelligence to <span className="text-primary">Win Any Room</span>
            </h3>
            <p className="text-muted text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              We've built the most advanced AI career engine to ensure you don't just apply, but dominate your job market.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
