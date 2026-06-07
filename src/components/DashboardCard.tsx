import React from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  progress?: number;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  progress,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`liquid-glass p-6 rounded-2xl ${className}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-muted text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-text">{value}</h3>
        </div>
        {icon && <div className="p-2 bg-primary/5 rounded-lg text-primary">{icon}</div>}
      </div>

      {subtitle && <p className="text-muted text-xs">{subtitle}</p>}

      {progress !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardCard;
