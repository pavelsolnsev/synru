import type { FetchError } from 'ofetch';

export interface CheckUserResponse {
  exists: boolean;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  try {
    return await $fetch<CheckUserResponse>(`${config.BASE_LK_API}/api/v1/auth/check-by-phone`, {
      method: 'POST',
      body,
    });

  } catch (err) {
    const error = err as FetchError;

    throw createError({
      statusCode: error?.statusCode || 500,
      data: error?.data || {},
      message: error?.data?.message || 'Ошибка сервера, повторите позже',
    });
  }
});
