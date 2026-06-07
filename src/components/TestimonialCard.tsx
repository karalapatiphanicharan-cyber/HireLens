import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-[#111827] border border-white/5 p-10 rounded-[2.5rem] relative shadow-2xl overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full group-hover:bg-primary/10 transition-colors" />

      <div className="absolute top-10 right-10 text-primary/20 group-hover:text-primary/40 transition-colors">
        <Quote size={50} fill="currentColor" />
      </div>

      <p className="text-white text-xl leading-relaxed mb-10 font-medium italic relative z-10">
        "{testimonial.content}"
      </p>

      <div className="flex items-center gap-5 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-[2px] opacity-50" />
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full border-2 border-white/10 relative z-10"
          />
        </div>
        <div>
          <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
          <p className="text-muted text-sm font-semibold tracking-wide uppercase">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
