
export default function useHelpChooseCardText(textData: HelpChooseCard[] = defaultTextData) {
  const initialIndex = generateRandomInteger(0, textData.length - 1);

  const state = useState('help-choose-card-text-state', () => ({
    usedIndices: [initialIndex] as number[],
    currentIndex: initialIndex,
  }));

  const currentText = computed(() => textData[state.value.currentIndex]);

  function getRandomIndex() {
    const allIndices = textData.map((_, i) => i);
    const availableIndices = allIndices.filter((i) => !state.value.usedIndices.includes(i));

    if (availableIndices.length === 0) {
      state.value.usedIndices = [];
      return getRandomIndex();
    }

    const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    return randomIdx;
  }

  function generateNewText() {
    const index = getRandomIndex();

    state.value.currentIndex = index;
    state.value.usedIndices.push(index);
  }

  function resetState() {
    const index = generateRandomInteger(0, textData.length - 1);

    state.value.usedIndices = [index];
    state.value.currentIndex = index;
  }

  return {
    currentText,
    generateNewText,
    resetState,
  };
}

const defaultTextData: HelpChooseCard[] = [
  {
    title: 'Не&nbsp;знаю, что выбрать',
    description: 'Не&nbsp;определились с&nbsp;профессией?',
    text: 'Специалист подскажет, что востребовано на&nbsp;рынке труда и&nbsp;где вам лучше учиться',
    btn: 'Помогите выбрать',
  },
  {
    title: 'Не&nbsp;могу определиться',
    description: 'Пока не&nbsp;выбирали профессию?',
    text: 'Расскажите специалисту о&nbsp;своих интересах и&nbsp;склонностях. Он поможет выбрать направление, подходящее именно&nbsp;вам',
    btn: 'Помогите выбрать',
  },
  {
    title: 'Помогите мне выбрать',
    description: 'Не&nbsp;определились с&nbsp;профессией?',
    text: 'Наш карьерный консультант поможет найти востребованную специальность, подходящую именно вам. Это бесплатно!',
    btn: 'Помогите выбрать',
  },
  {
    title: 'Помогите определиться',
    description: 'Ещё не&nbsp;выбрали профессию?',
    text: 'Пройдите бесплатную профориентацию: карьерный консультант подберёт специальность именно для&nbsp;вас',
    btn: 'Помогите выбрать',
  },
  {
    title: 'Не&nbsp;знаете, что выбрать?',
    description: 'Расскажем о&nbsp;каждом направлении и&nbsp;поможем определиться',
    btn: 'Получить консультацию',
  },
  {
    title: 'Нужна помощь?',
    description: 'Расскажем подробно о&nbsp;каждой специальности и&nbsp;поможем определиться',
    btn: 'Получить консультацию',
  },
];

export interface HelpChooseCard  {
  title?: string;
  description?: string;
  text?: string;
  btn?: string;
}
