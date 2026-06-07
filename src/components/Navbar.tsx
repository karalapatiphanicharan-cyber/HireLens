import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileBarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { getLastReport, generatePDFReport } from '../services/report';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastReport, setLastReport] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setLastReport(getLastReport());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadLast = async () => {
    const report = getLastReport();
    if (report) {
      setIsDownloading(true);
      try {
        await generatePDFReport(report.data, report.analysis);
      } catch (err) {
        console.error(err);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Features', id: 'features' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Dashboard', id: 'dashboard' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="container mx-auto px-6">
        <div className={`liquid-glass rounded-[2rem] px-8 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-[#0F172A]/80 shadow-2xl border-white/10' : 'bg-transparent border-transparent'}`}>
          <Link to="/" className="hover:scale-105 transition-transform">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {lastReport && (
              <button
                onClick={handleDownloadLast}
                disabled={isDownloading}
                className="text-xs font-black text-accent hover:text-accent/80 transition-colors flex items-center gap-2 border border-accent/20 px-4 py-2 rounded-full bg-accent/5 hover:bg-accent/10 cursor-pointer"
              >
                {isDownloading ? <div className="w-3 h-3 border border-accent/30 border-t-accent rounded-full animate-spin" /> : <FileBarChart size={14} />}
                Last Report
              </button>
            )}
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-semibold text-muted hover:text-white transition-colors relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
            <Link to="/upload">
              <button className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 glow-primary">
                Upload Resume
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 right-0 p-6 md:hidden"
          >
            <div className="liquid-glass rounded-3xl p-8 flex flex-col gap-6 shadow-2xl border-white/10 bg-[#0F172A]">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  className="text-xl font-bold text-white hover:text-primary transition-colors text-left cursor-pointer"
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.name}
                </button>
              ))}
              <hr className="border-white/5" />
              {lastReport && (
                <button
                  onClick={handleDownloadLast}
                  disabled={isDownloading}
                  className="w-full py-4 rounded-2xl font-bold text-lg border border-accent/20 text-accent flex items-center justify-center gap-2"
                >
                  <FileBarChart size={20} />
                  {isDownloading ? 'Downloading...' : 'Download Last Report'}
                </button>
              )}
              <Link to="/upload" onClick={() => setIsOpen(false)}>
                <button className="bg-primary text-white w-full py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
                  Upload Resume
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
