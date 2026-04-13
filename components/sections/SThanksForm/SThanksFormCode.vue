<script lang="ts" setup>
import { onWatcherCleanup } from 'vue';

const {
  title,
} = defineProps<{
  title?: string;
}>();

const codeLength = 4;
let intervalId: number | null | NodeJS.Timeout = null;
const initialInputs = Array.from({ length: codeLength }, () => ({ value: '' }));
const initialCode = Array(codeLength).fill('');
const isCodeModalOpen = defineModel<boolean>('isOpen', { required: true });
const inputs = ref(structuredClone(initialInputs));
const code = ref([...initialCode]);
const inputsRefs = useTemplateRef<HTMLInputElement[]>('inputsRefs');
const timer = ref(60);


function onInput(event: Event, index: number) {
  if (!inputsRefs.value) return;
  const input = event.target as HTMLInputElement;

  if (/^\d*$/.test(input.value)) {
    code.value[index] = input.value;
    if (input.value && index < inputsRefs.value.length - 1) {
      inputsRefs.value[index + 1]?.focus();
    }
  } else {
    input.value = '';
  }
}

function resetForm() {
  inputs.value = structuredClone(initialInputs);
  code.value = [...initialCode];
}

function handleKeyDown(event: KeyboardEvent, index: number) {
  if (event.key === 'Backspace' && !code.value[index] && index > 0 && inputsRefs.value) {
    inputsRefs.value[index - 1]?.focus();
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

watch(isCodeModalOpen, (newVal) => {
  let timeoutId: NodeJS.Timeout | undefined;

  if (!newVal) {
    stopTimer();
    resetForm();
  } else {
    startTimer();
    timeoutId = setTimeout(() => {
      inputsRefs.value?.[0]?.focus();
    }, 10);
  }

  onWatcherCleanup(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
});
</script>

<template>
  <form
    class="s-thanks-form__code nolander"
  >
    <h3
      class=""
      v-html="title"
    />
    <h4 class="s-thanks-form__code-title a-font_h4">Подтвердите доступ</h4>

    <div class="s-thanks-form__code-inputs">
      <AInput
        v-for="(digit, index) in inputs.slice(0, code.length)"
        :key="index"
        ref="inputsRefs"
        v-model="digit.value"
        maxlength="1"
        @input="onInput($event, index)"
        @keydown="handleKeyDown($event, index)"
        @paste="handlePaste"
      />
    </div>
  </form>
</template>
