/**
 * Форматирует число, добавляя ведущий ноль, если оно меньше 10.
 *
 * @param {number} number - Число, которое нужно отформатировать.
 * @returns {string} - Отформатированное число в виде строки с ведущим нулем, если это необходимо.
 *
 * @example
 * formatNumberWithLeadingZero(5);  // Возвращает "05"
 * formatNumberWithLeadingZero(10); // Возвращает "10"
 * formatNumberWithLeadingZero(3);  // Возвращает "03"
 * formatNumberWithLeadingZero(15); // Возвращает "15"
 */
export default function formatNumberWithLeadingZero(number: number): string {
  return number < 10 ? `0${number}` : number.toString();
};
