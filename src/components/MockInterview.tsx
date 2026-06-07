import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, RotateCcw, Lightbulb } from 'lucide-react';
import type { InterviewQuestion } from '../types';

interface Props {
  questions: InterviewQuestion[];
}

const MockInterview: React.FC<Props> = ({ questions }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
  };

  return (
    <div className="mt-8">
      {!isActive ? (
        <button
          onClick={() => setIsActive(true)}
          className="w-full bg-gradient-to-r from-primary to-secondary p-8 rounded-[2.5rem] flex items-center justify-between group hover:scale-[1.02] transition-all shadow-2xl shadow-primary/20"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white">
              <Play fill="white" size={28} />
            </div>
            <div className="text-left">
              <h4 className="text-2xl font-black text-white mb-1">Start Mock Interview</h4>
              <p className="text-white/70 font-medium italic">Simulate a real technical round one question at a time.</p>
            </div>
          </div>
          <ChevronRight size={32} className="text-white/50 group-hover:text-white transition-colors" />
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[3rem] p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between mb-12">
            <span className="text-muted font-black text-xs uppercase tracking-widest">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <button
              onClick={() => setIsActive(false)}
              className="text-muted hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-[200px] flex flex-col justify-center"
            >
              <h3 className="text-3xl font-black text-white leading-tight mb-8">
                {currentQuestion.question}
              </h3>

              <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={16} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Guidance (Expected Topics)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.topics.map((topic, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 rounded-lg text-xs font-bold text-primary border border-primary/20">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <button
              onClick={handleRestart}
              className="flex items-center gap-2 text-muted hover:text-white font-bold transition-all"
            >
              <RotateCcw size={18} />
              Restart
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MockInterview;
