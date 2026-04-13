import MGraduateCard from './MGraduateCard.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Molecules/MGraduateCard',
  component: MGraduateCard,
  argTypes: {},
};

const Template = (args) => ({
  components: { MGraduateCard },
  setup() {
    return { args };
  },
  template: '<MGraduateCard v-bind="args" />',
});

export const Default = Template.bind({});

const mGraduateCardText = `<p class="a-font_m"><strong>Должность: </strong>Руководитель проектов</p><p class="a-font_m"><strong>Место работы: </strong>PM&nbsp;Excellence&nbsp;— PMC-подрядчик, оказывающий услуги управления крупными и&nbsp;мегапроектами (нефтегазовая, нефтехимическая, строительная, горнорудная промышленность, инфраструктура, энергетика, морские и&nbsp;речные порты и&nbsp;др.). </p><p class="a-font_m"><strong>Специальность: </strong>«Менеджмент», профиль «Менеджмент в&nbsp;организации»</p>`;

Default.args = {
  name: 'Заргарян Арсен Сержевич',
  info: 'Выпуск 2008, магистратура',
  text: mGraduateCardText,
  img: synergyRu('content/otzivi/1_kopiya.webp'),
};
