import MMenuToggled from './MMenuToggled.vue';

export default {
  title: 'Molecules/MMenuToggled',
  component: MMenuToggled,
  argTypes: {},
};

const Template = (args) => ({
  components: { MMenuToggled },
  setup() {
    return { args };
  },
  template: '<MMenuToggled v-bind="args" />',
});

export const Default = Template.bind({});

const MMenuToggledItems = [
  {
    title: 'Item 1',
    href: 'https://ya.ru/1',
  },
  {
    title: 'Item 2',
    href: 'https://ya.ru/2',
  },
  {
    title: 'Item 3',
    href: 'https://ya.ru/3',
  },
  {
    title: 'Item 4',
    href: 'https://ya.ru/4',
  },
  {
    title: 'Item 5',
    href: 'https://ya.ru/5',
    attributes: {
      'data-attr': 'text val',
      id: 'item-5',
    },
  },
];

Default.args = {
  title: 'Заголовок меню (смотреть на < 768px)',
  href: '',
  items: MMenuToggledItems,
};
