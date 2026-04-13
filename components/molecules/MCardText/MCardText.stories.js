import MCardText from './MCardText.vue';

export default {
  title: 'Molecules/MCardText',
  component: MCardText,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    titleClass: {
      control: { type: 'select' },
      options: [
        'primary',
        'white',
        'black',
        'grey',
        'blur',
        'fill',
        'fill_grey_20',
        'fill_grey_40',
      ],
    },
    text: {
      control: { type: 'text' },
    },
    textClass: {
      control: { type: 'select' },
      options: [
        'primary',
        'white',
        'black',
        'grey',
        'blur',
        'fill',
        'fill_grey_20',
        'fill_grey_40',
      ],
    },
    tags: {
      control: { type: 'object' },
    },
    tagClass: {
      control: { type: 'select' },
      options: [
        'primary',
        'white',
        'black',
        'grey',
        'blur',
        'fill',
        'fill_grey_20',
        'fill_grey_40',
      ],
    },
    icons: {
      control: { type: 'object' },
    },
    isBig: {
      control: { type: 'boolean' },
    },
    bgImageLg: {
      control: { type: 'text' },
    },
    bgImageMd: {
      control: { type: 'text' },
    },
    bgImage: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => ({
  components: { MCardText },
  setup() {
    return { args };
  },
  template: '<m-card-text v-bind="args" />',
});

const Slot = (args) => ({
  components: { MCardText },
  setup() {
    return { args };
  },
  template: '<m-card-text v-bind="args">slot</m-card-text>',
});

export const Default = Template.bind({});
Default.args = {
  title: 'О факультете',
  text: 'Это старт для тех, кто видит свое призвание в&nbsp;медицине и&nbsp;помощи людям. В&nbsp;демо-вузе вы&nbsp;сможете получить востребованную специальность и&nbsp;успешно начать карьеру.',
  icons: ['star', 'check'],
};

export const Tags = Template.bind({});
Tags.args = {
  title: 'О курсах',
  text: ' Программы переподготовки подойдут тем, кто уже получил специальность, но&nbsp;хочет поменять род деятельности и&nbsp;получить помощь в&nbsp;трудоустройстве. Их&nbsp;продолжительность&nbsp;— от&nbsp;6 месяцев ',
  icons: ['clock'],
  tags: ['Переподготовка — от 6 месяцев', 'Курсы — от 1 месяца'],
};

export const BigSlot = Slot.bind({});
BigSlot.args = {
  title: 'MCardText',
  text: 'Большая молекула со слотом',
  isBig: true,
};
