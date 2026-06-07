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
      whileHover={{ scale: 1.02 }}
      className="liquid-glass p-8 rounded-3xl relative"
    >
      <div className="absolute top-8 right-8 text-primary/10">
        <Quote size={40} fill="currentColor" />
      </div>

      <p className="text-text text-lg leading-relaxed mb-8 italic">
        "{testimonial.content}"
      </p>

      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
        />
        <div>
          <h4 className="font-bold text-text">{testimonial.name}</h4>
          <p className="text-muted text-sm">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
