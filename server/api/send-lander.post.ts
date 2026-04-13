import type { z, ZodObject  } from 'zod/v4';
import { formSchema, formSchemaEmailOnly, formReviewSchema, type FormErrors } from '~~/utils/validators';
import { FetchError } from 'ofetch';

interface RequestBody {
  name?: string;
  phone?: string;
  personalDataAgree?: string;
  [key: string]: unknown;
}

export default defineEventHandler(async (event) => {
  const landerData = await readBody<RequestBody>(event);
  const form = landerData.form as string;

  const validationSchemasByForm: Record<string, ZodObject> = {
    'no_sertifikat': formSchemaEmailOnly,
    'otziv': formReviewSchema,
  };

  const validatedResult = (validationSchemasByForm[form] ?? formSchema).safeParse(landerData);

  if (!validatedResult.success) {
    const errors = validatedResult.error.issues.reduce(
      (acc: FormErrors, error: z.core.$ZodIssue) => {
        const key = error.path[0] as keyof FormData;

        acc[key as keyof FormErrors] = error.message;
        return acc;
      },
      {} as FormErrors,
    );

    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'В форме содержатся ошибки',
      data: errors,
    });
  }

  if (landerData.form !== 'no_sertifikat') {
    landerData.phone = landerData.phone?.replace(/\D/g, '');
  }
  landerData.personalDataAgree = landerData.personalDataAgree ? 'on' : 'off';

  const config = useRuntimeConfig(event);

  try {
    const response = await $fetch(`${config.public.apiBase}/api/services/lander`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: {
        'data': {
          'type': 'lander',
          'attributes': landerData,
        },
      } ,
    });

    return {
      success: true,
      result: response,
    };

  } catch (error) {
    console.error(error);

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
