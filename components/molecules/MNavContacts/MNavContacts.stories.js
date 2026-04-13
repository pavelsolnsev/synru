import MNavContacts from './MNavContacts.vue';

export default {
  title: 'Molecules/MNavContacts',
  component: MNavContacts,
  argTypes: {},
};

const Template = (args) => ({
  components: { MNavContacts },
  setup() {
    return { args };
  },
  template: '<m-nav-contacts v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  address: [
    { name: 'Сокол', text: 'г. Москва, Ленинградский пр-т, д.&nbsp;80Б корпус&nbsp;5' },
    { name: 'Семёновская', text: 'г. Москва, ул. Измайловский вал, д. 2' },
    { name: 'Охотный ряд', text: 'г. Москва, ул. Тверская, д. 4' },
    { name: 'Водный стадион', text: 'г. Москва, ул. Смольная, д. 10' },
  ],
  schedules: [
    { name: 'Пн — Пт:', text: '09:00–20:00' },
    { name: 'Сб:', text: '10:00–19:00' },
    { name: 'Вс:', text: '10:00–17:00' },
  ],
  commonPhones: [
    '+7 495 800–10–01',
    '8 800 100–00–11',
  ],
  studentsPhones: ['8 800 350–00–60'],
};
