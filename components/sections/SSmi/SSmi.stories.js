import SSmi from './SSmi.vue';

export default {
  title: 'Sections/SSmi',
  component: SSmi,
  argTypes: {},
};

const Template = (args) => ({
  components: { SSmi },
  setup() {
    return { args };
  },
  template: '<s-smi v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  title: 'СМИ о нас',
  items: [
    {
      title: 'Лингвистика, завод бараночных изделий и&nbsp;международный event…',
      date: '26 октября 2024',
      media: 'RBC.RU',
      link: '#',
    },
    {
      title: 'Российские предприниматели захотели развивать бизнес в&nbsp;Азии и&nbsp;СНГ',
      date: '26 октября 2024',
      media: 'VK.RU',
      link: '#',
    },
    {
      title: 'Эксперты China Business Forum&nbsp;2023: Товарооборот России и&nbsp;Китая вырастет до&nbsp;$400&nbsp;млрд к&nbsp;2030&nbsp;году',
      date: '26 октября 2024',
      media: 'NEWS.RU',
      link: '#',
    },
    {
      title: 'Лингвистика, завод бараночных изделий и&nbsp;международный event…',
      date: '26 октября 2024',
      media: 'RT.RU',
      link: '#',
    },
    {
      title: 'Лингвистика, завод бараночных изделий и&nbsp;международный event…',
      date: '26 октября 2024',
      media: 'MT.RU',
      link: '#',
    },
    {
      title: 'Российские предприниматели захотели развивать бизнес в&nbsp;Азии и&nbsp;СНГ',
      date: '26 октября 2024',
      media: 'BR.RU',
      link: '#',
    },
  ],
};
