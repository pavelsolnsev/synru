import Bg1Lg from '~/assets/images/quiz/main/second/banner_2_1_lg.webp';
import Bg1Md from '~/assets/images/quiz/main/second/banner_2_1_md.webp';
import Bg1Sm from '~/assets/images/quiz/main/second/banner_2_1_sm.webp';
import Bg2Lg from '~/assets/images/quiz/main/second/banner_2_2_lg.webp';
import Bg2Md from '~/assets/images/quiz/main/second/banner_2_2_md.webp';
import Bg2Sm from '~/assets/images/quiz/main/second/banner_2_2_sm.webp';
import Bg3Lg from '~/assets/images/quiz/main/second/banner_2_3_lg.webp';
import Bg3Md from '~/assets/images/quiz/main/second/banner_2_3_md.webp';
import Bg3Sm from '~/assets/images/quiz/main/second/banner_2_3_sm.webp';
import type { Fonts } from '~/types';

export const slides: MainQuizSecond[] = [
  {
    title: '№&nbsp;1 по трудоустроенным выпускникам',
    titleClass: 'a-font_banner',
    description: 'по&nbsp;данным Федеральной службы по&nbsp;труду и&nbsp;занятости',
    descriptionClass: 'a-font_l-m s-main-banner__description--gray',
    text: 'Узнайте минимальный проходной балл в&nbsp;2026 году, оставив заявку',
    textClass: 'a-font_h6',
    imageLg: Bg3Lg,
    imageMd: Bg3Md,
    imageSm: Bg3Sm,
  },
  {
    title: 'В&nbsp;<nobr>топ-3</nobr> по&nbsp;зарплатам выпускников',
    titleClass: 'a-font_banner',
    description: 'по&nbsp;данным Федеральной службы по&nbsp;труду и&nbsp;занятости',
    descriptionClass: 'a-font_l-m s-main-banner__description--gray',
    text: 'Узнайте минимальный проходной балл в&nbsp;2026 году, оставив заявку',
    textClass: 'a-font_h6',
    imageLg: Bg2Lg,
    imageMd: Bg2Md,
    imageSm: Bg2Sm,
  },
  {
    title: 'Гарантируем работу по&nbsp;специальности',
    titleClass: 'a-font_banner',
    description: 'Трудоустройство включено в договор',
    descriptionClass: 'a-font_l-m s-main-banner__description--gray',
    text: 'Узнайте минимальный проходной балл в&nbsp;2026 году, оставив заявку',
    textClass: 'a-font_h6',
    imageLg: Bg1Lg,
    imageMd: Bg1Md,
    imageSm: Bg1Sm,
  },
];

export interface MainQuizSecond {
  title: string;
  titleClass: Fonts;
  description: string;
  descriptionClass: string;
  text: string;
  textClass: Fonts;
  imageLg: string;
  imageMd: string;
  imageSm: string;
}
