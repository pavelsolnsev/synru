import SProgramResult from './SProgramResult.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SProgramResult',
  component: SProgramResult,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramResult },
  setup() {
    return { args };
  },
  template: '<s-program-result v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    custom_field_values: [
      {
        what_obtain: [
          {
            'title': 'Государственный диплом о&nbsp;высшем образовании  с&nbsp;присвоением степени бакалавра',
            'description': null,
            'link': synergyApi('uploads/content/program/result/bacalavr.jpg'),
          },
          {
            'title': 'Общеевропейское приложение к&nbsp;диплому Diploma Supplement  на&nbsp;английском языке',
            'description': null,
            'link': synergyApi('uploads/content/program/result/europe.jpg'),
          },
        ],
      },
    ],
  },
};
