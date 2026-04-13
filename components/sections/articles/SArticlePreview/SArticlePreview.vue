import { synergyApi, synergyRu } from '~/utils/mediaCdn';
<script setup lang="ts">
interface Props {
  hasPromo?: boolean,
}

const {
  hasPromo = false,
} = defineProps<Props>();
</script>

<template>
  <div class="s-article-preview">
    <MArticlePreview
      uri="#"
      tag="Маркетинг"
      title="Всё о&nbsp;трафике и&nbsp;лидогенерации"
      video="https://rutube.ru/play/embed/fe6eb6e1f8142de92159c0b3d4dbea48/?p=NDGiwvTDcr0-AvgO6giDCw"
      thumb=synergyRu('content/gallery/linejka_2023.webp')
      text="<p>Узнайте, как привлекать трафик и&nbsp;превращать его в&nbsp;лиды. Разбираем основные правила и стратегии лидогенерации, а&nbsp;также ошибки, которые сливают ваш бюджет.</p><p>Всё просто, по&nbsp;делу и&nbsp;с&nbsp;примерами: зачем нужен ремаркетинг, что делать с &laquo;рекламной слепотой&raquo;, почему важна <span style='white-space:nowrap;'>CRM-дисциплина</span> и&nbsp;где искать дешёвые заявки.</p>"
      :person="{
        image:synergyRu('content/_upload/authors/o.nazarov.webp'),
        name:'Дмитрий Юрков',
        title:'Директор по&nbsp;маркетингу демо-вуза. Генеральный директор коммуникационного агентства Demo Digital',
      }"
    />
    <MPromoSmall v-if="hasPromo" />
  </div>
</template>

<style lang="scss" scoped>
@import './SArticlePreview.scss';
</style>

<style lang="scss" scoped>
  :global(.s-cols .m-breadcrumbs) {
    margin-bottom: scale(-20);
  }
</style>