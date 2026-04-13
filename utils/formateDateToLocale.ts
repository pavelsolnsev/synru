/**
 * Форматирует дату в локальном формате.
 *
 * @param {string} date - Дата в формате "DD.MM.YYYY".
 * @param {Intl.DateTimeFormatOptions | null} [options=null] - Параметры форматирования даты.
 * @return {string} - Строка, представляющая отформатированную дату в соответствии с указанными параметрами.
 *
 * @example
 * // Возвращает "31 декабря 2009 г."
 * formateDateToLocale("31.12.2009");
 */
export default function formateDateToLocale(date: string, options: Intl.DateTimeFormatOptions | null = null): string {
  if (typeof date !== 'string' || !date) return date;

  const [day, month, year] = date.split('.').map(Number);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Date(year, month - 1, day).toLocaleString('ru-RU', options ?? defaultOptions);
};
