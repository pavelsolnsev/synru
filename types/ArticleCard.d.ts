import type { Fonts } from '~/types';

export interface ArticleCard {
  title?: string;
  titleClass?: Fonts;
  text?: string;
  textClass?: Fonts;
  to?: string;
  tag?: string;
  image?: string;
  date?: string;
  dateClass?: Fonts;
}
