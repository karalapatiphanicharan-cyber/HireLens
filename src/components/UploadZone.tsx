import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const fileError = rejectedFiles[0].errors[0];
      if (fileError.code === 'file-too-large') {
        setError('File size exceeds 10 MB.');
      } else if (fileError.code === 'file-invalid-type') {
        setError('Only PDF and DOCX files are allowed.');
      } else {
        setError(fileError.message);
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      setError(null);
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative group cursor-pointer transition-all duration-500 rounded-[2.5rem] border-2 border-dashed p-12 text-center
          ${isDragActive ? 'border-primary bg-primary/5 scale-102' : 'border-white/10 hover:border-white/20 bg-white/5'}`}
      >
        <input {...getInputProps()} />

        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ y: isDragActive ? -10 : 0 }}
            className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6
              ${isDragActive ? 'bg-primary text-white glow-primary' : 'bg-white/5 text-muted'}`}
          >
            <Upload size={40} />
          </motion.div>

          <h3 className="text-2xl font-black text-white mb-4">
            {isDragActive ? 'Drop it here!' : 'Upload Resume'}
          </h3>

          <p className="text-muted font-medium mb-8 max-w-xs mx-auto">
            Drag and drop your resume here, or <span className="text-primary">browse files</span>
          </p>

          <div className="flex items-center gap-6 justify-center">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <FileText size={14} className="text-primary" />
              PDF, DOCX
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <AlertCircle size={14} className="text-secondary" />
              MAX 10MB
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 font-bold"
          >
            <X size={20} className="cursor-pointer" onClick={() => setError(null)} />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadZone;
