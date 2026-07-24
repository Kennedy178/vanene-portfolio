import { apiClient } from './client';

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export function submitContact(payload: ContactSubmission) {
  return apiClient.post<{ status: string }>('/api/v1/contact', payload);
}
