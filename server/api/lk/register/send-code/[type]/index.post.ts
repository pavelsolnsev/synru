import { FetchError } from 'ofetch';

type SendCodeType = 'email' | 'sms';

export default defineEventHandler(async (event) => {
  const type = event.context.params?.type;

  if (!stringIsSendCodeType(type)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Bad request',
    });
  }

  const body = await readBody(event);

  try {
    await $fetch(`${useRuntimeConfig(event).BASE_LK_API}/api/v1/auth/register/send-code/${type}`, {
      method: 'POST',
      body,
    });

    return sendNoContent(event);
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

function stringIsSendCodeType(type: string | undefined): type is SendCodeType {
  return typeof type === 'string' && ['email', 'sms'].includes(type);
}