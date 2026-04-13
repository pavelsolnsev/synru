import MSwiperNav from './MSwiperNav.vue';

export default {
  title: 'Molecules/MSwiperNav',
  component: MSwiperNav,
  argTypes: {},
};

const Template = (args) => ({
  components: { MSwiperNav },
  setup() {
    return { args };
  },
  template: '<div style="position: relative; margin-top: 100px;"><m-swiper-nav v-bind="args"/></div>',
});


export const Default = Template.bind({});
Default.args = {};
