import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import TestimonialCard from '../components/TestimonialCard';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-32 bg-[#030712] relative">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-0 w-full h-1/2 bg-secondary/5 blur-[150px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-6">Social Proof</h2>
            <h3 className="text-5xl lg:text-7xl font-black text-white mb-10 tracking-tighter">
              The Engine of <span className="text-secondary">Success</span>
            </h3>
            <p className="text-muted text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              We've helped the best in the industry secure their next big move. Here's what they say about the HireLens advantage.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
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
