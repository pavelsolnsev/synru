import SMediaCenterSmi from './SMediaCenterSmi.vue';

export default {
  title: 'sections/mediacenter/SMediaCenterSmi',
  component: SMediaCenterSmi,
  argTypes: {},
};

const Template = (args) => ({
  components: { SMediaCenterSmi },
  setup() {
    return { args };
  },
  template:
    '<div><SMediaCenterSmi v-bind="args"/></div>',
});

export const Default = Template.bind({});


Default.args = {
  title: 'СМИ о&nbsp;нас',
  btnText: 'Кнопка',
  btnHref: '#',
  items: [
    {
      title: 'В оплате контента видят вклад в развитие медиа',
      href: '#',
      date: '21.11.2025',
      source: 'Источник',
    },
    {
      title: 'В оплате контента видят вклад в развитие медиа',
      href: '#',
      date: '21.11.2025',
      source: 'Источник',
    },
    {
      title: 'В оплате контента видят вклад в развитие медиа',
      href: '#',
      date: '21.11.2025',
      source: 'Источник',
    },
    {
      title: 'В оплате контента видят вклад в развитие медиа',
      href: '#',
      date: '21.11.2025',
      source: 'Источник',
    },
  ],
};
