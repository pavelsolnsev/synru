import { STATE } from '~/constants';
import type { CourseEntity } from '~/types';
export default function addHelpCardsToPrograms(cards: CourseEntity[]) {
  if (!Array.isArray(cards)) return cards;

  const {
    currentText,
    generateNewText,
    resetState: resetHelpCardsState,
  } = useHelpChooseCardText();

  resetHelpCardsState();

  const cardsLength = cards.length;

  const CARDS_STEP = 11;

  const MIN_INITIAL_INDEX = 0;

  const MAX_INITIAL_INDEX = cardsLength - 1 < CARDS_STEP
    ? cardsLength - 1
    : CARDS_STEP;

  const initialIndex = useState(STATE.COURSES_LIST_INITIAL_HELP_CARD_INDEX, () => generateRandomInteger(MIN_INITIAL_INDEX, MAX_INITIAL_INDEX));
  const indices = useState<null | number[]>(STATE.COURSES_LIST_HELP_CARDS_INDICES);

  if (!indices.value) {
    indices.value = [initialIndex.value];

    const availableNextIndicesMap: Record<string, number[]> = {
      0: [1, 2, 4, 5, 7, 8],
      1: [0, 2, 3, 5, 6, 8],
      2: [0, 1, 3, 4, 6, 7],

      3: [1, 2, 4, 5, 7, 8, 10, 11],
      4: [0, 2, 3, 5, 6, 8, 9, 11],
      5: [0, 1, 3, 4, 6, 7, 9, 10],

      6: [1, 2, 4, 5, 7, 8, 10, 11],
      7: [0, 2, 3, 5, 6, 8, 9, 11],
      8: [0, 1, 3, 4, 6, 7, 9, 10],

      9: [4, 5, 7, 8, 10, 11],
      10: [3, 5, 6, 8, 9, 11],
      11: [3, 4, 6, 7, 9, 10],
    };

    let lastIndex = indices.value[0];

    for (let i = CARDS_STEP; i <= cardsLength - 1; i += CARDS_STEP) {
      const availableNextIndices = availableNextIndicesMap[lastIndex] ?? availableNextIndicesMap[0];
      const generateIndex = generateRandomInteger(0, availableNextIndices.length - 1);
      const nextIndex = availableNextIndices[generateIndex];

      indices.value?.push(nextIndex + i);
      lastIndex = nextIndex;
    }
  }

  const helpCardTextData = useState<Record<string, HelpChooseCard>>(STATE.COURSES_LIST_HELP_CARDS_TEXT_DATA, () => ({}));

  const formatCards = cards.reduce((acc, card, index) => {
    const needToAddHelpCard = indices.value?.includes(index);

    if (needToAddHelpCard) {
      if (!helpCardTextData.value[card.id + index]) {
        helpCardTextData.value[card.id + index] = currentText.value;
      }

      const helpCardTexData = helpCardTextData.value[card.id + index];

      acc.push({
        title: helpCardTexData.title,
        description: helpCardTexData.description,
        btn: helpCardTexData.btn,
        text: helpCardTexData.text,
        id: card.id + index,
      });
      generateNewText();
    }
    acc.push(card);

    return acc;
  }, [] as Array<CourseEntity | HelpChooseCard>);

  if (import.meta.client) {
    clearNuxtState(STATE.COURSES_LIST_INITIAL_HELP_CARD_INDEX);
    clearNuxtState(STATE.COURSES_LIST_HELP_CARDS_INDICES);
    clearNuxtState(STATE.COURSES_LIST_HELP_CARDS_TEXT_DATA);
  }

  return formatCards;
}
