import SSynergyNations from './SSynergyNations.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SSynergyNations',
  component: SSynergyNations,
  argTypes: {},
};

const Template = (args) => ({
  components: { SSynergyNations },
  setup() {
    return { args };
  },
  template:
    '<div><SSynergyNations v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  title:'Клуб Synergy Nations',
  titleCard:'Snergy Nations&nbsp;— это открытый клуб интернационального общения, объединяющий российских и&nbsp;иностранных студентов из&nbsp;более 50 стран.',
  titleClassCard:'a-font_h5',
  textCard:'На&nbsp;его собраниях можно найти новых друзей, партнёров, обменяться культурным опытом.',
  textClassCard:'a-font_h6',
  prefix:'В&nbsp;рамках клуба студенты получают возможность:',
  images: [
    {
      value: synergyApi('uploads/content/synergy-nations/01.jpg'),
    },
    {
      value: synergyApi('uploads/content/synergy-nations/02.jpg'),
    },
    {
      value: synergyApi('uploads/content/synergy-nations/03.jpg'),
    },
  ],
};
