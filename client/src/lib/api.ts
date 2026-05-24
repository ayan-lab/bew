/**
 * Builds the full URL for backend `/api/*` routes.
 * - Dev (default): leave `VITE_API_URL` unset; Vite proxies `/api` to the API server.
 * - Direct / production: set `VITE_API_URL` (e.g. `http://localhost:5000`).
 */
export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
  return base ? `${base}${normalized}` : normalized;
}
