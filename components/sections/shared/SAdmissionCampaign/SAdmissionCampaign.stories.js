import SAdmissionCampaign from './SAdmissionCampaign.vue';

export default {
  title: 'Sections/SAdmissionCampaign',
  component: SAdmissionCampaign,
  argTypes: {},
};

const Template = (args) => ({
  components: { SAdmissionCampaign },
  setup() {
    return { args };
  },
  template: '<s-admission-campaign v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
