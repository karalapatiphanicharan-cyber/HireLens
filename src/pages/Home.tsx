import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import HowItWorks from '../sections/HowItWorks';
import DashboardPreview from '../sections/DashboardPreview';
import Testimonials from '../sections/Testimonials';
import About from '../sections/About';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
