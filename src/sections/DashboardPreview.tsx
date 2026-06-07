import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target, CheckCircle2, AlertCircle, FileText, Zap } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

const DashboardPreview: React.FC = () => {
  const skills = ['Python', 'Machine Learning', 'React', 'SQL'];
  const missingSkills = ['Docker', 'AWS'];

  return (
    <section id="dashboard" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Dashboard</h2>
              <h3 className="text-4xl font-bold text-text mb-6">
                Deep Insights into Your Career
              </h3>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                Our dashboard gives you a bird's-eye view of your professional profile, highlighting strengths and identifying areas for growth.
              </p>

              <div className="space-y-6">
                {[
                  { icon: CheckCircle2, text: "Real-time ATS scoring", color: "text-green-500" },
                  { icon: Zap, text: "Instant skill gap analysis", color: "text-amber-500" },
                  { icon: FileText, text: "Context-aware resume improvements", color: "text-blue-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 justify-center lg:justify-start">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <span className="font-semibold text-text">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="liquid-glass p-8 rounded-[3rem] shadow-2xl relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <DashboardCard
                  title="ATS Score"
                  value="87%"
                  progress={87}
                  icon={<BarChart3 size={20} />}
                  subtitle="Top 10% of candidates in your field"
                />
                <DashboardCard
                  title="Job Match"
                  value="92%"
                  progress={92}
                  icon={<Target size={20} />}
                  subtitle="Matches 45 out of 50 key criteria"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="liquid-glass p-6 rounded-2xl border-white/40">
                  <h4 className="font-bold text-text mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" size={18} />
                    Skills Found
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-green-50 text-green-700 text-sm font-semibold rounded-xl border border-green-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="liquid-glass p-6 rounded-2xl border-white/40">
                  <h4 className="font-bold text-text mb-6 flex items-center gap-2">
                    <AlertCircle className="text-amber-500" size={18} />
                    Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {missingSkills.map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-amber-50 text-amber-700 text-sm font-semibold rounded-xl border border-amber-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 liquid-glass p-6 rounded-2xl">
                <h4 className="font-bold text-text mb-6">Experience Breakdown</h4>
                <div className="space-y-4">
                  {[
                    { label: "Frontend Development", value: 85, color: "bg-blue-500" },
                    { label: "Backend Engineering", value: 65, color: "bg-purple-500" },
                    { label: "Cloud Infrastructure", value: 40, color: "bg-cyan-500" }
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-text">{item.label}</span>
                        <span className="text-muted">{item.value}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
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
