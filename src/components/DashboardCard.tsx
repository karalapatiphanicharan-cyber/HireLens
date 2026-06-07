import React from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  progress?: number;
  className?: string;
  isCircular?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  progress,
  className = "",
  isCircular = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-[#111827] border border-white/5 p-8 rounded-3xl ${className} hover:border-white/10 transition-colors shadow-2xl relative overflow-hidden group`}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-muted text-sm font-bold uppercase tracking-widest mb-2">{title}</p>
          <h3 className="text-4xl font-black text-white">{value}</h3>
        </div>
        {icon && <div className="p-4 bg-white/5 rounded-2xl text-primary border border-white/10 group-hover:scale-110 transition-transform">{icon}</div>}
      </div>

      {subtitle && <p className="text-muted text-sm font-medium leading-relaxed">{subtitle}</p>}

      {progress !== undefined && !isCircular && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-muted uppercase">Confidence</span>
            <span className="text-xs font-bold text-white">{progress}%</span>
          </div>
          <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent relative"
            >
              <div className="absolute top-0 right-0 w-4 h-full bg-white/20 blur-sm" />
            </motion.div>
          </div>
        </div>
      )}

      {isCircular && progress !== undefined && (
        <div className="mt-6 flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-white/5"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={351.8}
                initial={{ strokeDashoffset: 351.8 }}
                whileInView={{ strokeDashoffset: 351.8 - (351.8 * progress) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-primary"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black text-white">{value}</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardCard;
