import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import TestimonialCard from '../components/TestimonialCard';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Testimonials</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-text mb-6">
              Success Stories from <span className="text-primary">HireLens Users</span>
            </h3>
            <p className="text-muted text-lg">
              Join thousands of professionals who have accelerated their careers with our AI-powered platform.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
