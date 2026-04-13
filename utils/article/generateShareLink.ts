export default function generateShareLink(path: string, customDomain?: string) {
  const DEFAULT_DOMAIN = 'https://example.com';

  return customDomain ? `${customDomain}${path}` : `${DEFAULT_DOMAIN}${path}`;
}
