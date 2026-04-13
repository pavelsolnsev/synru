import SIntroPage from './SIntroPage.vue';
import { synergyApi } from '~/utils/mediaCdn';
import { vueRouter } from 'storybook-vue3-router';

export default {
  title: 'Sections/SIntroPage',
  component: SIntroPage,
  argTypes: {},
};

const Template = (args) => ({
  components: { SIntroPage },
  setup() {
    return { args };
  },
  template: '<s-intro-page v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  title: 'Приёмная <br>комиссия',
  description: 'Пройдите тест и&nbsp;узнайте, <br>на&nbsp;кого вам лучше учиться',
  titleClass:'a-font_h1',
  bgImages:[
    { image: synergyApi('uploads/content/quiz/faq_intro_sm.webp') },
    { image: synergyApi('uploads/content/quiz/faq_intro_md.webp') },
    { image: synergyApi('uploads/content/quiz/faq_intro_lg.webp') },
  ],
};

Default.decorators = [
  vueRouter(),
];
