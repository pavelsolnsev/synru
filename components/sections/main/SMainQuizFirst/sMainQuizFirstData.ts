import Bg1Lg from '~/assets/images/quiz/main/first/banner_1_1-lg.webp';
import Bg1Md from '~/assets/images/quiz/main/first/banner_1_1-md.webp';
import Bg1Sm from '~/assets/images/quiz/main/first/banner_1_1-sm.webp';
import Bg2Lg from '~/assets/images/quiz/main/first/banner_1_2_lg.webp';
import Bg2Md from '~/assets/images/quiz/main/first/banner_1_2_md.webp';
import Bg2Sm from '~/assets/images/quiz/main/first/banner_1_2_sm.webp';
import Bg3Lg from '~/assets/images/quiz/main/first/banner_1_3_lg.webp';
import Bg3Md from '~/assets/images/quiz/main/first/banner_1_3_md.webp';
import Bg3Sm from '~/assets/images/quiz/main/first/banner_1_3_sm.webp';
import Pag1 from '~/assets/images/quiz/main/first/pagination-1.webp';
import Pag2 from '~/assets/images/quiz/main/first/pagination-2.webp';
import Pag3 from '~/assets/images/quiz/main/first/pagination-3.webp';
import type { Fonts } from '~/types';

const currentYear = new Date().getFullYear();

export const slides: MainQuizFirst[] = [
  {
    title: '№&nbsp;1 по трудоустроенным выпускникам',
    titleClass: 'a-font_banner',
    description: 'по&nbsp;данным Федеральной службы по&nbsp;труду и&nbsp;занятости',
    descriptionClass: 'a-font_l-m s-main-banner__description--gray',
    text: `Узнайте минимальный проходной балл в&nbsp;${currentYear} году, оставив заявку`,
    textClass: 'a-font_h6',
    imageLg: Bg3Lg,
    imageMd: Bg3Md,
    imageSm: Bg3Sm,
    paginationImage: Pag3,
  },
  {
    title: 'В&nbsp;<nobr>топ-3</nobr> по&nbsp;зарплатам выпускников',
    titleClass: 'a-font_banner',
    description: 'по&nbsp;данным Федеральной службы по&nbsp;труду и&nbsp;занятости',
    descriptionClass: 'a-font_l-m s-main-banner__description--gray',
    text: `Узнайте минимальный проходной балл в&nbsp;${currentYear} году, оставив заявку`,
    textClass: 'a-font_h6',
    imageLg: Bg2Lg,
    imageMd: Bg2Md,
    imageSm: Bg2Sm,
    paginationImage: Pag2,
  },
  {
    title: 'Гарантируем работу по&nbsp;специальности',
    titleClass: 'a-font_banner',
    description: 'Трудоустройство включено в&nbsp;договор',
    descriptionClass: 'a-font_h5',
    text: `Узнайте минимальный проходной балл в&nbsp;${currentYear} году, оставив заявку`,
    textClass: 'a-font_h6',
    imageLg: Bg1Lg,
    imageMd: Bg1Md,
    imageSm: Bg1Sm,
    paginationImage: Pag1,
  },
];

export interface MainQuizFirst {
  title: string;
  titleClass: Fonts;
  description: string;
  descriptionClass: string;
  text: string;
  textClass: Fonts;
  imageLg: string;
  imageMd: string;
  imageSm: string;
  paginationImage: string;
}

