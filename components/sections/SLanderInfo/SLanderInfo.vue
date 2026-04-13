<script setup lang="ts">
const { data = {} } = defineProps<{
  data: Record<string, string>
}>();

const { text,copy, copied, isSupported } = useClipboard();
</script>

<template>
  <div
    v-if="data"
    id="s-lander-info"
  >
    <p
      v-for="key in Object.keys(data)"
      :key
    >
      <strong>{{ key }}</strong>: {{ data[key as keyof typeof data] }}
      <button
        v-if="isSupported"
        :title="copied ? 'Скопировано' : 'Скопировать'"
        class="copy-button"
        @click="copy(data[key as keyof typeof data])"
      >
        <svg
          v-if="!copied || text !== data[key as keyof typeof data]"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7 18V2h13v16zm2-2h9V4H9zm-6 6V6h2v14h11v2zm6-6V4z"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 18.5v-2h2v2zM3 15v-2h2v2zm0-3.5v-2h2v2zM6.5 22v-2h2v2zM9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm1 4v-2h2v2zm-5 0q-.825 0-1.412-.587T3 20h2zm8.5 0v-2h2q0 .825-.587 1.413T13.5 22M3 8q0-.825.588-1.412T5 6v2z"
          />
        </svg>
      </button>
    </p>

    <AButton
      size="sm"
      bg-color="white"
      style="display: block; margin: 0 auto;"
      @click="copy(JSON.stringify(data, null, 2))"
    >
      {{ copied ? 'Скопировано' : 'Копировать все' }}
    </AButton>
  </div>
</template>

<style lang="scss">
#s-lander-info {
  background-color: var(--a-color_white);
  border-radius: var(--border-radius_sec);
  padding: var(--padding_def);
  max-width: 800px;
}
.copy-button {
  border: none;
  background: none;
  margin-left: scale(8);

  &:hover {
    cursor: pointer;

    svg {
      transform: scaleX(1.2) scaleY(1.2);
    }
  }
}
</style>

