interface SendConfirmationCodeOptions {
  type?: 'email' | 'sms';
  onSuccess?: () => void;
  onError?: (_error: unknown) => void;
}

export default async function sendConfirmationCode(
  data: Record<string, string>,
  options: SendConfirmationCodeOptions = {}
) {
  const {
    type = 'sms',
    onSuccess = () => void 0,
    onError = () => void 0,
  } = options;

  try {
    await $fetch(`/api/lk/register/send-code/${type}`, {
      method: 'POST',
      body: data,
    });

    onSuccess();
  } catch (error) {
    onError(error);
  }
}
