// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  GENOMES: `${API_BASE_URL}/genomes/`,
  BIOSAMPLES: `${API_BASE_URL}/biosamples/`,
  EXPERIMENTS: `${API_BASE_URL}/experiments/`,
} as const;

export type ApiEndpoint = keyof typeof API_ENDPOINTS;
