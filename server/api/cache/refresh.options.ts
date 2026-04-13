import checkAllowedHosts from '~/utils/checkAllowedHosts';

export default defineEventHandler((event) => {
  const referer = getRequestHeader(event, 'referer');
  const refererURL = referer && new URL(referer);

  if (!refererURL) {
    return;
  }

  const host = refererURL.host;

  if (!checkAllowedHosts(host)) {
    return;
  }

  const headers = {
    'Access-Control-Allow-Origin': refererURL.origin,
    'Access-Control-Allow-Headers': 'x-cache-token',
    'Access-Control-Request-Method': 'GET',
  };

  setHeaders(event, headers);
});
