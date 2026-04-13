export default function getArticleDate(dateAndTime: string) {
  if (typeof dateAndTime !== 'string' || dateAndTime.trim() === '') return '';

  const SPLITTER = ' ';

  const datePath = dateAndTime?.split(SPLITTER)[0] ?? '';
  return formateDateToLocale(datePath);
}
