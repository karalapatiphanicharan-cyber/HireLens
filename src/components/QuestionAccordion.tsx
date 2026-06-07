import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import type { InterviewQuestion } from '../types';

interface Props {
  title: string;
  questions: InterviewQuestion[];
  icon: React.ReactNode;
  accentColor: string;
}

const QuestionAccordion: React.FC<Props> = ({ title, questions, icon, accentColor }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (questions.length === 0) return null;

  return (
    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 group hover:border-white/20 transition-all">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentColor}`}>
          {icon}
        </div>
        <h4 className="text-xl font-black text-white">{title}</h4>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={index} className="border border-white/5 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-white font-bold text-sm leading-tight pr-4">{q.question}</span>
              {openIndex === index ? <ChevronUp size={18} className="text-muted" /> : <ChevronDown size={18} className="text-muted" />}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 border-t border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={14} className="text-muted" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted">Expected Topics</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {q.topics.map((topic, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-muted border border-white/10">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionAccordion;
