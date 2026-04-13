// оставлять открытым только один элемент аккордиона
export function useGroupAccordions() {
  const activeItem = ref(-1);

  const setActiveItem = (idx) => {
    activeItem.value = activeItem.value === idx ? -1 : idx;
  };

  return {
    activeItem,
    setActiveItem,
  };
}
