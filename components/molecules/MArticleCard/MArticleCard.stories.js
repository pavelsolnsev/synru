import MArticleCard from './MArticleCard.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Molecules/MArticleCard',
  component: MArticleCard,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    titleClass: {
      control: { type: 'text' },
    },
    text: {
      control: { type: 'text' },
    },
    textClass: {
      control: { type: 'text' },
    },
    to: {
      control: { type: 'text' },
    },
    tag: {
      control: { type: 'text' },
    },
    image: {
      control: { type: 'text' },
    },
    date: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => ({
  components: { MArticleCard },
  setup() {
    return { args };
  },
  template: '<m-article-card v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  to: '/',
  image: synergyApi('uploads/content/events/event2.webp'),
  tag: 'Мероприятия',
  text: 'Факультет дизайна и&nbsp;рекламы проведет научные дискуссии по&nbsp;креативной экономике на&nbsp;«Финатлон форуме»',
  date: '25 сентября 2024',
  style: 'width: 400px;',
  title: 'Заголовок',
};
