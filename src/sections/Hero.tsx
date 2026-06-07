import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, Play, BarChart3, Target, Users, Sparkles, Zap } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-32 lg:pt-60 lg:pb-52 overflow-hidden bg-[#030712]">
      {/* Aurora Background Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] aurora-primary blur-[150px] opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] aurora-secondary blur-[150px] opacity-20 animate-pulse" />

      {/* Floating Particles (CSS only representation) */}
      <div className="particles-container opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [Math.random() * 100, Math.random() * 1000],
              x: [Math.random() * 100, Math.random() * 1000],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-8 glow-primary">
                <Sparkles size={16} />
                <span>Next-Gen Career Intelligence</span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                AI-Powered <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                  Resume Intelligence
                </span>
              </h1>

              <p className="text-xl text-muted leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0 font-medium">
                Unlock your full professional potential. Our advanced AI analyzes your resume, optimizes for ATS, and matches you with top-tier opportunities instantly.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <Link to="/upload">
                  <button className="bg-primary text-white px-10 py-5 rounded-[1.5rem] font-black text-xl flex items-center gap-3 hover:bg-primary/90 transition-all shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 glow-primary group">
                    <Upload size={24} className="group-hover:rotate-12 transition-transform" />
                    Upload Resume
                  </button>
                </Link>
                <button className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-[1.5rem] font-black text-xl flex items-center gap-3 hover:bg-white/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-xl">
                  <Play size={24} fill="currentColor" />
                  Try Demo
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 flex items-center gap-6 justify-center lg:justify-start text-muted"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-[2px]" />
                    <img
                      src={`https://i.pravatar.cc/100?u=user${i + 10}`}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-[#030712] relative z-10"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left font-bold text-sm">
                <p className="text-white">10,000+ candidates</p>
                <p className="text-muted text-xs">Optimized their future</p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="flex-1 relative w-full lg:w-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="relative z-10 perspective-[1000px]"
            >
              <div className="bg-[#0F172A]/40 backdrop-blur-3xl p-6 rounded-[3.5rem] shadow-[0_0_100px_rgba(59,130,246,0.15)] border border-white/10">
                <div className="bg-[#111827] rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden">
                  {/* Internal Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10" />

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <DashboardCard
                      title="ATS Score"
                      value="87%"
                      progress={87}
                      icon={<BarChart3 size={24} />}
                      className="bg-white/5"
                    />
                    <DashboardCard
                      title="Job Match"
                      value="92%"
                      progress={92}
                      icon={<Target size={24} />}
                      className="bg-white/5"
                    />
                  </div>

                  <div className="bg-white/5 p-8 rounded-3xl mb-6 border border-white/5 group hover:border-primary/20 transition-colors">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-black text-white text-lg">Resume Strength</h4>
                      <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
                        <Zap size={16} fill="currentColor" />
                        94%
                      </div>
                    </div>
                    <div className="space-y-5">
                      {[
                        { label: 'Technical Skills', color: 'bg-primary', w: '90%' },
                        { label: 'Experience Impact', color: 'bg-secondary', w: '85%' },
                        { label: 'Keyword Optimization', color: 'bg-accent', w: '92%' }
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-xs font-bold text-muted mb-2">
                            <span>{item.label}</span>
                            <span className="text-white">{item.w}</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: item.w }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                              className={`h-full ${item.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-black text-white text-lg">Activity Feed</h4>
                      <Users size={20} className="text-primary" />
                    </div>
                    <div className="space-y-4">
                      {[
                        { text: 'Resume parsed successfully', time: '2m ago', color: 'bg-green-500' },
                        { text: 'Found 12 matching jobs', time: '1h ago', color: 'bg-primary' },
                        { text: 'Skills gap analysis complete', time: '3h ago', color: 'bg-secondary' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-sm font-medium">
                          <div className={`w-2 h-2 rounded-full ${item.color} shadow-lg shadow-${item.color}/50`} />
                          <span className="text-white flex-1">{item.text}</span>
                          <span className="text-muted text-xs">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-primary p-6 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.5)] z-20 hidden md:block border border-white/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                    <Target size={28} />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black text-white/70">Score Boost</p>
                    <p className="text-lg font-black text-white">+12% Match</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-12 -left-12 bg-[#111827] p-6 rounded-3xl shadow-2xl z-20 hidden md:block border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black text-muted tracking-widest">AI Action</p>
                    <p className="text-lg font-black text-white">Optimize Bio</p>
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
