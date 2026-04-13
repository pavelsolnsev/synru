import { ycId as yaCounterId } from './useYandexCounter';

export const sendYandexMetricaGoal = () => {

  const reachGoal = (goalName: string, params: Record<string, string>) => {
    if (import.meta.dev) return;

    const id = yaCounterId.value;
    if (!id) return;

    const urlLocation = window?.location.toString() || '';
    const dataParams = {
      url: urlLocation,
      ...params,
    };

    try {
      window?.ym(id, 'reachGoal', goalName, dataParams);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    reachGoal,
  };
};
