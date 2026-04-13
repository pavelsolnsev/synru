<template>
  <MSection>
    <h1 class="a-font_h2">Страницы:</h1>
    <div class="wrapper">
      <AMenuLink to="/static/atoms">
        Атомы
      </AMenuLink>
      <AMenuLink to="/static/molecules">
        Молекулы
      </AMenuLink>
      <AMenuLink to="/static/map">
        Map
      </AMenuLink>
      <AMenuLink to="/static/sections">
        Sections
      </AMenuLink>
      <AMenuLink to="/static/filters">
        Filters
      </AMenuLink>
      <AMenuLink to="/static/video/main">
        Video / Main
      </AMenuLink>
      <AMenuLink to="/static/video/category">
        Video / Category
      </AMenuLink>
      <AMenuLink to="/static/video/article">
        Video / Article
      </AMenuLink>
      <AMenuLink to="/static/news/smi">
        News / SMI
      </AMenuLink>
    </div>
  </MSection>
</template>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    gap: rem(10)
  }

  h1 {
    margin-bottom: rem(16);
  }
</style>
