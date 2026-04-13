export default function generateRandomFloat(min: number, max: number, decimalPlaces: number): number {
  const random = Math.random() * (max - min) + min;
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(random * multiplier) / multiplier;
}
