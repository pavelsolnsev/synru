import { ROUTES } from '~/constants';
import type { Nullable } from '~/types';

export const staticTagsByCategorySlugMap: Record<string, CategoriesRoute[]> = {
  ege: [
    {
      title: 'Новости ЕГЭ',
      to: ROUTES.EDU_NEWS_EGE,
    },
    {
      title: 'Расписание ЕГЭ в 2026 году',
      to: ROUTES.EGE_SCHEDULE,
    },
    {
      title: 'Минимальные баллы ЕГЭ в 2026 году',
      to: ROUTES.EDU_MINSCORE,
    },
    {
      title: 'Бланки ЕГЭ в 2026 году',
      to: ROUTES.EDU_EGE_BLANKI,
    },
  ],
  oge: [
    {
      title: 'Новости ОГЭ',
      to: ROUTES.EDU_NEWS_OGE,
    },
    {
      title: 'Расписание ОГЭ в 2026 году',
      to: ROUTES.OGE_SCHEDULE,
    },
    {
      title: 'Шкала перевода баллов ОГЭ в 2026 году',
      to: ROUTES.EDU_OGE_MINSCORE,
    },
    {
      title: 'Бланки ОГЭ в 2026 году',
      to: ROUTES.EDU_OGE_BLANKI,
    },
  ],
};

export interface CategoriesRoute {
  title: string;
  to: string;
  id?: string;
  entityType?: Nullable<string>;
}
