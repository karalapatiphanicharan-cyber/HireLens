import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Dashboard', href: '/#dashboard' },
    { name: 'Testimonials', href: '/#testimonials' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="container mx-auto px-6">
        <div className={`liquid-glass rounded-[2rem] px-8 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-[#0F172A]/80 shadow-2xl border-white/10' : 'bg-transparent border-transparent'}`}>
          <Link to="/" className="hover:scale-105 transition-transform">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-muted hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
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
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-bold text-white hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/5" />
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
