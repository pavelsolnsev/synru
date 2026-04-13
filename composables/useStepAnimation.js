// анимация этапов: последовательно меняет активность слайдов раз в секунду
export function useStepAnimation(slider, disableCondition = ref(false)) {

  let initTimer = null;
  const delay = 1000;
  const activeSlide = ref(-1);

  onMounted(() => {
    startAnimation();
  });

  watch(disableCondition, () => {
    startAnimation();
  });

  onBeforeUnmount(() => {
    stopAnimation();
  });

  function startAnimation() {
    stopAnimation();
    if (disableCondition.value || !slider.value) {
      return;
    }

    const count = slider.value.slides.length;

    initTimer = setInterval(function start() {
      activeSlide.value++;
      if (activeSlide.value == count) {
        activeSlide.value = 0;
      }
      slider.value.slideTo(activeSlide.value);
    }, delay);
  }

  function stopAnimation() {
    clearTimeout(initTimer);
    activeSlide.value = -1;
  }

  return {
    activeSlide,
    startAnimation,
    stopAnimation,
  };
}
