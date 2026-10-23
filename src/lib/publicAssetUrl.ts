/** Resolve data-driven public assets against Vite's deployment base path. */
export function publicAssetUrl(
  path: string,
  baseUrl = import.meta.env.BASE_URL,
): string {
  // Keep external URLs, generated downloads, and document anchors intact.
  if (!path || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;

  const base = `${baseUrl.replace(/\/+$/, '')}/`;
  if (path.startsWith(base)) return path;
  return `${base}${path.replace(/^(?:\.\/|\/)+/, '')}`;
}
