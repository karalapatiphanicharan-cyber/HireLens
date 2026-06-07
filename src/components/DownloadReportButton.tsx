import React from 'react';
import { Download, Loader2 } from 'lucide-react';

interface DownloadReportButtonProps {
  onDownload: () => void;
  isGenerating: boolean;
  label?: string;
}

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({
  onDownload,
  isGenerating,
  label = "Download Analysis Report"
}) => {
  return (
    <button
      onClick={onDownload}
      disabled={isGenerating}
      className="bg-accent text-white px-8 py-4 rounded-[1.25rem] font-black text-lg flex items-center gap-3 hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
    >
      {isGenerating ? (
        <Loader2 size={24} className="animate-spin" />
      ) : (
        <Download size={24} className="group-hover:-translate-y-1 transition-transform" />
      )}
      {isGenerating ? "Generating Report..." : label}
    </button>
  );
};

export default DownloadReportButton;
