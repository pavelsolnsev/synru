<template>
  <SVideoMain />
  <SArticleDirections />
  <SVideoList
    title="Популярные видео"
    :per-page="3"
  />
  <SArticlePreview :has-promo="true" />
  <SVideoList
    title="Вам может понравиться"
    :offset="3"
    :per-page="3"
  />
  <MPromo />
  <SArticlePreview />
  <SVideoList
    title="Вам может понравиться"
    :paginator="true"
    :offset="6"
    :per-page="3"
  />
</template>
