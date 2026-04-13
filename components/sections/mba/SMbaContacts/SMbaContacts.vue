<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';
import BgImageLg from '~/assets/images/business_program/contacts/lg.webp';
import BgImageMd from '~/assets/images/business_program/contacts/md.webp';
import BgImageSm from '~/assets/images/business_program/contacts/sm.webp';
import DefaultCardImage from '~/assets/images/business_program/contacts/img.webp';

interface Props {
  entity: MbaProgramEntity;
}

const {
  entity,
} = defineProps<Props>();

const forms = shallowRef<string[]>([]);

(async () => {
  forms.value = await useNuxtData('mba-forms' + entity.id).data.value;
})();

const contactInfo = entity.customFields?.mba_program_location?.at(0);

const tags = computed(() => Array.isArray(contactInfo?.tags) ? [...forms.value, ...contactInfo?.tags.map(({ text }) => text)] : forms.value);
</script>

<template>
  <MSection
    v-if="contactInfo?.place"
    class="s-contacts"
  >
    <div class="s-contacts__inner">
      <div class="s-contacts__info">
        <h3
          class="s-contacts__info-title a-font_h3"
          v-html="contactInfo.title || 'Место проведения'"
        />
        <div class="s-contacts__info-bottom">
          <div class="s-contacts__info-place">
            <h5
              v-if="contactInfo.place"
              class="a-font_h5"
              v-html="contactInfo.place"
            />
            <div
              v-if="contactInfo.description"
              class="a-font_s"
              v-html="contactInfo.description"
            />
          </div>
          <h6
            v-if="contactInfo.address"
            class="s-contacts__info-address a-font_h6"
            v-html="contactInfo.address"
          />
        </div>

        <picture class="s-contacts__info-bg">
          <source
            media="(min-width: 1200px)"
            :srcset="BgImageLg"
          >
          <source
            media="(min-width: 768px)"
            :srcset="BgImageMd"
          >
          <AImg
            alt="contacts"
            :src="BgImageSm"
          />
        </picture>
      </div>

      <picture class="s-contacts__img">
        <AImg :src="contactInfo?.image || DefaultCardImage" />
      </picture>

      <div class="s-contacts__formats">
        <h5 class="s-contacts__formats-title a-font_h5">
          Формат обучения:
        </h5>
        <div
          v-if="tags.length"
          class="s-contacts__formats-list"
        >
          <ATag
            v-for="text in tags"
            :key="text as string"
            :text="text as string"
            variant="black"
          />
        </div>
        <h6 class="s-contacts__formats-descr a-font_h6">
          Очные модули пройдут в&nbsp;школе бизнеса демо-вуза
        </h6>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaContacts.scss';
</style>
