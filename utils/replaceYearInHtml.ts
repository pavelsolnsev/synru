export function replaceYearInHTML(htmlString: string): string {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const yearRegex = /\b20\d{2}\b/g;

  return htmlString.replace(yearRegex, String(currentYear));
}
