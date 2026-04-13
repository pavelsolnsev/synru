import { onWatcherCleanup } from 'vue';
import type AInput from '~/components/atoms/AInput/AInput.vue';

interface useLKRegistrationBaseOptions {
  codeLength?: number;
  isCodeModalOpen: Ref<boolean>;
}

export function useLKRegistrationBase(options: useLKRegistrationBaseOptions) {
  const { codeLength = 4, isCodeModalOpen } = options;
  let intervalId: number | null | NodeJS.Timeout = null;
  const initialInputs = Array.from({ length: codeLength }, () => ({ value: '' }));
  const initialCode = Array(codeLength).fill('');

  const inputs = ref(structuredClone(initialInputs));
  const code = ref([...initialCode]);
  const inputsRefs = useTemplateRef<InstanceType<typeof AInput>[]>('inputsRefs');
  const timer = ref(60);

  function resetForm() {
    inputs.value = structuredClone(initialInputs);
    code.value = [...initialCode];
  }

  function handleKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !code.value[index] && index > 0 && inputsRefs.value) {
      inputsRefs.value[index - 1]?.getFocus();
    }
  }

  function handlePaste(event: ClipboardEvent) {
    event.preventDefault();

    const pastedData = event.clipboardData?.getData('text');
    if (!pastedData) return;
    const digitsOnly = pastedData.replace(/\D/g, '').slice(0, codeLength).split('');
    for (let i = 0; i < digitsOnly.length; i++) {
      code.value[i] = digitsOnly[i];
      inputs.value[i].value = digitsOnly[i];
    }
  }

  function onInput(event: Event, index: number) {
    if (!inputsRefs.value) return;
    const input = event.target as HTMLInputElement;

    if (/^\d*$/.test(input.value)) {
      code.value[index] = input.value;
      if (input.value && index < inputsRefs.value.length - 1) {
        inputsRefs.value[index + 1]?.getFocus();
      }
    } else {
      input.value = '';
    }
  }

  function startTimer() {
    if (intervalId !== null) return;
    timer.value = 60;
    intervalId = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        stopTimer();
      }
    }, 1000);
  }

  function stopTimer() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function resetTimer() {
    stopTimer();
    startTimer();
  }

  watch(isCodeModalOpen, (newVal) => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (!newVal) {
      stopTimer();
      resetForm();
    } else {
      startTimer();
      timeoutId = setTimeout(() => {
        inputsRefs.value?.[0]?.getFocus();
      }, 10);
    }

    onWatcherCleanup(() => {
      if (timeoutId) clearTimeout(timeoutId);
    });
  }, { immediate: true });

  onUnmounted(() => {
    stopTimer();
  });

  return {
    code,
    inputs,
    inputsRefs,
    timer,
    resetForm,
    onInput,
    handleKeyDown,
    handlePaste,
    startTimer,
    stopTimer,
    resetTimer,
  };
}
