import SProgramForWhom from './SProgramForWhom.vue';

export default {
  title: 'Sections/SProgramForWhom',
  component: SProgramForWhom,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramForWhom },
  setup() {
    return { args };
  },
  template: '<s-program-for-whom v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    customFields : {
      'for_whom': [
        {
          'title': 'Выпускникам бакалавриата  <br> и&nbsp;специалитета',
        },
        {
          'title': 'Действующим специалистам',
        },
        {
          'title': 'Желающим получить инженерную специальность',
        },
      ],
    },
  },
};
