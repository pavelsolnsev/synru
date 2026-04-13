<script setup lang="ts">
const { modals, closeTopModal } = useModalStore();
const scrollWidth = shallowRef(0);

const topModal = computed(() => {
  return modals.value.length > 0
    ? modals.value[modals.value.length - 1]
    : null;
});

const modalClassname = computed(() => {
  if (typeof topModal.value?.component !== 'string') return;
  
  const name = topModal.value.component.replace(/([\w])([A-Z])/g, '$1-$2').toLowerCase();
  return `--modal-${name}`;
});

const isFirstOpenedModal = shallowRef(true);

watch(() => modals.value.length, (length) => {
  isFirstOpenedModal.value = !length;

  if (length) {
    document.documentElement.classList.add('--modalIsOpen');
    document.documentElement.style.setProperty('--scroll-width', `${scrollWidth.value}px`);
  } else {
    document.documentElement.classList.remove('--modalIsOpen');
    document.documentElement.style.setProperty('--scroll-width', '0');
  }
});

onMounted(() => {
  scrollWidth.value = window.innerWidth - document.documentElement.clientWidth;
});
</script>

<template>
  <Teleport to="body">
    <Transition :name="isFirstOpenedModal ? 'modal-fade' : 'no-fade'">
      <MModalBase
        v-if="topModal"
        :key="topModal.id"
        :class="modalClassname"
        :z-index="10000 + topModal.id"
        @close="closeTopModal"
      >
        <component
          :is="topModal.component"
          v-bind="topModal.props"
        />
      </MModalBase>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.--modalIsOpen {
  overflow: hidden;
  @include desktop {
    padding-right: var(--scroll-width);
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
