import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generatePDFReport } from '../services/report';
import type { ParsedData, AnalysisResponse } from '../types';
import DownloadReportButton from './DownloadReportButton';
import ReportPreview from './ReportPreview';
import { X, FileText } from 'lucide-react';

interface ReportGeneratorProps {
  data: ParsedData;
  analysis: AnalysisResponse;
  onClose?: () => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ data, analysis, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePDFReport(data, analysis);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#030712]/95 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-6xl z-10"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                <FileText size={24} />
             </div>
             <h2 className="text-4xl font-black text-white tracking-tight">Generate Analysis Report</h2>
          </div>
          <div className="flex items-center gap-4">
            <DownloadReportButton
              onDownload={handleDownload}
              isGenerating={isGenerating}
            />
            {onClose && (
              <button
                onClick={onClose}
                className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>

        <ReportPreview data={data} analysis={analysis} />
      </motion.div>
    </div>
  );
};

export default ReportGenerator;
