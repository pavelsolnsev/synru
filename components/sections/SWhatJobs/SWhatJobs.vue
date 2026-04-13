<script setup lang='ts'>
interface Props {
  entity?: {
    customFields: {
      what_jobs: {
        title: string;
        careers: {
          price: string;
          list: {
            item: string;
          }[];
        }[];
      }[];
    };
  };
}

const {
  entity = null,
} = defineProps<Props>();

const {
  what_jobs: careers = [],
} = entity?.customFields ?? {};
</script>

<template>
  <MSection
    v-if="careers[0]?.careers?.length > 0"
    class="s-what-jobs"
    :title="careers[0].title || 'Кем можно работать'"
  >
    <div class="s-course-info__prices">
      <div
        v-for="(value, idx) in careers[0].careers"
        :key="value.price"
        class="s-course-info__prices-item"
      >
        <p
          class="a-font_h3 s-course-info__prices-item-title"
          v-html="value.price"
        />
        <div
          class="s-course-info__prices-info"
          :style="`--height: ${idx*40}px`"
        >
          <AImg
            :src="`/img/s-what-jobs/s-what-jobs-${idx+1}.webp`"
            decoding="async"
          />
          <ul class="a-font_l-m s-course-info__jobs">
            <li
              v-for="item in value.list"
              :key="item.item"
              v-html="item.item"
            />
          </ul>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import "./SWhatJobs.scss";
</style>
