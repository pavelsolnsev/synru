import SPresentation from './SPresentation.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SPresentation',
  component: SPresentation,
  argTypes: {},
};

const Template = (args) => ({
  components: { SPresentation },
  setup() {
    return { args };
  },
  template: '<s-presentation v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  hasEntity: true,
  entity: {
    preview_image:
      synergyRu('content/faculties/icons7_big/mediczina.svg'),
    custom_field_values: [
      {
        presentation:
          synergyApi('uploads/content/presentations/medicine.pdf'),
      },
    ],
  },
};
