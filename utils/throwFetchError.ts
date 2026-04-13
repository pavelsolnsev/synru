import type { FetchError } from 'ofetch';

export default function throwFetchError(data: { error: FetchError, path: string }) {
  const { error, path } = data;
  const errorMessage = error.message;
  const errorData = JSON.stringify(error.data?.data);

  const message = `message: ${errorMessage}, errorData: ${errorData}, path: ${path}`;

  throw createError({
    statusCode: error.statusCode,
    fatal: true,
    message,
  });
}
