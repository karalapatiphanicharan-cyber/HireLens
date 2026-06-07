import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target, CheckCircle2, AlertCircle, Sparkles, Zap, TrendingUp } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

const DashboardPreview: React.FC = () => {
  const skills = ['Python', 'React', 'SQL', 'Machine Learning'];
  const missingSkills = ['Docker', 'AWS'];

  return (
    <section id="dashboard" className="py-32 bg-[#030712] relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/3 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold mb-8">
                <TrendingUp size={16} />
                <span>Real-time Analytics</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                Deep Insights into Your <span className="text-secondary">Career Profile</span>
              </h2>
              <p className="text-xl text-muted mb-12 leading-relaxed font-medium">
                Go beyond simple keyword matching. Our AI provides deep semantic analysis of your professional standing and identifies exactly what you need to scale your career.
              </p>

              <div className="space-y-8">
                {[
                  { icon: CheckCircle2, text: "Real-time ATS scoring", color: "text-green-500", bg: "bg-green-500/10" },
                  { icon: Zap, text: "Instant skill gap analysis", color: "text-amber-500", bg: "bg-amber-500/10" },
                  { icon: Sparkles, text: "AI-powered strategy panel", color: "text-primary", bg: "bg-primary/10" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-5 justify-center lg:justify-start group"
                  >
                    <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon size={24} />
                    </div>
                    <span className="text-xl font-bold text-white">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3 w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-[#0F172A]/40 backdrop-blur-3xl p-10 rounded-[4rem] shadow-2xl border border-white/10 relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <DashboardCard
                  title="ATS Score"
                  value="87%"
                  progress={87}
                  icon={<BarChart3 size={24} />}
                  subtitle="Top 10% candidate"
                  isCircular={true}
                />
                <DashboardCard
                  title="Job Match"
                  value="92%"
                  progress={92}
                  icon={<Target size={24} />}
                  subtitle="46/50 Match"
                  isCircular={true}
                />
                <DashboardCard
                  title="Strength"
                  value="94%"
                  progress={94}
                  icon={<Zap size={24} />}
                  subtitle="Elite Profile"
                  isCircular={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] group hover:border-green-500/30 transition-colors">
                  <h4 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                    <CheckCircle2 className="text-green-500" size={24} />
                    Core Skills Identified
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {skills.map((skill) => (
                      <span key={skill} className="px-5 py-3 bg-green-500/5 text-green-400 text-sm font-bold rounded-2xl border border-green-500/20 group-hover:bg-green-500/10 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] group hover:border-amber-500/30 transition-colors">
                  <h4 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                    <AlertCircle className="text-amber-500" size={24} />
                    High-Impact Skill Gaps
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {missingSkills.map((skill) => (
                      <span key={skill} className="px-5 py-3 bg-amber-500/5 text-amber-400 text-sm font-bold rounded-2xl border border-amber-500/20 group-hover:bg-amber-500/10 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 p-10 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -z-10 group-hover:scale-150 transition-transform duration-700" />
                <h4 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                   <Sparkles className="text-primary animate-pulse" size={28} />
                   AI Recommendation Panel
                </h4>
                <div className="space-y-6">
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <p className="text-white font-bold mb-2">Refine your Professional Summary</p>
                      <p className="text-muted text-sm font-medium">Your summary is strong but lacks quantifiable metrics. Add data-driven achievements to increase ATS score by 5%.</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <p className="text-white font-bold mb-2">Certification Opportunity</p>
                      <p className="text-muted text-sm font-medium">Adding an "AWS Certified Developer" badge would make you a 99% match for the target role.</p>
                   </div>
                </div>
              </div>

              {/* Line Chart Placeholder */}
              <div className="mt-10 bg-white/5 p-10 rounded-[3rem] border border-white/5">
                 <div className="flex justify-between items-center mb-10">
                    <h4 className="text-xl font-black text-white">Score Progression</h4>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                       <TrendingUp size={16} />
                       +14% this month
                    </div>
                 </div>
                 <div className="h-40 w-full flex items-end gap-2 px-2">
                    {[30, 45, 35, 60, 55, 80, 75, 94].map((h, i) => (
                       <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="flex-1 bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-lg relative group/bar"
                       >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                             {h}%
                          </div>
                       </motion.div>
                    ))}
                 </div>
                 <div className="flex justify-between mt-6 px-2 text-muted text-[10px] font-bold uppercase tracking-widest">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
