export default function formatDaysToMonths(days: string | null | undefined) {
  if (!days) return '';

  const daysNumber = Number(days);

  if (isNaN(daysNumber)) return '';

  const DAYS_IN_MONTH = 30;

  const monthsCount = daysNumber % DAYS_IN_MONTH === 0
    ? daysNumber / DAYS_IN_MONTH
    : Number(`${Math.floor(daysNumber / DAYS_IN_MONTH)}.5`);

  const monthsText = declensionOfNumber(Math.ceil(monthsCount), ['месяц', 'месяца', 'месяцев', 'месяцев']);
  return `${monthsCount} ${monthsText}`;
}
