import checkAllowedHosts from '~/utils/checkAllowedHosts';

const TOKEN = 'cLWXseJEOV8Wj9kXtScsOuyDtduS8exSuQafrY8dTVsCg37pU8ZqadetIuW4jwji';

export default defineEventHandler(async (event) => {
  const referer = getRequestHeader(event, 'referer');
  const refererURL = referer && new URL(referer);

  if (!refererURL) {
    setResponseStatus(event, 400, 'Bad Request');
    return 'Bad Request';
  }

  const host = refererURL.host;
  const token = getRequestHeader(event, 'X-Cache-Token');

  if (!checkAllowedHosts(host) || token !== TOKEN) {
    setResponseStatus(event, 400, 'Bad Request');
    return 'Bad Request';
  }

  try {
    await useStorage('cache').clear();

    setResponseHeaders(event, {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': refererURL.origin,
    });

    return { result: 'success' };

  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Clear cache error',
      data: error,
    });
  }
});
