<script setup lang="ts">
const { title = 'Содержание статьи' } = defineProps<{
  title?: string,
}>();

function makeArticleMenu() {
  const mainContent = document?.querySelectorAll<HTMLElement>('.s-article');
  if (!mainContent.length) return;

  const sArticle = [...mainContent].pop();
  const articleMenuList = document?.getElementById('s-menu');
  const ul = articleMenuList?.querySelector('.s-menu__list') as Element;
  const headings = sArticle?.querySelectorAll('h2, h3, .s-article-specialities__title');

  if (!(headings && headings.length > 1)) return;
  articleMenuList?.classList.add('--visible');

  const lastH2Li = shallowRef<HTMLElement | null>(null); // Для отслеживания послежнего родительского h2
  for (let i = 0; i < headings.length; i++) {
    appendHeading(i, headings[i], ul, lastH2Li);
  }

  // Добавляем список в меню
  if(ul) {
    articleMenuList?.appendChild(ul);
  }
};


function appendHeading(i: number, heading: Element, ul: Element, lastH2Li: { value: HTMLElement | null }) {
  const text = (heading as HTMLElement).innerText.trim().replace(/(<(\/?[^>]+)>)/g, '');
  const href = `h_caption_${i}`;

  if (!text) return;
  const anchor = document?.createElement('a');

  anchor?.classList.add('s-article__anchor');
  anchor.id = href;
  anchor.style.position = 'relative';
  anchor.style.top = `-${document?.querySelector('header')?.scrollHeight}px`;
  heading.prepend(anchor);

  const a = document?.createElement('a');

  a.href = `${window.location.origin}${window.location.pathname}${window.location.search}#${href}`;
  a.innerText = text;

  const li = document?.createElement('li');

  if( heading.tagName === 'H2' || heading.classList.contains('s-article-specialities__title') ) {
    lastH2Li.value = li;
    li.appendChild(a);
    ul?.appendChild(li);
  } else {
    makeSubUl(lastH2Li.value, ul, li, a);
  }
}

function makeSubUl(lastH2Li: HTMLElement | null, ul: Element, li: Element, a: Element) {
  if (!lastH2Li) {
    li.appendChild(a);
    ul?.appendChild(li);
    return;
  }

  let subUl = lastH2Li?.querySelector('ul');

  if (!subUl) {
    subUl = document?.createElement('ul');
    subUl.classList.add('--subitem');
    lastH2Li?.appendChild(subUl);
  }
  const subLi = document?.createElement('li');

  subLi.appendChild(a);
  subUl.appendChild(subLi);
}

onMounted(() => {
  makeArticleMenu();
});
</script>

<template>
  <div
    id="s-menu"
    class="s-menu a-font_l-m"
  >
    <h4
      class="s-menu__title a-font_h4"
      v-html="title"
    />
    <ul class="s-menu__list" />
  </div>
</template>

<style lang="scss">
@import './SMenu.scss';
</style>
