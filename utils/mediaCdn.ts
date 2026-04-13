/**
 * Медиа с legacy-путями sys3 (synergy-api / synergy-ru).
 * Задайте NUXT_PUBLIC_CDN_ORIGIN (без завершающего /), например https://cdn.example.com
 * Полный URL: {origin}/synergy-api/{rel}
 * Без origin — пустая строка (не подставлять внешний CDN продакшена).
 */
function cdnOrigin(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env?.NUXT_PUBLIC_CDN_ORIGIN) {
    return String(import.meta.env.NUXT_PUBLIC_CDN_ORIGIN).replace(/\/$/, '');
  }
  return '';
}

export function synergyApi(rel: string): string {
  const o = cdnOrigin();
  const p = rel.replace(/^\/+/, '');
  if (!o) return '';
  return `${o}/synergy-api/${p}`;
}

export function synergyRu(rel: string): string {
  const o = cdnOrigin();
  const p = rel.replace(/^\/+/, '');
  if (!o) return '';
  return `${o}/synergy-ru/${p}`;
}
