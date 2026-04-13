import { synergyApi, synergyRu } from '~/utils/mediaCdn';
<template>
  <MSection
    :title="`Чем наше <span style='text-wrap: nowrap'>онлайн-тестирование</span> отличается от&nbsp;других`"
    title-class="a-font_h3"
    class="s-diferrence"
  >
    <div class="s-diferrence__txt">
      <div class="a-font_l-m">
        <p>
          Профориентация&nbsp;— это&nbsp;процесс, который помогает понять себя, свои интересы и&nbsp;способности;
          ответить на&nbsp;вопрос: «Какая профессия мне подходит?».
        </p>
      </div>
      <div class="a-font_l-m">
        <p>
          Но&nbsp;традиционные подходы часто опираются на&nbsp;субъективные тесты и&nbsp;абстрактные рекомендации, они
          не&nbsp;всегда точны и&nbsp;не&nbsp;учитывают реальные карьерные траектории.
        </p>
        <p>
          <strong>У&nbsp;нас за&nbsp;дело берётся нейросеть.</strong> Она сопоставляет ваши личностные качества,
          интеллект и&nbsp;поведенческие особенности с&nbsp;данными о&nbsp;тысячах школьников и&nbsp;выпускников, их
          карьерных результатах.
        </p>
      </div>
    </div>
    <picture>
      <source
        media="(min-width: 1200px)"
        srcset=synergyRu('content/mediacenter/ai-prof/difference/lg.webp')
        type="image/webp"
      >
      <source
        media="(min-width: 768px)"
        srcset=synergyRu('content/mediacenter/ai-prof/difference/md.webp')
        type="image/webp"
      >
      <img src=synergyRu('content/mediacenter/ai-prof/difference/sm.webp')>
    </picture>
    <img
      class="s-diferrence__mascot"
      src=synergyRu('content/mediacenter/ai-prof/difference/rhino.webp')
      alt=""
    >
  </MSection>
</template>

<style lang="scss" scoped>
@import './STestProfDiferrence';
</style>
