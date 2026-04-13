import SProgramBanner from './SProgramBanner.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SProgramBanner',
  component: SProgramBanner,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramBanner },
  setup() {
    return { args };
  },
  template: '<s-program-banner v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  hasEntity: true,
  entity: {
    custom_field_values: [
      {
        show_second_higher: true,
      },
    ],
  },
  title: 'Ускоренное второе высшее',
  description: 'Выпускники бакалавриата могут получить второе высшее образование за&nbsp;меньший период времени. Это возможно благодаря перезачету общих дисциплин. Так, 4.5 года сокращаются до&nbsp;3&nbsp;лет.',
  imageLg: synergyApi('uploads/content/banner/banner_1_lg.webp'),
  imageMd: synergyApi('uploads/content/banner/banner_1_md.webp'),
  imageSm: synergyApi('uploads/content/banner/banner_1_sm.webp'),
};
