const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export function getMediaUrl(path: string | null | undefined) {
  if (!path) {
    return null;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (API_BASE_URL.startsWith("http://") || API_BASE_URL.startsWith("https://")) {
    try {
      return `${new URL(API_BASE_URL).origin}${normalizedPath}`;
    } catch {
      return normalizedPath;
    }
  }

  return normalizedPath;
}
