import Image1 from '~/assets/images/s_about/1.webp';
import Image2 from '~/assets/images/s_about/2.webp';
import Image3 from '~/assets/images/s_about/3.webp';
import Image4 from '~/assets/images/s_about/4.webp';
import ImagePostgraduateStudy from '~/assets/images/s_levels/9091.webp';
import ImageOrdinatura from '~/assets/images/s_levels/45575.webp';
import { ROUTES } from '~/constants';

export const mainLevelsData: Record<string, Level> = {
  'college': {
    name: 'Колледж',
    title: 'Программы колледжа рассчитаны на&nbsp;выпускников 9-х и&nbsp;11-х классов',
    text: 'По&nbsp;окончании учёбы вы получите среднее профессиональное образование',
    items: [
      {
        image: Image1,
        title: '36',
        text: 'программ',
      },
      {
        image: Image2,
        title: '3–4&nbsp;года',
        text: 'срок обучения',
      },
      {
        classname: '--bg-red',
        image: Image3,
        title: 'Диплом',
        text: 'государственный',
      },
      {
        classname: '--bg-img',
        image: Image4,
        title: 'Центр карьеры',
        text: 'трудоустройство',
      },
    ],
    rank: 1,
    href: ROUTES.COLLEGE,
  },
  'pervoe_vysshee': {
    name: 'Бакалавриат',
    title: 'Бакалавриат&nbsp;— одна из&nbsp;законченных ступеней высшего образования',
    text: 'Учёба предполагает фундаментальную подготовку и&nbsp;длится 4 года. Поступать на&nbsp;программы бакалавриата могут обладатели среднего образования',
    items: [
      {
        image: Image1,
        title: '126',
        text: 'программ',
      },
      {
        image: Image2,
        title: '4–4,5&nbsp;года',
        text: 'срок обучения',
      },
      {
        classname: '--bg-red',
        image: Image3,
        title: 'Диплом',
        text: 'государственный',
      },
      {
        classname: '--bg-img',
        image: Image4,
        title: 'С&nbsp;1 курса',
        text: 'трудоустройство',
      },
    ],
    rank: 2,
    href: ROUTES.BACCALAUREATE,
  },
  'magistracy': {
    name: 'Магистратура',
    title: 'Магистратура&nbsp;— следующий после бакалавриата уровень высшего образования',
    text: 'Магистратура предполагает двухгодичное обучение',
    items: [
      {
        image: Image1,
        title: '45',
        text: 'программ',
      },
      {
        image: Image2,
        title: '2–2,5&nbsp;года',
        text: 'срок обучения',
      },
      {
        classname: '--bg-red',
        image: Image3,
        title: 'Диплом',
        text: 'государственный',
      },
      {
        classname: '--bg-img',
        image: Image4,
        title: 'С&nbsp;1 курса',
        text: 'трудоустройство',
      },
    ],
    rank: 3,
    href: ROUTES.MAGISTRACY,
  },
  'second_highest': {
    name: 'Второе высшее',
    title: 'Программа получения второго высшего образования по&nbsp;новому направлению',
    text: 'Подходит тем, кто уже окончил бакалавриат, специалитет или&nbsp;магистратуру',
    items: [
      {
        image: Image1,
        title: '129',
        text: 'программ',
      },
      {
        image: Image2,
        title: '3,6–4,6&nbsp;года',
        text: 'срок обучения',
      },
      {
        classname: '--bg-red',
        image: Image3,
        title: 'Диплом',
        text: 'государственный',
      },
      {
        classname: '--bg-img',
        image: Image4,
        title: 'С&nbsp;1 курса',
        text: 'трудоустройство',
      },
    ],
    rank: 4,
    href: ROUTES.SECOND_HIGHEST,
  },
  'speczialitet': {
    name: 'Специалитет',
    title: 'Программа получения высшего образования',
    text: 'Включает полный курс теоретических знаний и&nbsp;практических навыков, которые необходимы для работы по&nbsp;отраслевой специальности',
    items: [
      {
        image: Image1,
        title: '28',
        text: 'программ',
      },
      {
        image: Image2,
        title: '4 года',
        text: 'срок обучения',
      },
      {
        classname: '--bg-red',
        image: Image3,
        title: 'Диплом',
        text: 'государственный',
      },
      {
        classname: '--bg-img',
        image: Image4,
        title: 'С&nbsp;1 курса',
        text: 'трудоустройство',
      },
    ],
    rank: 5,
    href: ROUTES.SPECIALTY,
  },
  'postgraduate_study': {
    name: 'Аспирантура',
    title: 'Образовательная программа подготовки научных и&nbsp;<span style="white-space: nowrap;">научно-педагогических</span> кадров',
    text: 'Аспирант под&nbsp;руководством научного руководителя осуществляет <span style="white-space: nowrap;">научно-исследовательскую</span> деятельность с&nbsp;целью подготовки диссертации к&nbsp;защите. Поступить в&nbsp;аспирантуру могут лица, имеющие образование не&nbsp;ниже высшего (специалитет или&nbsp;магистратура)',
    items: [
      {
        image: Image1,
        title: '13',
        text: 'программ',
      },
      {
        image: Image2,
        title: '3 года',
        text: 'срок обучения',
      },
      {
        classname: '--bg-red',
        image: Image3,
        title: 'Свидетель-<br>ство',
        text: 'об&nbsp;окончании аспирантуры',
      },
      {
        classname: '--bg-img',
        image: ImagePostgraduateStudy,
        title: 'Очное',
        text: 'обучение',
      },
    ],
    rank: 6,
    href: ROUTES.POSTGRADUATE_STUDY,
  },
  'ordinatura': {
    name: 'Ординатура',
    title: 'Ординатура&nbsp;— это постдипломное профессиональное медицинское образование для подготовки врачей-специалистов',
    text: 'В&nbsp;ординатуру поступают после получения основного медицинского образования. Здесь медики углублённо изучают свою специализацию, получая практические навыки и&nbsp;знания для самостоятельной работы',
    items: [
      {
        image: Image1,
        title: '13',
        text: 'программ',
      },
      {
        image: Image2,
        title: '2 года',
        text: 'срок обучения',
      },
      {
        classname: '--bg-red',
        image: Image3,
        title: 'Диплом',
        text: 'об окончании ординатуры',
      },
      {
        classname: '--bg-img',
        image: ImageOrdinatura,
        title: 'Очное',
        text: 'обучение',
      },
    ],
    rank: 7,
    href: ROUTES.ORDINATURA,
  },
  'courses': {
    name: 'Курсы',
    title: 'Курсы от&nbsp;1 до&nbsp;6 месяцев для&nbsp;получения навыков, повышения квалификации или&nbsp;переподготовки',
    text: 'Подходят для тех, кто хочет сменить профессию или расширить свой инструментарий',
    items: [
      {
        image: Image1,
        title: '244',
        text: 'программ',
      },
      {
        image: Image2,
        title: 'Диплом',
        text: 'или&nbsp;сертификат по&nbsp;окончании обучения',
      },
      {
        classname: '--bg-red',
        image: Image3,
        title: 'Центр карьеры',
        text: 'поможем подобрать вакансии',
      },
    ],
    rank: 8,
    href: ROUTES.COURSES,
  },
  'business_school': {
    name: 'MBA',
    title: 'Бизнес-образование мирового уровня, доступное каждому',
    text: 'С&nbsp;1988 года мы&nbsp;помогаем компаниям, менеджерам и&nbsp;предпринимателям развиваться и&nbsp;достигать успехов, руководствуясь знаниями, практическим опытом и&nbsp;рекомендациями выдающихся спикеров и&nbsp;преподавателей. Лучшими становятся вместе с&nbsp;нами.',
    items: [
      {
        image: Image1,
        title: '46',
        text: 'программ',
      },
    ],
    rank: 9,
    href: ROUTES.BUSINESS_EDUCATION,
  },
};

export interface Level {
  title: string;
  text: string;
  items: Item[];
  name: string;
  rank: number;
  href: string;
}

interface Item {
  title?: string;
  text?: string;
  classname?: string;
  imageLg?: string;
  imageMd?: string;
  image?: string;
}
