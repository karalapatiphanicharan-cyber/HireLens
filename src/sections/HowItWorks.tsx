import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Search, Target, FileText } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Upload Resume",
    description: "Drop your resume in any format (PDF, DOCX) onto our secure platform.",
    icon: Upload,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "AI Extracts Information",
    description: "Our advanced neural networks parse your skills, experience, and achievements.",
    icon: Cpu,
    color: "bg-purple-500"
  },
  {
    id: 3,
    title: "ATS Evaluation",
    description: "We run your resume through thousands of ATS algorithms to identify issues.",
    icon: Search,
    color: "bg-cyan-500"
  },
  {
    id: 4,
    title: "Job Matching",
    description: "Compare your profile against your target job descriptions with high precision.",
    icon: Target,
    color: "bg-indigo-500"
  },
  {
    id: 5,
    title: "Generate Insights",
    description: "Receive actionable recommendations to improve your score and land interviews.",
    icon: FileText,
    color: "bg-blue-600"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Process</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-text mb-6">
              How HireLens Works
            </h3>
            <p className="text-muted text-lg">
              Five simple steps to a perfectly optimized resume and better job prospects.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden lg:block" />

          <div className="space-y-20 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="flex-1 w-full">
                  <div className={`p-8 rounded-3xl liquid-glass ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${step.color} text-white font-bold mb-4 shadow-lg shadow-primary/20`}>
                      {step.id}
                    </span>
                    <h4 className="text-2xl font-bold text-text mb-4">{step.title}</h4>
                    <p className="text-muted leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className="relative z-10 hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-background shadow-xl">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
