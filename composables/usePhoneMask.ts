import { Maskito } from '@maskito/core';
import maskitoOptions from '~/utils/phoneMask';
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';

export default function usePhoneMask() {
  let maskedInput: Maskito;
  let phoneInput: HTMLInputElement | null;

  const id = useId();

  tryOnMounted(() => {
    phoneInput = document.getElementById(id) as HTMLInputElement;
    if (!phoneInput) {
      console.error(`[usePhoneMask]: Отсутствует инпут для ввода телефона с id ${id}`);
      return;
    }
    maskedInput = new Maskito(phoneInput as HTMLInputElement, maskitoOptions);
  })
  
  tryOnUnmounted(() => {
    maskedInput?.destroy();
  });

  return {
    id,
  }
}

