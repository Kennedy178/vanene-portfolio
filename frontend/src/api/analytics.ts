// src/api/analytics.ts
import { apiClient } from './client';

export function trackPageview(sessionId: string, path: string) {
  // Fire-and-forget - a failed analytics call should never surface to the
  // user or block anything. Swallow errors here rather than propagating.
  return apiClient
    .post<void>('/api/v1/analytics/pageview', { session_id: sessionId, path })
    .catch((error) => {
      console.warn('Pageview tracking failed (non-fatal):', error);
    });
}