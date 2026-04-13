<script setup lang="ts">
import DinoImage from '~/assets/images/friends/about/dino-friends.webp';
import BgImage from '~/assets/images/friends/about/bg-1.webp';

const text = 'Synergy Friends&nbsp;— это единственная программа лояльности, которая делает бесплатным коммерческий ВУЗ. За&nbsp;всех, кто станет студентом по&nbsp;твоему приглашению, мы начислим вознаграждение в&nbsp;токенах.';
</script>

<template>
  <MSection class="s-friends-about">
    <AImg
      class="s-friends-about__img"
      alt="dino"
      :src="DinoImage"
    />
    <span
      class="s-friends-about__text a-font_h3"
      v-html="text"
    />
    <p
      class="s-friends-about__token-text a-font_h3"
    >
      <AImg
        :src="BgImage"
        alt="friends"
        class="s-friends-about__token-img"
      />
    </p>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SFriendsAbout.scss';
</style>
