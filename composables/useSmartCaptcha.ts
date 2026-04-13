export function useSmartCaptcha() {
  const captchaId = ref<number | null>(null);

  function initCaptcha(containerId: string, onSuccess: (_token: string) => void) {
    const config = useRuntimeConfig();
    const siteKey = config.public.SITE_KEY as string;

    if (!siteKey || !window.smartCaptcha) return;

    const el = document.getElementById(containerId);
    if (!el) return;

    captchaId.value = window.smartCaptcha.render(el, {
      sitekey: siteKey,
      invisible: true,
      hideShield: true,
      callback: onSuccess,
    });
  }

  function executeCaptcha() {
    if (!window.smartCaptcha || captchaId.value === null) {
      return;
    }
    window.smartCaptcha.execute(captchaId.value);
  }

  return {
    initCaptcha,
    executeCaptcha,
  };
}

