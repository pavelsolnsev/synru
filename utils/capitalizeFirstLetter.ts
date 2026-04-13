/**
 * Преобразует первый символ строки в заглавную букву.
 *
 * @param {string} str - Исходная строка.
 * @returns {string} - Строка с заглавной первой буквой.
 */
export default function capitalizeFirstLetter(str: string): string {
  if (typeof str !== 'string' || !str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
