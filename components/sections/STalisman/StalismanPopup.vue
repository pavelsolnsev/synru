<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
</script>

<template>
  <div
    id="s-form-talisman"
    class="s-talisman__popup"
  >
    <div class="s-talisman__popup-inner">
      <span class="s-talisman__popup-img">
        <AImg
          :src="synergyApi('uploads/content/s-talisman/photo.webp')"
          :srcset="synergyApi('uploads/content/s-talisman/photo.webp')"
          :data-srcset="synergyApi('uploads/content/s-talisman/photo.webp')"
          decoding="async"
          alt=""
          class="lazy"
        />
      </span>
      <h5 class="a-font_h5">Носорог</h5>
      <div class="s-talisman__popup-text a-font_l-m">
        <p>
          Талисманом демо-вуза, отражением наших стремлений и&nbsp;идеалов является носорог&nbsp;&mdash; символ мудрости, учёности и&nbsp;целеустремлённости.
        </p>
        <p>
          Это животное часто ассоциируется с&nbsp;силой и&nbsp;упорством, оно обладает невероятной выносливостью и&nbsp;воплощает собой спокойствие и&nbsp;уверенность. Все эти качества, безусловно, понадобятся человеку на&nbsp;нелёгком пути к&nbsp;получению знаний и&nbsp;саморазвитию. Ведь без&nbsp;упорства невозможно достижение поставленных целей, а&nbsp;без&nbsp;уверенности в&nbsp;себе&nbsp;&mdash; реализация собственного потенциала и&nbsp;высоких амбиций.
        </p>
        <p>
          Носорог символизирует не&nbsp;только упорный труд и&nbsp;настойчивость, но&nbsp;и&nbsp;стремление к&nbsp;успеху для&nbsp;каждого студента, сотрудника и&nbsp;партнёра. Он ничего не&nbsp;боится&nbsp;&mdash; ни&nbsp;один хищник ему не&nbsp;угрожает, и&nbsp;конкурентов у&nbsp;него нет.
        </p>
        <p>
          А&nbsp;ещё, по&nbsp;легендам, носороги приносят удачу.
        </p>
        <p>
          Носорог в&nbsp;дизайне наших пространств и&nbsp;материалов&nbsp;&mdash; это не&nbsp;просто украшение или&nbsp;маркетинговый ход, а&nbsp;постоянное напоминание о&nbsp;наших амбициях и&nbsp;лидерских качествах.
        </p>
        <p>
          Мы вдохновляемся примером носорога и&nbsp;стремимся создать такую атмосферу, в&nbsp;которой каждый студент, преподаватель или&nbsp;сотрудник будет чувствовать себя частью большой мощной силы. В&nbsp;этом заключается наша корпоративная философия&nbsp;&mdash; внутреннее единство и&nbsp;целенаправленная работа на&nbsp;общий результат.
        </p>
        <p>
          Эти ценности являются основополагающими для&nbsp;демо-вуза, и&nbsp;мы по&nbsp;праву гордимся нашим талисманом, который воплощает их в&nbsp;себе.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.s-talisman__popup {
  padding: var(--padding_def);
  border-radius: scale(16);
  background-color: var(--a-color_grey_10);
  &#s-form-talisman{
    @include desktop(min) {
      max-width: scale(755);
      max-height: 100%;
    }
  }
  
  &-inner {
    @include tablet(min) {
      display: grid;
      grid-gap: 0 scale(16);
      grid-template-columns: auto 1fr;
    }
    @include desktop(min) {
      overflow: auto;
      grid-gap: 0 scale(20);
      margin-right: calc(-1 * #{scale(12)});
      padding-right: scale(12);
    }
  }
  &-img {
    overflow: hidden;
    display: block;
    width: scale(126);
    height: scale(172);
    margin: 0 0 scale(16);
    border-radius: scale(12);
    @include tablet(min) {
      grid-row: span 2;
    }
    @include desktop(min) {
      grid-column: 2;
      width: scale(200);
      height: scale(272);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  h5 {
    margin: 0 0 scale(8);
    @include desktop(min) {
      grid-column: 1;
      grid-row: 1;
      margin: 0 0 scale(16);
    }
  }
  &-text {
    opacity: 0.5;
    @include tablet(min) {
      grid-column: 2;
    }
    @include desktop(min) {
      grid-column: 1;
    }
    p {
      margin: 0 0 scale(16);
    }
  }
}
</style>