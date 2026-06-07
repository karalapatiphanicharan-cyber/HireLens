import React from 'react';
import { Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                HireLens
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              AI-powered Resume Analyzer, ATS Optimizer, and Job Match Platform. Empowering candidates with data-driven career insights.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted hover:text-primary transition-colors">
                {/* Twitter Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                {/* LinkedIn Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                {/* Github Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-muted text-sm hover:text-primary transition-colors">Features</a></li>
              <li><a href="#dashboard" className="text-muted text-sm hover:text-primary transition-colors">Dashboard</a></li>
              <li><a href="#" className="text-muted text-sm hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted text-sm hover:text-primary transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted text-sm hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted text-sm hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="text-muted text-sm hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="text-muted text-sm hover:text-primary transition-colors">Guides</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted text-sm hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted text-sm hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted text-sm hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted text-sm hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} HireLens AI. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-muted text-xs cursor-pointer hover:text-primary transition-colors">System Status</span>
            <span className="text-muted text-xs cursor-pointer hover:text-primary transition-colors">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
