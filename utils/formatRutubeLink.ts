export default function formatRutubeLink(rutubeVideoID: string | null) {
  if (typeof rutubeVideoID !== 'string' || rutubeVideoID.trim() === '') return '';

  const rutubeLink = 'https://rutube.ru';

  if (rutubeVideoID.includes(rutubeLink)) return rutubeVideoID;

  return `${rutubeLink}/play/embed/${rutubeVideoID}`;
}
