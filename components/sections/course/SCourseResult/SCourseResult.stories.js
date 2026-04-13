import SCourseResult from './SCourseResult.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SCourseResult',
  component: SCourseResult,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCourseResult },
  setup() {
    return { args };
  },
  template: '<s-course-result v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    custom_field_values: [
      {
        additional_documents: [
          {
            'title': 'Диплом о&nbsp;профессиональной переподготовке',
            'image': null,
            'link': synergyApi('uploads/documents/prof.jpg'),
          },
          {
            'title': 'Сертификат об&nbsp;успешном прохождении обучения',
            'image': null,
            'link': synergyApi('uploads/documents/certificate.png'),
          },
        ],
      },
    ],
  },
};
