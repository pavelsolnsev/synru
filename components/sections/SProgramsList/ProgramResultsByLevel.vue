<script setup lang="ts">
import type { EntityOption, ProgramCard } from '~/types/ProgramCard';

interface ProgramsByLevel {
  title: string;
  programs: Array<ProgramCard | HelpChooseCardWithProgramLevel>;
  programsCount: number,
  filterBenefits?: string[]
}

const props = withDefaults(defineProps<{
  levels: Record<number, EntityOption>,
  cards: Array<ProgramCard | HelpChooseCardWithProgramLevel>,
  showPresentation?: boolean,
  initialCardCount?: number,
}>(), {
  showPresentation: false,
  initialCardCount: 9,
});

function isProgramCard(card: ProgramCard | HelpChooseCard): card is ProgramCard {
  return Boolean((card as ProgramCard).type);
}

const programsByLevels: ComputedRef<ProgramsByLevel[]> = computed(() => {

  return Object.keys(props.levels).reduce((acc, el) => {
    const levelId = Number(el);
    const programs = props.cards.filter((card) => card.level.value === levelId);
    const filterBenefits = Array.isArray(props.levels[levelId]['filterBenefits']) ? props.levels[levelId]?.filterBenefits : [];

    if (programs.length) {
      acc.push({
        title: props.levels[levelId]['text'],
        programs,
        programsCount: programs.length,
        filterBenefits,
      });
    }

    return acc;
  }, [] as ProgramsByLevel[]);
});

defineEmits<{
  enroll: [program: ProgramCard]
}>();
</script>

<template>
  <div
    id="programs-by-level"
    class="programs-by-level"
  >
    <div class="s-programs-list__inner">
      <div
        v-for="level in programsByLevels"
        :key="level.title"
        class="s-programs-list__block"
      >
        <div class="s-programs-list__block-headline">
          <template v-if="showPresentation">
            <h2 class="s-programs-list__block-title a-font_h2">{{ level.title }}</h2>
          </template>
          <template v-else>
            <h4 class="s-programs-list__block-title a-font_h4">{{ level.title }}</h4>
          </template>
          <div class="s-programs-list__block-tools">
            <span class="s-programs-list__block-count l-section__title-nums a-font_m-m">
              {{ level.programsCount }}
            </span>
          </div>
        </div>

        <div class="s-programs-list__block-benefits a-font_xl-m">
          <template
            v-for="(benefit, index) in level.filterBenefits"
            :key="benefit"
          >
            <div>
              <ASvgMono :name="index === 0 ? 'speciality_partner' : 'speciality_popular'" />
              <span>{{ benefit }}</span>
            </div>
          </template>
        </div>

        <ProgramResults
          :cards="level.programs"
          :initial-card-count="initialCardCount"
          class="result-by-level"
        >
          <template #default="{ item: program, hide = false }">
            <template v-if="isProgramCard(program)">
              <MSpecialtyCard
                v-show="!hide"
                :id="program.id"
                :name="program.name"
                :faculty="program.faculty.text"
                :level="program.level.text"
                :place="program.place"
                :link="program.link"
                :is-new="program.new"
                :is-popular="program.isPopular"
                :is-partner="program.partner"
                :partner-logo="program.partnerLogo"
                :partner-text="program.partnerText"
                :partner-bonus="program.partnerBonus"
                :ico="program.direction_ico"
                :price="program.price"
                :is-show-enroll="!props.showPresentation"
                :presentation-link="program?.presentation ?? ''"
                :show-presentation="props.showPresentation"
                @enroll="$emit('enroll', program)"
              />
            </template>

            <template v-else>
              <MHelpChooseCard
                v-show="!hide"
                :text="program.text"
                :title="program.title"
                :description="program.description"
                :btn="program.btn"
                :action-params="[{param: 'form=pomogite_vybrat_programmu'}]"
                form-title="Оставьте контакты, мы вам поможем"
                form-btn="Отправить"
                form-id="programs"
                color-type="white"
              />
            </template>
          </template>
        </ProgramResults>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './ProgramResultsByLevel.scss';
</style>

<style lang="scss">
#programs-by-level .s-programs-list__inner {
  &.result-by-level {
    padding: 0;

    @include tablet(min) {
      padding: 0;
    }

    @include desktop(min) {
      padding: 0;
    }
  }
}
.s-programs-list__block-benefits {
  display: flex;
  flex-direction: column;
  gap: calc(var(--scale) * 8);
  margin-bottom: calc(var(--scale) * 24);

  @include tablet(min) {
    flex-direction: row;
    gap: scale(16);
    margin-bottom: calc(var(--scale) * 24);
  }

  @include desktop(min) {
    flex-direction: row;
    gap: scale(16);
    margin-bottom: calc(var(--scale) * 24);
  }

  div {
    display: flex;
    align-items: flex-start;
    gap: calc(var(--scale) * 4);

    @include tablet(min) {
      align-items: center;
    }
  }
}
</style>
