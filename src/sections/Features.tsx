import React from 'react';
import { motion } from 'framer-motion';
import { features } from '../data/features';
import FeatureCard from '../components/FeatureCard';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Features</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-text mb-6">
              Everything you need to <span className="text-primary">stand out</span>
            </h3>
            <p className="text-muted text-lg">
              Our comprehensive suite of AI tools is designed to give you a competitive edge in your job search.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
