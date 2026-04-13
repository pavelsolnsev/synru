import SBannerForm from './SBannerForm.vue';

export default {
  title: 'Sections/SBannerForm',
  component: SBannerForm,
  argTypes: {},
};

const Template = (args) => ({
  components: { SBannerForm },
  setup() {
    return { args };
  },
  template: '<s-banner-form v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Иностранным абитуриентам',
  description: 'Все программы демо-вуза доступны иностранным гражданам',
  imageLg:'https://example.com/assets/template/v5/new3/images/s_banner/1.webp',
  imageMd:'https://example.com/assets/template/v5/new3/images/s_banner/1_md.webp',
  imageSm:'https://example.com/assets/template/v5/new3/images/s_banner/1_sm.webp',
  btnText:'Узнать больше',
  btnHref:'sForeignStudentsForm',
  formTitle:'Узнать про обучение иностранцев',
};
