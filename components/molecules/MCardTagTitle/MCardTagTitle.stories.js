import MCardTagTitle from './MCardTagTitle.vue';

export default {
  title: 'Molecules/MCardTagTitle',
  component: MCardTagTitle,
  argTypes: {
    tag: {
      control: { type: 'text' },
    },
    tagType: {
      control: { type: 'select' },
      options: [
        'primary',
        'white',
        'black',
        'grey',
        'blur',
        'fill',
        'fill_grey_20',
        'fill_grey_40',
      ],
    },
    tagFontSize: {
      control: { type: 'select' },
      options: [
        'a-font_xl',
        'a-font_xl-m',
        'a-font_l',
        'a-font_l-m',
        'a-font_m',
        'a-font_m-m',
        'a-font_s',
        'a-font_s-m',
        'a-font_xs',
        'a-font_xs-m',
        'a-font_xxs',
        'a-font_xxs-m',
      ],
    },
    title: {
      control: { type: 'text' },
    },
    titleClass: {
      control: { type: 'select' },
      options: [
        'primary',
        'white',
        'black',
        'grey',
        'blur',
        'fill',
        'fill_grey_20',
        'fill_grey_40',
      ],
    },
    imgLg: {
      control: { type: 'text' },
    },
    imgSm: {
      control: { type: 'text' },
    },
    showBgImage: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => ({
  components: { MCardTagTitle },
  setup() {
    return { args };
  },
  template: '<m-card-tag-title v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  tag: 'Колледж',
  title: 'от 150',
};

export const WithDefaultBgImage = Template.bind({});
WithDefaultBgImage.args = {
  tag: 'Онлайн',
  showBgImage: true,
};
