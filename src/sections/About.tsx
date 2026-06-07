import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap } from 'lucide-react';

const About: React.FC = () => {
  const benefits = [
    {
      icon: <Target className="text-primary" size={32} />,
      title: "For Candidates",
      description: "Optimize your resume for modern Applicant Tracking Systems (ATS) and gain the edge in competitive job markets."
    },
    {
      icon: <Users className="text-secondary" size={32} />,
      title: "For Recruiters",
      description: "Instantly identify high-potential candidates through deep skill analysis and automated suitability scoring."
    },
    {
      icon: <Zap className="text-accent" size={32} />,
      title: "AI-Powered",
      description: "Leverage state-of-the-art NLP and machine learning to extract intelligence that traditional parsers miss."
    }
  ];

  return (
    <section id="about" className="py-32 bg-[#030712] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter">
              What is <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">HireLens?</span>
            </h2>
            <p className="text-xl text-muted font-medium leading-relaxed">
              HireLens is a production-grade AI platform designed to bridge the gap between talented professionals and their dream careers. We transform static resumes into dynamic professional intelligence, providing actionable insights for both sides of the hiring equation.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{benefit.title}</h3>
              <p className="text-muted font-medium leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
