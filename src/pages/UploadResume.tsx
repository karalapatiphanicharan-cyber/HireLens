import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UploadZone from '../components/UploadZone';
import ResumeResult from '../components/ResumeResult';
import JobDescriptionInput from '../components/JobDescriptionInput';
import { uploadResume, analyzeResume } from '../services/api';
import type { ParsedData, AnalysisResponse } from '../types';
import { Loader2, Sparkles } from 'lucide-react';

const UploadResume: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [jobDescription, setJobDescription] = useState('');
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
      setError(err.response?.data?.detail || 'An error occurred during upload.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!parsedData || !jobDescription.trim()) return;

    setAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeResume({
        resume_data: parsedData,
        job_description: jobDescription
      });
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred during analysis.');
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <main className="pt-40 pb-20 px-6">
        <div className="container mx-auto">
          {!analysisResult ? (
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-8 glow-primary">
                  <Sparkles size={16} />
                  <span>Phase 3: ATS & Job Matching</span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-black mb-8 tracking-tighter">
                  {!parsedData ? (
                    <>Upload Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Resume</span></>
                  ) : (
                    <>Analyze <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Job Match</span></>
                  )}
                </h1>
                <p className="text-xl text-muted font-medium max-w-2xl mx-auto leading-relaxed">
                  {!parsedData
                    ? "Our advanced AI will parse your resume in seconds, extracting your skills and professional identity."
                    : "Paste the job description below to see how your resume stacks up against the requirements."
                  }
                </p>
              </motion.div>

              <div className="relative">
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
                      <Loader2 size={80} className="text-primary animate-spin mb-8" />
                      <h3 className="text-3xl font-black mb-4">Analyzing Resume...</h3>
                    </motion.div>
                  ) : !parsedData ? (
                    <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <UploadZone onFileSelect={handleFileSelect} />
                    </motion.div>
                  ) : (
                    <JobDescriptionInput
                      value={jobDescription}
                      onChange={setJobDescription}
                      onSubmit={handleAnalyze}
                      isLoading={analyzing}
                    />
                  )}
                </AnimatePresence>

                {error && (
                  <p className="mt-8 text-red-400 font-bold bg-red-500/10 p-4 rounded-2xl border border-red-500/20 inline-block mx-auto">
                    {error}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <ResumeResult data={parsedData!} analysis={analysisResult} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadResume;
