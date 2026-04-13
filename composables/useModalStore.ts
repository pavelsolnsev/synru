export interface Modal {
  id: number;
  component: unknown;
  props?: Record<string, unknown>;
}

const state = reactive({
  modals: [] as Modal[],
})

let id = 0;

export default function useModalStore() {
  const { modals } = toRefs(state);

  function openModal(component: unknown, props: Modal['props'] = {}) {
    state.modals.push({ id: ++id, component, props } satisfies Modal);
  }

  function closeTopModal() {
    if (!state.modals.length) return;

    state.modals.pop();
  }

  return {
    modals: readonly(modals),
    openModal,
    closeTopModal,
  }
}