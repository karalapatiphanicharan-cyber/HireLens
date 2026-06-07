import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UploadZone from '../components/UploadZone';
import ResumeResult from '../components/ResumeResult';
import { uploadResume } from '../services/api';
import type { ParsedData } from '../types';
import { Loader2, Sparkles } from 'lucide-react';

const UploadResume: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const response = await uploadResume(file);
      if (response.success) {
        setParsedData(response.data);
      } else {
        setError('Failed to parse resume. Please try again.');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred during upload. Ensure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <main className="pt-40 pb-20 px-6">
        <div className="container mx-auto">
          {!parsedData ? (
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-8 glow-primary">
                  <Sparkles size={16} />
                  <span>AI-Powered Extraction</span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-black mb-8 tracking-tighter">
                  Upload Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Resume</span>
                </h1>
                <p className="text-xl text-muted font-medium max-w-2xl mx-auto leading-relaxed">
                  Our advanced AI will parse your resume in seconds, extracting your skills, experience, and professional identity with precision.
                </p>
              </motion.div>

              <div className="relative">
                {/* Aurora background behind upload zone */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />

                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="flex flex-col items-center justify-center py-20"
                    >
                      <div className="relative">
                        <Loader2 size={80} className="text-primary animate-spin mb-8" />
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                      </div>
                      <h3 className="text-3xl font-black mb-4">Analyzing Resume...</h3>
                      <p className="text-muted font-bold animate-pulse">Running advanced AI extraction protocols</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <UploadZone onFileSelect={handleFileSelect} />

                      {error && (
                        <p className="mt-8 text-red-400 font-bold bg-red-500/10 p-4 rounded-2xl border border-red-500/20 inline-block mx-auto">
                          {error}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Fast Parsing', desc: 'Results in under 2 seconds' },
                  { title: 'Secure & Private', desc: 'Files are processed and cleared' },
                  { title: 'High Accuracy', desc: 'Powered by advanced NLP models' }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5">
                    <h4 className="text-lg font-black mb-2">{item.title}</h4>
                    <p className="text-sm text-muted font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ResumeResult data={parsedData} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadResume;
