// src/api/admin.ts
import { apiClient } from './client';
import type { ApprovedRating } from './ratings';

export interface AdminRating extends ApprovedRating {
  status: 'pending' | 'approved' | 'rejected';
  email: string | null;
}

export interface VisitorSummary {
  sessionsToday: number;
  sessionsThisWeek: number;
  pageViewsThisWeek: number;
  sessionsThisMonth: number;
  dailyPageViews: { date: string; views: number }[];
  sessionTrend: { date: string; sessions: number }[];
  topPages: { path: string; views: number }[];
  topCountries: { country: string; visits: number }[];
  deviceBreakdown: { desktop: number; mobile: number };
}

export function adminLogin(password: string) {
  return apiClient.post<{ status: string }>('/api/v1/admin/login', { password });
}

export function getAdminRatings() {
  return apiClient.get<AdminRating[]>('/api/v1/admin/ratings');
}

export function updateRatingStatus(id: string, status: 'approved' | 'rejected') {
  return apiClient.patch<{ status: string }>(`/api/v1/admin/ratings/${id}`, { status });
}

export function getVisitorSummary() {
  return apiClient.get<VisitorSummary>('/api/v1/admin/analytics');
}