export function useEndOfDayCount() {
  const timeLeft = shallowRef({
    hours: '0',
    minutes: '0',
    seconds: '0',
  });

  let timerInterval: NodeJS.Timeout | null = null;

  const updateTimer = () => {
    if (!import.meta.client) return;

    const now = new Date();

    // Вычисляем время конца текущих суток
    // Создаем новую дату на основе сегодняшней и устанавливаем время на 23:59:59
    const endOfDay = new Date(now);

    endOfDay.setHours(23, 59, 59, 999);

    const difference = endOfDay.getTime() - now.getTime();

    if (difference <= 0) {
      timeLeft.value = { hours: '0', minutes: '0', seconds: '0' };
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      return;
    }

    const totalSeconds = Math.floor(difference / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    timeLeft.value = {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  };

  onMounted(() => {
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  });

  onUnmounted(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  });

  return {
    timeLeft,
  };
}

