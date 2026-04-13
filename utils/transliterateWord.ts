export default function transliterate(word: string) {
  if (!word || typeof word !== 'string') return '';

  const basicTransliteration = word
    .split('')
    .map((char) => dictionary[char] ?? char)
    .join('')
    .toLowerCase();

  const specialCaseTransliteration = citySpecialCases[basicTransliteration];

  return specialCaseTransliteration ?? basicTransliteration;
}

const citySpecialCases: Record<string, string> = {
  'arhangelsk': 'arkhangelsk',
  'astrahan': 'astrakhan',
  'balhash': 'balkhash',
  'blagoveschensk': 'blagoveshchensk',
  'chehov': 'chekhov',
  'mahachkala': 'makhachkala',
  'orehovo-zuevo': 'orekhovo-zuevo',
  'serpuhov': 'serpukhov',
  'scherbinka': 'shcherbinka',
  'tihoretsk': 'tikhoretsk',
  'uhta': 'ukhta',
};

const dictionary: Record<string, string> = {
  'А':'A',
  'а':'a',
  'Б':'B',
  'б':'b',
  'В':'V',
  'в':'v',
  'Г':'G',
  'г':'g',
  'Д':'D',
  'д':'d',
  'Е':'E',
  'е':'e',
  'Ё':'E',
  'ё':'e',
  'Ж':'ZH',
  'ж':'zh',
  'З':'Z',
  'з':'z',
  'И':'I',
  'и':'i',
  'Й':'Y',
  'й':'y',
  'К':'K',
  'к':'k',
  'Л':'L',
  'л':'l',
  'М':'M',
  'м':'m',
  'Н':'N',
  'н':'n',
  'О':'O',
  'о':'o',
  'П':'P',
  'п':'p',
  'Р':'R',
  'р':'r',
  'С':'S',
  'с':'s',
  'Т':'T',
  'т':'t',
  'У':'U',
  'у':'u',
  'Ф':'F',
  'ф':'f',
  'Х':'H',
  'х':'h',
  'Ц':'TS',
  'ц':'ts',
  'Ч':'CH',
  'ч':'ch',
  'Ш':'SH',
  'ш':'sh',
  'Щ':'SCH',
  'щ':'sch',
  'Ъ':'',
  'ъ':'',
  'Ы':'Y',
  'ы':'y',
  'Ь':'',
  'ь':'',
  'Э':'E',
  'э':'e',
  'Ю':'YU',
  'ю':'yu',
  'Я':'Ya',
  'я':'ya',
  ' ':'-',
};
