import type { Direction, HelpCard } from './SChooseDirectionData';
import { synergyApi } from '~/utils/mediaCdn';

export const helpCard: HelpCard = {
  title: 'Не&nbsp;могу определиться',
  description: 'Пока не&nbsp;выбрали профессию?',
  text: 'Расскажите специалисту о&nbsp;своих интересах и&nbsp;склонностях. Он&nbsp;поможет выбрать направление, подходящее именно вам',
  btn: 'Помогите выбрать',
  formId: 'direction-help-cant',
  type: 'helpCard',
};

const directionsDistance: Array<Direction | HelpCard> = [
  {
    title: 'Юриспруденция',
    text: 'Юрист, правоохранительная деятельность',
    titleForm: 'Скачайте программы по&nbsp;направлению «Юриспруденция»',
    icon: 'urid',
    iconSm: 'icons7_small/yurisprudencziya',
    iconNew: synergyApi('uploads/content/s-directions/urid.webp'),
  },
  {
    title: 'IT и&nbsp;инженерия',
    text: 'Программирование и&nbsp;разработка, игры, робототехника, строительство, БПЛА',
    titleForm: 'Скачайте программы по&nbsp;направлению «IT и&nbsp;инженерия»',
    icon: 'it',
    iconSm: 'icons7_small/programmirovanie',
    iconNew: synergyApi('uploads/content/s-directions/it.webp'),
  },
  {
    title: 'Бизнес и&nbsp;менеджмент',
    text: 'Маркетинг, финансы, бухгалтерия, управление',
    titleForm: 'Скачайте программы по&nbsp;направлению «Бизнес и&nbsp;менеджмент»',
    icon: 'business',
    iconSm: 'icons7_small/biznesa',
    iconNew: synergyApi('uploads/content/s-directions/business.webp'),
  },
  helpCard,
  {
    title: 'Психология',
    text: 'Клиническая, детская консультативная, семейная, коучинг',
    titleForm: 'Скачайте программы по&nbsp;направлению «Психология»',
    icon: 'psih',
    iconSm: 'icons7_small/psixologiya',
    iconNew: synergyApi('uploads/content/s-directions/psih.webp'),
  },
  {
    title: 'Педагогика',
    text: 'Учитель, воспитатель, преподаватель',
    titleForm: 'Скачайте программы по&nbsp;направлению «Педагогика»',
    icon: 'ped',
    iconSm: 'icons7_small/fakultetpedagogika',
    iconNew: synergyApi('uploads/content/s-directions/ped.webp'),
  },
  {
    title: 'Творчество',
    text: 'Дизайн, анимация, игры, кино и&nbsp;театр, музыка',
    titleForm: 'Скачайте программы по направлению «Творчество»',
    icon: 'tvor',
    iconSm: 'icons7_small/dizajn',
    iconNew: synergyApi('uploads/content/s-directions/tvor.webp'),
  },
];


export const directionsData = {
  'distance': {
    directions: directionsDistance,
    actionParams: [
      { param: 'form=postupi_short_f_d' },
    ],
  },
};
