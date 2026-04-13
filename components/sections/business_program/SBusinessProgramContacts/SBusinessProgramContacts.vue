<script setup lang="ts">
import type { BusinessProgramEntity, BPBlockAttributesContent } from '~/types';
import BgImageLg from '~/assets/images/business_program/contacts/lg.webp';
import BgImageMd from '~/assets/images/business_program/contacts/md.webp';
import BgImageSm from '~/assets/images/business_program/contacts/sm.webp';
import DefaultCardImage from '~/assets/images/business_program/contacts/img.webp';

interface Props {
  entity: BusinessProgramEntity;
}

interface Contact {
  title: string;
  place: string;
  description: string;
  address: string;
  image: string;
  tags: string[];
}

interface BlockHandler  {
  [key: string]: (contact: Contact, content: BPBlockAttributesContent, title?: string) => Contact
}

const {
  entity,
} = defineProps<Props>();

const blockHandlers: BlockHandler = {
  's-program-location': handleProgramLocation,
  's-program-advantages': handleProgramAdvantages,
} ;

const trainingForm = capitalizeFirstLetter(entity.properties.attributes.format);

const blocksData = entity.properties.blocks.filter((item) => blockHandlers[item.attributes.key]);

const contactInfo = blocksData.reduce((contact, block) => {
  const { key, title, content } = block.attributes;

  if (Array.isArray(content)) return contact;

  if (Object.hasOwn(blockHandlers, key)) {
    const handleFunction = blockHandlers[key];
    return handleFunction(contact, content, title);
  }

  return contact;
}, {
  title: '',
  place: '',
  description: '',
  address: '',
  image: DefaultCardImage,
  tags: [trainingForm],
} as Contact);

function handleProgramLocation(contact: Contact, content: BPBlockAttributesContent, title?: string) {
  const { title: placeTitle, description, address, images } = content;

  contact.title = title ?? '';
  contact.place = placeTitle ?? '';
  contact.description = description ?? '';
  contact.address = address ?? '';

  if (images?.length) {
    const imageUrl = images[0].image_url;
    if (typeof imageUrl === 'string') {
      contact.image = imageUrl;
    }
  }

  return contact;
}

function handleProgramAdvantages(contact: Contact, content: BPBlockAttributesContent) {
  if (content.items?.length) {
    const tag = content.items[0];
    if (tag.value && tag.text) {
      contact.tags.push(`${tag.value ?? ''} ${tag.text ?? ''}`);
    }
  }
  return contact;
}
</script>

<template>
  <MSection
    v-if="contactInfo.place"
    class="s-contacts"
  >
    <div class="s-contacts__inner">
      <div class="s-contacts__info">
        <h3
          class="s-contacts__info-title a-font_h3"
          v-html="contactInfo.title"
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
        <AImg
          :src="contactInfo.image"
        />
      </picture>

      <div class="s-contacts__formats">
        <h5 class="s-contacts__formats-title a-font_h5">
          Формат обучения:
        </h5>
        <div class="s-contacts__formats-list">
          <ATag
            v-for="text in contactInfo.tags"
            :key="text"
            variant="black"
            :text
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
@import './SBusinessProgramContacts.scss';
</style>
