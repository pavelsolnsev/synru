<script lang="ts" setup>
interface Props {
  title: string
  cards: {
    name?: string
    time: string
    description: string
  }[]
}

defineProps<Props>();
</script>

<template>
  <MSection
    class="s-dodemba-schedule"
    :title="title"
  >
    <ul class="s-dodemba-schedule__body">
      <li
        v-for="item in cards"
        :key="item.time"
        class="s-dodemba-schedule__card"
      >
        <ASvgMono
          name="schedule-time"
          class="s-dodemba-schedule__icon"
        />
        <div class="s-dodemba-schedule__time">{{ item.time }}</div>
        <div class="s-dodemba-schedule__description">{{ item.description }}</div>
        <div
          v-if="item.description"
          class="s-dodemba-schedule__name"
        >
          {{ item.name }}
        </div>
      </li>
    </ul>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDodEmbaSchedule.scss';
</style>
