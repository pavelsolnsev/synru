import type { CourseEntity } from '~/types';

export default function courseFormatStartDate(triggers: CourseEntity['customFields']['course_triggers']) {
  if (!triggers?.length) return '';

  const startToday = triggers[0].start_today;
  const startDays = triggers[0]?.start_days;

  if (startToday) return 'Сегодня';

  if (startDays) return startDays;

  const enDate = triggers[0].start_date ?? '';
  if (!enDate) return '';

  const [datePart] = enDate.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);

  const courseDate = new Date(year, month - 1, day);

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (courseDate <= today) {
    return 'Сегодня';
  }

  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');

  const ruDate = formateDateToLocale(`${formattedDay}.${formattedMonth}.${year}`);
  const [ruDay, ruMonth] = ruDate.split(' ');

  return `${ruDay} ${ruMonth}`;
}
