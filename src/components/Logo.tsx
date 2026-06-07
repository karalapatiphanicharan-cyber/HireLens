import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo_grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6"/>
            <stop offset="1" stopColor="#8B5CF6"/>
          </linearGradient>
        </defs>
        {/* Geometric Lens Shape */}
        <circle cx="16" cy="16" r="14" stroke="url(#logo_grad)" strokeWidth="2.5" />
        <circle cx="16" cy="16" r="6" fill="url(#logo_grad)" fillOpacity="0.2" stroke="url(#logo_grad)" strokeWidth="1.5" />
        {/* Abstract Resume Lines */}
        <path d="M12 22H20" stroke="url(#logo_grad)" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 25H18" stroke="url(#logo_grad)" strokeWidth="1.5" strokeLinecap="round" />
        {/* AI Sparkle */}
        <path d="M22 8L23.5 11L26.5 12.5L23.5 14L22 17L20.5 14L17.5 12.5L20.5 11L22 8Z" fill="url(#logo_grad)" />
      </svg>
      <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        HireLens
      </span>
    </div>
  );
};

export default Logo;
