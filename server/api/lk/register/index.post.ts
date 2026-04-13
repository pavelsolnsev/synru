import { FetchError } from 'ofetch';

interface RegistrationResponse {
  access_token: string
  expires_in: number
  token_type: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const response = await $fetch<RegistrationResponse>(`${useRuntimeConfig(event).BASE_LK_API}/api/v1/auth/register`, {
      method: 'POST',
      body,
  });

  setCookie(event, 'jwt_auth', response.access_token, {
    expires: new Date(Date.now() + response.expires_in * 1000),
    maxAge: response.expires_in,
  });

   return { success: true };
  } catch (error) {
    if (!(error instanceof FetchError)) {
      console.error(error);
      return;
    }

    throw createError({
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      message: error.message,
      data: error.data,
    });
  }
});