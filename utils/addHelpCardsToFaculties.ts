import type { FacultyItem } from '~/components/sections/SFaculties/SFaculties.vue';
import { STATE } from '~/constants';

export default function addHelpCardsToPrograms(payload: { cards: FacultyItem[], initialCardCount: number }) {
  const {
    cards,
    initialCardCount,
  } = payload;

  const {
    currentText,
    generateNewText,
    resetState: resetHelpCardsState,
  } = useHelpChooseCardText();

  resetHelpCardsState();

  const cardsLength = cards.length;

  const MIN_INITIAL_INDEX = 0;

  const MAX_INITIAL_INDEX = initialCardCount > cardsLength
    ? cardsLength - 1
    : initialCardCount - 1;

  const initialIndex = useState(STATE.FACULTIES_INITIAL_HELP_CARD_INDEX, () => generateRandomInteger(MIN_INITIAL_INDEX, MAX_INITIAL_INDEX));

  const indices = useState<null | number[]>(STATE.FACULTIES_HELP_CARDS_INDICES);

  if (!indices.value) {
    const MAX_STEP = 10;

    indices.value = [initialIndex.value];

    const secondIndexMap: Record<string, number> = {
      0: 10,
      1: 9,
      2: 13,
      3: 12,
      4: 16,
      5: 15,
      6: 15,
    };

    const secondIndex = secondIndexMap[initialIndex.value];

    indices.value.push(secondIndex);

    for (let i = secondIndex + MAX_STEP ; i <= cardsLength - 1; i += MAX_STEP) {
      indices.value?.push(i);
    }
  }

  const helpCardTextData = useState<Record<string, HelpChooseCard>>(STATE.FACULTIES_HELP_CARDS_TEXT_DATA, () => ({}));

  const formatCards = cards
    .reduce((acc, card, index) => {
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
          isHelpCard: true,
        });

        generateNewText();
      }

      acc.push(card);

      return acc;
    }, [] as Array<FacultyItem | HelpChooseCardWithFlag>);

  if (import.meta.client) {
    clearNuxtState(STATE.FACULTIES_INITIAL_HELP_CARD_INDEX);
    clearNuxtState(STATE.FACULTIES_HELP_CARDS_INDICES);
    clearNuxtState(STATE.FACULTIES_HELP_CARDS_TEXT_DATA);
  }

  return formatCards;
}

export interface HelpChooseCardWithFlag extends HelpChooseCard {
  isHelpCard: boolean
}
