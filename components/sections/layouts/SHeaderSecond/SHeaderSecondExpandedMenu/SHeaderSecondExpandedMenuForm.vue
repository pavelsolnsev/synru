<script setup lang="ts">
import type { MenuLinks } from '~/components/sections/layouts/SHeaderSecond/sHeaderSecondData';

interface Props {
  formData: MenuLinks['form']
  customPopup?: boolean;
}

const {
  formData = {},
  customPopup = false,
} = defineProps<Props>();

const emits = defineEmits(['popup']);

const { openModal } = useModalStore();

function openPopup() {
  if (customPopup) {
    emits('popup');
    return;
  }

  const IS_FORM_LINK = formData.to;
  if (IS_FORM_LINK) return;

  openModal('MModalForm', {
    formPhone: true,
    actionParams: formData.actionParams,
    title: formData.formTitle,
    subtitle: formData.subtitle,
    btn: formData.formBtnText,
  });
}

</script>

<template>
  <div
    class="s-header-expanded-menu__form"
  >
    <AImg
      alt="form"
      class="s-header-expanded-menu__form__image"
      :src="formData.image"
    />
    <div class="s-header-expanded-menu__form__info">
      <div
        class="s-header-expanded-menu__form__info-title"
        v-html="formData.title"
      />
      <div
        class="s-header-expanded-menu__form__info-description"
        :class="formData.descriptionClass"
        v-html="formData.description"
      />
      <AButtonMain
        bg-color="black"
        :to="formData.to ? formData.to : undefined"
        @click.stop="openPopup"
      >
        <span v-html="formData.btnText" />
      </AButtonMain>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SHeaderSecondExpandedMenu.scss';
</style>
