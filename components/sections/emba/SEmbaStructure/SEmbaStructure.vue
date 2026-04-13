<script setup lang="ts">
import { structureItems } from './SEmbaStructureData';
</script>

<template>
  <MSection
    title="Структура программы"
    class="s-emba-structure"
  >
    <div class="s-emba-structure__list">
      <div
        v-for="item,idx in structureItems"
        :key="item.title"
        :class="item.red ? '--red' : ''"
        class="s-emba-structure__item"
      >
        <picture
          v-if="item.bg"
          class="s-emba-structure__item-bg"
        >
          <source
            media="(min-width: 1200px)"
            srcset="/img/emba/structure_lg.webp"
          >
          <source
            media="(min-width: 768px)"
            srcset="/img/emba/structure_md.webp"
          >
          <AImg
            src="/img/emba/structure_sm.webp"
            alt=""
            decoding="async"
            loading="lazy"
          />
        </picture>
        <div
          v-if="item.tags"
          class="s-emba-structure__item-tags"
        >
          <ATag
            v-for="tag in item.tags"
            :key="tag"
            :text="tag"
            font="a-font_l"
            class="s-emba-structure__item-tag"
          />
        </div>

        <div class="s-emba-structure__item-right">
          <div class="s-emba-structure__item-num a-font_h3">{{ idx }}</div>
          <template v-if="item.imagesRight">
            <AImg
              v-for="img in item.imagesRight"
              :key="img"
              :src="`/img/emba/${img}.webp`"
              alt=""
              decoding="async"
              loading="lazy"
            />
          </template>
        </div>

        <div class="s-emba-structure__item-desc">
          <div class="s-emba-structure__item-title a-font_h5">{{ item.title }}</div>
          <div class="s-emba-structure__item-subtitle a-font_xl-m">{{ item.subtitle }}</div>
          <div
            class="s-emba-structure__item-text a-font_m"
            v-html="item.text"
          />
        </div>

        <div
          v-if="item.teachers"
          class="s-emba-structure__item-teachers"
        >
          <div class="s-emba-structure__item-teachers-title a-font_xs">Ведущие преподаватели модуля:</div>
          <div
            v-for="teacher in item.teachers"
            :key="teacher.name"
            class="s-emba-structure__item-teacher"
          >
            <div class="s-emba-structure__item-teacher-name a-font_xs-m">{{ teacher.name }}</div>
            <div class="s-emba-structure__item-teacher-image">
              <AImg
                v-if="teacher.img"
                :src="`/img/emba/${teacher.img}.webp`"
                :alt="teacher.name"
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div
          v-if="item.professors"
          class="s-emba-structure__item-teachers"
        >
          <div class="s-emba-structure__item-teachers-title a-font_xs">Профессора практики модуля:</div>
          <div
            v-for="professor in item.professors"
            :key="professor.name"
            class="s-emba-structure__item-teacher"
          >
            <div class="s-emba-structure__item-teacher-name a-font_xs-m">{{ professor.name }}</div>
            <div class="s-emba-structure__item-teacher-image">
              <AImg
                v-if="professor.img"
                :src="`/img/emba/${professor.img}.webp`"
                :alt="professor.name"
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang="scss">
@import './SEmbaStructure.scss';
</style>
