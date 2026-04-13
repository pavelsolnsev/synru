import { STATE } from '~/constants';
import type { ProgramCard } from '~/types/ProgramCard';

export default function addHelpCardsToPrograms(payload: { cards: ProgramCard[]; initialCardCount: number }) {
  const {
    cards = [],
    initialCardCount = 9,
  } = payload;

  const {
    currentText,
    generateNewText,
    resetState: resetHelpCardsState,
  } = useHelpChooseCardText();

  resetHelpCardsState();

  const cardsLength = cards.length;

  const MIN_INITIAL_INDEX = 0;

  const MAX_INITIAL_INDEX = cardsLength < initialCardCount
    ? cardsLength - 1
    : initialCardCount - 1;

  const initialIndex = useState(STATE.PROGRAMS_LIST_INITIAL_HELP_CARD_INDEX, () => generateRandomInteger(MIN_INITIAL_INDEX, MAX_INITIAL_INDEX));
  const otherIndex = useState<null | number[]>(STATE.PROGRAMS_LIST_HELP_CARDS_INDICES);

  if (!otherIndex.value) {
    const MAX_STEP = 8;

    let previousIndex = initialIndex.value;

    otherIndex.value = [initialIndex.value];

    const excludeIndexMap: Record<string, number[]> = {
      0: [0, 3, 6, 7, 8],
      1: [1, 4, 7, 6, 8],
      2: [2, 5, 8, 6, 7],
      3: [0, 3, 6],
      4: [1, 4, 7],
      5: [2, 5, 8],
      6: [1, 2, 3, 0, 6],
      7: [1, 2, 3, 4, 7],
      8: [1, 2, 3, 5, 8],
    };

    for (let i = MAX_STEP; i <= cardsLength - 1; i += MAX_STEP) {
      let founded = false;
      for (let attempt = 0; attempt <= MAX_STEP && !founded; attempt += 1) {
        const nextIndex = generateRandomInteger(0, MAX_STEP);

        const excludeIndex = excludeIndexMap[String(nextIndex)];
        const hasExcludeIndex = excludeIndex.includes(previousIndex);

        if (nextIndex !== previousIndex && !hasExcludeIndex) {
          previousIndex = nextIndex;
          otherIndex.value?.push(nextIndex + i);
          founded = true;
        }
      }
    }
  }

  const helpCardTextData = useState<Record<string, HelpChooseCard>>(STATE.PROGRAMS_LIST_HELP_CARDS_TEXT_DATA, () => ({}));

  const formatCards = cards.reduce((acc, card, index) => {
    const needToAddHelpCard = otherIndex.value?.includes(index);

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
        level: {
          value: card.level.value,
          text: card.level.text,
        },
        isHelpCard: true,
      });
      generateNewText();
    }
    acc.push(card);

    return acc;
  }, [] as Array<ProgramCard | HelpChooseCardWithProgramLevel>);

  if (import.meta.client) {
    clearNuxtState(STATE.PROGRAMS_LIST_INITIAL_HELP_CARD_INDEX);
    clearNuxtState(STATE.PROGRAMS_LIST_HELP_CARDS_INDICES);
    clearNuxtState(STATE.PROGRAMS_LIST_HELP_CARDS_TEXT_DATA);
  }
  return formatCards;
}

export interface HelpChooseCardWithProgramLevel extends HelpChooseCard {
  level: ProgramCard['level'];
  isHelpCard?: boolean;
}
