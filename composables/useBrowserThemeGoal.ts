export function useBrowserThemeGoal() {
  const { reachGoal } = sendYandexMetricaGoal();

  function getTheme() {
    if (typeof window === 'undefined' || !window.matchMedia) return 'not_found';

    try {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';

      return 'other';
    } catch {
      return 'not_found';
    }
  }

  function sendGoal() {
    const theme = getTheme();

    reachGoal('browser_theme', {
      theme,
    });
  };

  tryOnMounted(sendGoal);
};
