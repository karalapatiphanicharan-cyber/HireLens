import axios from 'axios';
import type { UploadResponse, AnalysisRequest, AnalysisResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadResume = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<UploadResponse>('/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const analyzeResume = async (request: AnalysisRequest): Promise<AnalysisResponse> => {
  const response = await api.post<AnalysisResponse>('/analyze-resume', request);
  return response.data;
};

export default api;
