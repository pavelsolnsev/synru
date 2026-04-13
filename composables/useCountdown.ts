function declensionOfNumber(number: number, titles: string[], full = false) {
  const cases = [2, 0, 1, 1, 1, 2];

  const result =
    titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];

  return full ? `${number} ${result}` : result;
}

export function useCountdown(targetDate: string | Date | null) {
  const timeLeft = ref({
    days: { value: '0', label: 'дней' },
    hours: { value: '00', label: 'часов' },
    minutes: { value: '00', label: 'минут' },
    seconds: { value: '00', label: 'секунд' },
  });

  let timerInterval: NodeJS.Timeout | null = null;

  const updateTimer = () => {
    if (!import.meta.client || !targetDate) {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      return;
    }

    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference <= 0) {
      if (timerInterval) clearInterval(timerInterval);
      return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    timeLeft.value = {
      days: {
        value: String(d),
        label: declensionOfNumber(d, ['день', 'дня', 'дней']),
      },
      hours: {
        value: String(h).padStart(2, '0'),
        label: declensionOfNumber(h, ['час', 'часа', 'часов']),
      },
      minutes: {
        value: String(m).padStart(2, '0'),
        label: declensionOfNumber(m, ['минута', 'минуты', 'минут']),
      },
      seconds: {
        value: String(s).padStart(2, '0'),
        label: declensionOfNumber(s, ['секунда', 'секунды', 'секунд']),
      },
    };
  };

  onMounted(() => {
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  });

  onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval);
  });

  return { timeLeft };
}
