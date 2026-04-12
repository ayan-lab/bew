/**
 * Root-relative path for same-origin Express `/api/*` routes.
 * Do not use `import.meta.env.BASE_URL` here — that is Vite's asset `base`, not the API.
 */
export function apiUrl(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}
