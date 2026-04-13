import SPartners from './SPartners.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SPartners',
  component: SPartners,
  argTypes: {},
};

const Template = (args) => ({
  components: { SPartners },
  setup() {
    return { args };
  },
  template: '<s-partners v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Наши выпускники строят карьеру в&nbsp;ведущих компаниях',
  description: 'Описание',
  partners: [
    {
      image: synergyApi('uploads/content/partners/new/1c.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/agentstvo_innovac.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/alfa_bank.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/api.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/arbitrazhnyj_sud_goroda_moskvy_i_oskovskogo_okruga.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/bank_rossii.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/cska.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/fitnes_sssr.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/four_seasons.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/gazprom.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/gazprom_bank.svg'),
    },
    {
      image: synergyApi('uploads/content/partners/new/gk_lanit.svg'),
    },
  ],
};

