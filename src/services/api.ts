import axios from 'axios';
import type { UploadResponse, AnalysisRequest, AnalysisResponse } from '../types';

import { API_BASE_URL } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadResume = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<UploadResponse>('/api/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const analyzeResume = async (request: AnalysisRequest): Promise<AnalysisResponse> => {
  const response = await api.post<AnalysisResponse>('/api/analyze-resume', request);
  return response.data;
};

export default api;
