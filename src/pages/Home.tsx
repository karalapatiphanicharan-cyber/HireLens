import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import HowItWorks from '../sections/HowItWorks';
import DashboardPreview from '../sections/DashboardPreview';
import Testimonials from '../sections/Testimonials';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <Testimonials />

        {/* Final CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="liquid-glass p-12 lg:p-20 rounded-[3rem] bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
              {/* Decorative particles */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-white rounded-full blur-xl"
                    style={{
                      width: Math.random() * 100 + 50 + 'px',
                      height: Math.random() * 100 + 50 + 'px',
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                  Ready to optimize your career?
                </h2>
                <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                  Join thousands of job seekers who use HireLens to get noticed by top employers and land their dream roles.
                </p>
                <div className="flex flex-col sm:row justify-center gap-6">
                  <button className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-black/10">
                    Get Started Free
                  </button>
                  <button className="bg-transparent text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">
                    View Pricing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
