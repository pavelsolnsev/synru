import ALogo from './ALogo.vue';

export default {
  title: 'Atoms/ALogo',
  component: ALogo,
};

const Template = () => ({
  components: { ALogo },
  setup() {
    return {};
  },
  template: `<a-logo></a-logo>`,
});

export const Default = Template.bind();