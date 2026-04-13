import MBannerCard from './MBannerCard.vue';

export default {
  title: 'Molecules/MBannerCard',
  component: MBannerCard,
  argTypes: {},
};

const popup =
  '<div id="quiz-popup" style="display: none;">' +
  '<img src="/assets/images/s-university/talisman-lg.webp" alt="">' +
  '</div>';

const Template = (args) => ({
  components: { MBannerCard },
  setup() {
    return { args };
  },
  template: '<MBannerCard v-bind="args" />' + popup,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок Баннера',
  img: '/assets/images/s-university/talisman-sm.webp',
  imgLg: '/assets/images/s-university/talisman-lg.webp',
  imgMd: '/assets/images/s-university/talisman-md.webp',
  titleClassName: 'a-font_h5',
  subtitle: 'Подзаголовок',
  tags: ['Тег 1', 'Тег 2'],
};
