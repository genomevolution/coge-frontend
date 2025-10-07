// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  GENOMES: `${API_BASE_URL}/genomes/`,
  BIOSAMPLES: `${API_BASE_URL}/biosamples/`,
  EXPERIMENTS: `${API_BASE_URL}/experiments/`,
  FILES_DOWNLOAD: `${API_BASE_URL}/files/download`,
} as const;


export const API_BASE = API_BASE_URL;

export type ApiEndpoint = keyof typeof API_ENDPOINTS;


export const buildFileDownloadUrl = (filePath: string): string => {
  return `${API_ENDPOINTS.FILES_DOWNLOAD}?filePath=${encodeURIComponent(filePath)}`;
};

export const triggerFileDownload = (filePath: string, fileName: string): void => {
  if (!filePath) {
    console.error('No file path available for download');
    return;
  }

  try {
    const downloadUrl = buildFileDownloadUrl(filePath);

    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = fileName;
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
