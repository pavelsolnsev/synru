<script setup lang="ts">
interface Props {
  title?: string,
  content?: string,
  addForm?: boolean,
}

const {
  title,
  content,
  addForm = false,
} = defineProps<Props>();

const user = '<svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" fill="none" viewBox="0 0 51 51"><circle cx="25.2637" cy="25.2637" r="25.2637" fill="#ecedf0"/><path fill="#cacacb" d="M25.523 24.957q-2.799 0-4.792-1.993t-1.993-4.792 1.993-4.792 4.792-1.993q2.8 0 4.792 1.993 1.994 1.993 1.994 4.792t-1.994 4.792-4.792 1.993m-8.82 13.57a4.75 4.75 0 0 1-4.75-4.75q0-1.398.721-2.629a4.7 4.7 0 0 1 1.993-1.865q2.163-1.103 4.877-1.866t5.98-.764 5.979.764 4.877 1.866a4.7 4.7 0 0 1 1.993 1.865q.72 1.23.72 2.63a4.75 4.75 0 0 1-4.749 4.75z"/></svg>';
const author = '<svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" fill="none" viewBox="0 0 51 51"><circle cx="25.2637" cy="25.2637" r="25.2637" fill="#ed131c"/><path fill="#fff" d="M10.844 10.843v28.841h28.84v-28.84zm24.72 24.721h-20.6v-20.6h20.6z"/><path fill="#fff" d="m28.592 28.15-2.985-2.886 2.985-2.81V16.76l-8.875 8.505 8.875 8.504z"/></svg>';
</script>

<template>
  <div class="m-article-question a-font_l">
    <div class="m-article-question__top">
      <span class="m-article-question__top-bg" />
      <h2
        v-if="title"
        class="m-article-question__title a-font_h6"
        v-html="title"
      />
    </div>
    <div
      class="m-article-question__user"
      v-html="user"
    />
    <div
      class="m-article-question__author"
      v-html="author"
    />
    <div
      v-if="content"
      class="m-article-question__content"
    >
      <div v-html="content" />
      <MFormMin
        v-if="addForm"
        form-phone
        form-name
        title="Узнайте, как поступить <br>на&nbsp;бакалавриат"
        title-class="a-font_h5"
        subtitle="В экстернате у&nbsp;вас будет возможность закончить до&nbsp;5 классов за&nbsp;один год"
        subtitle-class="a-font_l"
        btn="Подать заявку"
        :action-params="[
          {param: 'form=artile-question'}
        ]"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MArticleQuestion.scss';
</style>
