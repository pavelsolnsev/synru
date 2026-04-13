import { mountSuspended } from '@nuxt/test-utils/runtime';
import { AApplyBtn } from '#components';
import { describe, it, expect } from 'vitest';

const TITLE = 'Test Title';
const NEW_TITLE = 'New Title';

const createComponent = async () => {
  return await mountSuspended(AApplyBtn, {
    props: {
      title: TITLE,
    },
  });
};

describe('AApplyBtn', () => {
  it('can be mounted', async () => {
    const wrapper = await createComponent();

    expect(wrapper.text()).toBe(TITLE);

  });

  it('should change rendered title when prop changes', async () => {
    const wrapper = await createComponent();

    expect(wrapper.text()).toBe(TITLE);

    await wrapper.setProps({
      title: NEW_TITLE,
    });

    expect(wrapper.text()).toBe(NEW_TITLE);
  });
});
