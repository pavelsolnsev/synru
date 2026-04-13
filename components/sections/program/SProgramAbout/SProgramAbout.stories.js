import SProgramAbout from './SProgramAbout.vue';

export default {
  title: 'Sections/SProgramAbout',
  component: SProgramAbout,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramAbout },
  setup() {
    return { args };
  },
  template: '<s-program-about v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  showIcons: true,
  entity: {
    content: '<p>Программа готовит IT-специалистов универсального профиля: вы&nbsp;научитесь работать с&nbsp;базами данных, обеспечивать безопасность информационных систем, создавать компьютерную графику, разрабатывать и&nbsp;сопровождать программное обеспечение.</p>',
    id: 30,
  },
};
