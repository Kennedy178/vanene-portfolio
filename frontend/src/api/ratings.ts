import { apiClient } from './client';

export interface ApprovedRating {
  id: string;
  name: string;
  role_company: string;
  rating: number;
  quote: string;
  created_at: string;
}

export interface PaginatedRatings {
  items: ApprovedRating[];
  total: number;
  page: number;
  pageSize: number;
}

export interface RatingSubmission {
  name: string;
  role_company: string;
  rating: number;
  quote: string;
  email?: string;
  // Honeypot field - real users never fill this in. If it's non-empty,
  // the backend silently discards the submission. See ARCHITECTURE.md section 7.
  website?: string;
}

const PAGE_SIZE = 6;

export function getApprovedRatings(page = 1) {
  return apiClient.get<PaginatedRatings>(
    `/api/v1/ratings/approved?page=${page}&page_size=${PAGE_SIZE}`
  );
}

export function submitRating(payload: RatingSubmission) {
  return apiClient.post<{ status: string }>('/api/v1/ratings', payload);
}