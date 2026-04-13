import SDocs from './SDocs.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SDocs',
  component: SDocs,
  argTypes: {},
};

const Template = (args) => ({
  components: { SDocs },
  setup() {
    return { args };
  },
  template:
    '<div><SDocs v-bind="args"/></div>',
});

export const Default = Template.bind({});

Default.args = {
  title: 'Документы по&nbsp;окончании',
  subtitle: 'По окончании образовательной программы вы получаете один из документов',
  text: 'При&nbsp;успешном прохождении итоговой аттестации вы получите диплом государственного образца, подтверждающий ваши профессиональные компетенции.',
  docs: [
    {
      icon: synergyApi('uploads/content/s-docs/doc.svg'),
      image: synergyApi('uploads/content/s-docs/prof.jpg'),
      title: 'Диплом о профессиональной переподготовке',
    },
    {
      icon: synergyApi('uploads/content/s-docs/sertificate.svg'),
      image: synergyApi('uploads/content/s-docs/certificate.png'),
      title: 'Сертификат об успешном прохождении обучения',
    },
  ],
};

