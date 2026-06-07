import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Play, BarChart3, Target, PieChart, Users, Sparkles } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold text-text leading-[1.1] mb-6">
                HireLens
              </h1>
              <h2 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent mb-6">
                AI Resume Analyzer, ATS Optimizer & Job Match Platform
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                Upload your resume and instantly receive ATS scores, skill analysis, job matching insights, and AI-powered recommendations to land your dream job.
              </p>

              <div className="flex flex-col sm:row items-center gap-4 justify-center lg:justify-start">
                <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 w-full sm:w-auto">
                  <Upload size={20} />
                  Upload Resume
                </button>
                <button className="bg-white text-text border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
                  <Play size={20} fill="currentColor" />
                  Try Demo
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-12 flex items-center gap-4 justify-center lg:justify-start text-muted text-sm"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?u=user${i}`}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  />
                ))}
              </div>
              <p>Trusted by 10,000+ job seekers</p>
            </motion.div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="liquid-glass p-4 rounded-[2.5rem] shadow-2xl">
                <div className="bg-slate-50 rounded-[2rem] p-6 border border-white/50">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <DashboardCard
                      title="ATS Score"
                      value="87%"
                      progress={87}
                      icon={<BarChart3 size={18} />}
                      className="bg-white/80"
                    />
                    <DashboardCard
                      title="Job Match"
                      value="92%"
                      progress={92}
                      icon={<Target size={18} />}
                      className="bg-white/80"
                    />
                  </div>
                  <div className="liquid-glass p-6 rounded-2xl mb-4 bg-white/80">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-text">Resume Insights</h4>
                      <PieChart size={18} className="text-primary" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-primary rounded-full" />
                      </div>
                      <div className="h-2 w-[85%] bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[60%] bg-secondary rounded-full" />
                      </div>
                      <div className="h-2 w-[60%] bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[90%] bg-accent rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="liquid-glass p-6 rounded-2xl bg-white/80">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-text">Candidate Analytics</h4>
                      <Users size={18} className="text-primary" />
                    </div>
                    <div className="flex items-end gap-2 h-24">
                      {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary/20 rounded-t-md hover:bg-primary transition-colors cursor-pointer"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 liquid-glass p-4 rounded-2xl shadow-xl z-20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <Target size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted">Optimized</p>
                    <p className="text-sm font-bold">Ready to Apply</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 liquid-glass p-4 rounded-2xl shadow-xl z-20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted">AI Suggestion</p>
                    <p className="text-sm font-bold">Add "Leadership"</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
