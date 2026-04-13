import { useWindowSize } from '@vueuse/core';

// логика по открытию/закрытию элементов аккордиона
export function useAccordionItem() {
  const isActive = ref(false);

  const answerEl = ref(null);

  const { width } = useWindowSize();

  const openAccordion = (accordion) => {
    accordion.style.maxHeight = accordion.scrollHeight + 'px';
  };

  const closeAccordion = (accordion) => {
    accordion.style.maxHeight = null;
  };

  function updateState() {
    if (isActive.value) {
      if (answerEl.value?.innerText.trim()) {
        openAccordion(answerEl.value);
      }
    } else {
      closeAccordion(answerEl.value);
    }
  }

  watch([isActive, width], () => {
    updateState();
  });

  const onQuestionClick = () => {
    isActive.value = !isActive.value;
  };

  return {
    isActive,
    answerEl,
    onQuestionClick,
    updateState,
  };
}
