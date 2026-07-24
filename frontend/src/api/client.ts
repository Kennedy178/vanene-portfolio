// Single source of truth for the backend API base URL.
// Never hardcode a URL anywhere else - always import API_BASE_URL from here.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE_URL) {
  // Fails loudly in dev if the env var is missing, instead of silently
  // hitting the wrong host or a relative path that happens to 404.
  console.warn(
    'VITE_API_BASE_URL is not set - check .env.local (dev) or .env.production (build).'
  );
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include', // needed for the admin session cookie
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(`API error ${response.status}: ${message}`);
  }

  // 204 No Content etc.
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body }),
};
