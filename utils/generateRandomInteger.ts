export default function generateRandomInteger(min: number, max: number) {
  if (typeof min !== 'number' || typeof max !== 'number') return 0;

  const randomInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randomInteger);
}
