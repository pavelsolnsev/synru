import MAppLinks from './MAppLinks.vue';

export default {
  title: 'Molecules/MAppLinks',
  component: MAppLinks,
  argTypes: {},
};

const Template = (args) => ({
  components: { MAppLinks },
  setup() {
    return { args };
  },
  template: '<MAppLinks v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  appLinks: [
    {
      name: 'App Store',
      link: 'https://apps.apple.com/ru/app/megacampus/id1059060742',
      image:
        'https://example.com/assets/template/v5/new3/images/download_app/apple.svg',
    },
    {
      name: 'Google Play',
      link: 'https://play.google.com/store/apps/details?id=com.example.demoapp',
      image:
        'https://example.com/assets/template/v5/new3/images/download_app/google.svg',
    },
  ],
  title: 'Предусмотрен такой заголовок',
};
