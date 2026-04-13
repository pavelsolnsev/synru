/**
 * Форматирует номер телефона, удаляя все символы, кроме цифр и знака "+"
 *
 * @param {string} phone - Номер телефона в строковом формате
 * @returns {string} - Отформатированный номер телефона
 * @example
 * normalizePhoneNumber('+7 (343) 312 90-16');  // Возвращает "+73433129016"
 */
export default function normalizePhoneNumber(phone: string): string {
  if (typeof phone !== 'string' || !phone) return '';
  return phone.replace(/[^0-9+]/g, '');
}
