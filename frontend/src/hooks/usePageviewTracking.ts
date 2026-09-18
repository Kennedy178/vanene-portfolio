// src/hooks/usePageviewTracking.ts
import { useEffect } from 'react';
import { trackPageview } from '../api/analytics';

const SESSION_KEY = 'vanene-session-id';

function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Fires one pageview on mount, and again whenever `path` changes
 * (relevant once more routes exist beyond "/" and "/admin" - safe no-op
 * for a single-page site where path rarely changes without a full reload).
 */
export function usePageviewTracking(path: string) {
  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    trackPageview(sessionId, path);
  }, [path]);
}