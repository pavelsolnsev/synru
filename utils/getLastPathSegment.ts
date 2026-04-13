/**
 * Returns the last path segment of a given URL string.
 * If the URL string is malformed, tries to extract the last path segment from the string.
 * @param urlString - URL string to extract the last path segment from
 * @returns The last path segment of the URL string, or an empty string if the URL string is malformed or does not contain any path segments.
 */
export function getLastPathSegment(urlString: string) {
  try {
    const url = new URL(urlString);
    const pathSegments = url.pathname.split('/').filter(segment => segment !== '');

    return pathSegments.length > 0
      ? pathSegments[pathSegments.length - 1]
      : '';
  } catch (error) {
    const cleanPath = urlString.split('?')[0].split('#')[0];
    const pathSegments = cleanPath.split('/').filter(segment => segment !== '');

    return pathSegments.length > 0
      ? pathSegments[pathSegments.length - 1]
      : '';
  }
}
