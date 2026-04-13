<script setup lang="ts">
import type { FacultyEntity } from '~/types';
import BackgroundImageLg from '~/assets/images/global/presentation-form-background_lg.webp?url';
import BackgroundImageMd from '~/assets/images/global/presentation-form-background_md.webp?url';
import BackgroundImageSm from '~/assets/images/global/presentation-form-background_sm.webp?url';
import mapCustomFields from '~/utils/mapCustomFields';

interface Props {
  hasEntity: boolean;
  entity: FacultyEntity;
}

const {
  hasEntity,
  entity = null,
} = defineProps<Props>();

const logo = entity?.preview_image;

const { presentation } = hasEntity ? mapCustomFields(entity?.custom_field_values) : null;
</script>

<template>
  <SForm
    bg-color="red"
    form-title="Заполните форму и получите презентацию"
    description="Узнай подробную информацию о&nbsp;факультетах, студенческой жизни и&nbsp;трудоустройстве"
    :image-sm="BackgroundImageSm"
    :image-md="BackgroundImageMd"
    :image-lg="BackgroundImageLg"
    :form-mail="false"
    :action="presentation"
    btn-text="Получить презентацию"
    class="s-presentation"
  >
    <template #presentation>
      <span class="s-presentation__file">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="155"
          height="198"
          fill="none"
          viewBox="0 0 155 198"
        >
          <path
            fill="#1C1C1C"
            d="M0 14.449a8.455 8.455 0 0 1 8.455-8.455h100.7c2.205 0 4.322.861 5.9 2.4l37.391 36.43A8.455 8.455 0 0 1 155 50.88v138.296a8.455 8.455 0 0 1-8.455 8.455H8.455A8.455 8.455 0 0 1 0 189.176V14.449Z"
            opacity=".1"
          />
          <path
            fill="#E0E1E5"
            d="M0 8.818A8.455 8.455 0 0 1 8.455.363h100.7c2.205 0 4.322.861 5.9 2.4l37.391 36.43A8.455 8.455 0 0 1 155 45.25v138.296a8.455 8.455 0 0 1-8.455 8.455H8.455A8.455 8.455 0 0 1 0 183.545V8.818Z"
          />
          <path
            fill="#1C1C1C"
            d="M16.976 14.79c.279.299.436.703.436 1.125 0 .422-.157.826-.436 1.125a1.44 1.44 0 0 1-1.052.465h-.991v-3.18h.991c.395 0 .773.167 1.052.465ZM25.608 15.1c.465.498.726 1.172.726 1.875 0 .703-.261 1.377-.726 1.875a2.4 2.4 0 0 1-1.752.776h-.992v-5.302h.992a2.4 2.4 0 0 1 1.752.777Z"
          />
          <path
            fill="#1C1C1C"
            fill-rule="evenodd"
            d="M11.01 7.684c-1.607 0-2.91 1.349-2.91 3.013v12.556c0 1.665 1.303 3.014 2.91 3.014h25.714c1.608 0 2.911-1.35 2.911-3.014V10.697c0-1.664-1.303-3.013-2.911-3.013H11.011Zm24.452 6.33a1.1 1.1 0 0 0 .29-.75c0-.281-.104-.55-.29-.75a.96.96 0 0 0-.7-.31h-3.966a.96.96 0 0 0-.701.31c-.186.2-.29.469-.29.75v7.422c0 .282.104.551.29.75a.96.96 0 0 0 .7.31.96.96 0 0 0 .702-.31c.186-.199.29-.468.29-.75v-2.12h1.983a.96.96 0 0 0 .7-.31c.187-.2.291-.47.291-.75 0-.282-.104-.552-.29-.75a.96.96 0 0 0-.701-.311h-1.983v-2.12h2.974a.96.96 0 0 0 .701-.311Zm-17.084 4.525a3.846 3.846 0 0 0 1.016-2.624c0-.984-.365-1.928-1.016-2.624a3.36 3.36 0 0 0-2.454-1.087h-1.982a.96.96 0 0 0-.701.31c-.186.2-.29.469-.29.75v7.422c0 .282.104.551.29.75a.96.96 0 0 0 .7.31.96.96 0 0 0 .702-.31c.185-.199.29-.468.29-.75v-1.06h.991a3.36 3.36 0 0 0 2.454-1.087Zm8.632 1.81c.837-.895 1.307-2.108 1.307-3.374 0-1.265-.47-2.479-1.307-3.374-.836-.895-1.971-1.397-3.154-1.397h-1.983a.96.96 0 0 0-.701.31c-.186.2-.29.469-.29.75v7.422c0 .282.104.551.29.75a.96.96 0 0 0 .7.31h1.984c1.183 0 2.318-.502 3.154-1.397Z"
            clip-rule="evenodd"
          />
        </svg>
        <AImg
          :src="logo"
          alt=""
          decoding="async"
        />
      </span>
    </template>
  </SForm>
</template>

<style lang="scss" scoped>
@import './SPresentation.scss';
</style>

<style lang="scss">
.s-presentation {
  .s-form__content {
    min-height: auto;

    @include tablet(min) {
      min-height: scale(343);
    }
  }
}
</style>
