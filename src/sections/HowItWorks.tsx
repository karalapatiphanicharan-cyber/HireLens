import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Search, Target, FileText, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Upload Resume",
    description: "Drop your resume in any format onto our secure, encrypted neural gateway.",
    icon: Upload,
    color: "from-blue-600 to-cyan-500",
    glow: "shadow-blue-500/20"
  },
  {
    id: 2,
    title: "AI Semantic Extraction",
    description: "Our LLMs extract not just keywords, but the core impact and value of your work.",
    icon: Cpu,
    color: "from-purple-600 to-indigo-500",
    glow: "shadow-purple-500/20"
  },
  {
    id: 3,
    title: "ATS Deep Analysis",
    description: "Battle-test your resume against 100+ different ATS algorithms and gatekeepers.",
    icon: Search,
    color: "from-cyan-600 to-blue-500",
    glow: "shadow-cyan-500/20"
  },
  {
    id: 4,
    title: "Precision Job Match",
    description: "Get a mathematical match score against your target role's hidden requirements.",
    icon: Target,
    color: "from-indigo-600 to-purple-500",
    glow: "shadow-indigo-500/20"
  },
  {
    id: 5,
    title: "Actionable Intelligence",
    description: "Implement AI-driven improvements that directly translate to more interviews.",
    icon: FileText,
    color: "from-blue-700 to-blue-500",
    glow: "shadow-blue-600/20"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 bg-[#030712]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-6">Workflow</h2>
            <h3 className="text-5xl lg:text-7xl font-black text-white mb-10 tracking-tighter">
              A Machine For <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Career Growth</span>
            </h3>
            <p className="text-muted text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              Our streamlined process takes the guesswork out of job searching and puts the power of AI in your hands.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/5 via-primary/40 to-primary/5 -translate-x-1/2 hidden lg:block" />

          <div className="space-y-40 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row items-center gap-20 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="flex-1 w-full group">
                  <div className={`p-12 rounded-[3rem] bg-[#111827] border border-white/5 relative overflow-hidden hover:border-primary/30 transition-colors ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-32 h-32 bg-primary/5 blur-[50px] -z-10`} />

                    <span className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br ${step.color} text-white font-black text-2xl mb-8 shadow-2xl ${step.glow}`}>
                      {step.id}
                    </span>
                    <h4 className="text-3xl font-black text-white mb-6 group-hover:text-primary transition-colors">{step.title}</h4>
                    <p className="text-muted text-lg font-medium leading-relaxed">{step.description}</p>

                    <div className={`mt-10 flex items-center gap-3 text-primary font-black ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                       Step {step.id} Details <ArrowRight size={20} />
                    </div>
                  </div>
                </div>

                <div className="relative z-10 hidden lg:flex items-center justify-center w-24 h-24 rounded-[2rem] bg-[#0F172A] border-4 border-primary/20 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                  <step.icon className="w-10 h-10 text-primary" />
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
