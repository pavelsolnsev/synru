
export default function formatDate(dateString) {
  if (typeof dateString !== 'string') return dateString

  const [date] = dateString.split(' ');
  return date ?? ''
}