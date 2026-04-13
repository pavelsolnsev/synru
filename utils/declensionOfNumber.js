/**
 * Declines depending on the number
 * @param {number} number
 * @param {string[]} titles Strings for decline: one, two, few
 * @param {boolean} [full=false] If true - returns number + string
 * @return {string}
 */

export default function declensionOfNumber(number, titles, full = false) {
  const cases = [2, 0, 1, 1, 1, 2];

  const result =
    titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  return full ? `${number} ${result}` : result;
}
