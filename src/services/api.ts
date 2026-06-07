import axios from 'axios';
import type { UploadResponse } from '../types';

const API_URL = 'http://localhost:8000/api';

export const uploadResume = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post<UploadResponse>(`${API_URL}/upload-resume`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
