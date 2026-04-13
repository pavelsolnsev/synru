export const typeLabels = {
  all: 'Все направления',
  photo: 'Фото',
  video: 'Видео',
  language: 'Язык и тексты',
  design: 'Иллюстрация и дизайн',
  development: 'Разработка',
  offline: 'Офлайн-профессии',
  smm: 'SMM',
  sales: 'Продажи',
  gaming: 'Игры и киберспорт',
} as const;

export type TypeLabelKey = keyof typeof typeLabels;

export interface FilterItem {
  id: number;
  name: string;
  type: TypeLabelKey[];
}

export const filtersData: FilterItem[] = [
  {
    id: 1,
    name: 'Основы мобильной фотографии (с 0 до про)',
    type: ['photo'],
  },
  {
    id: 2,
    name: 'Создание анимации',
    type: ['video'],
  },
  {
    id: 3,
    name: 'Рилсмейкер',
    type: ['video'],
  },
  {
    id: 4,
    name: 'Основы блогинга',
    type: ['video'],
  },
  {
    id: 5,
    name: 'Ведущий подкастов',
    type: ['video'],
  },
  {
    id: 6,
    name: 'Саунд-дизайнер',
    type: ['video'],
  },
  {
    id: 7,
    name: 'Озвучка аниме',
    type: ['video'],
  },
  {
    id: 8,
    name: 'Копирайтер (написание рефератов для школы)',
    type: ['language'],
  },
  {
    id: 9,
    name: 'Переводчик фильмов, контента с иностранных языков',
    type: ['language'],
  },
  {
    id: 10,
    name: 'Графический дизайнер',
    type: ['design'],
  },
  {
    id: 11,
    name: 'Дизайнер презентаций',
    type: ['design'],
  },
  {
    id: 12,
    name: 'Дизайнер карточек для маркетплейсов',
    type: ['design'],
  },
  {
    id: 13,
    name: 'Дизайн с ИИ',
    type: ['design'],
  },
  {
    id: 14,
    name: 'Специалист по ретуши фото',
    type: ['design'],
  },
  {
    id: 15,
    name: 'Создание стикеров',
    type: ['design'],
  },
  {
    id: 16,
    name: 'Дизайнер печатной продукции (визитки, флаеры)',
    type: ['design'],
  },
  {
    id: 17,
    name: 'Создание сайтов без кода (Tilda)',
    type: ['development'],
  },
  {
    id: 18,
    name: 'Создание чат-ботов',
    type: ['development'],
  },
  {
    id: 19,
    name: 'Редактор сайтов (HTML, CSS)',
    type: ['development'],
  },
  {
    id: 20,
    name: 'Разработчик мини-приложений',
    type: ['development'],
  },
  {
    id: 21,
    name: 'Организация мероприятий (вечеринки, квесты)',
    type: ['offline'],
  },
  {
    id: 22,
    name: 'Аниматор',
    type: ['offline'],
  },
  {
    id: 23,
    name: 'Няня',
    type: ['offline'],
  },
  {
    id: 24,
    name: 'Догситтер, выгул собак, присмотр за питомцем',
    type: ['offline'],
  },
  {
    id: 25,
    name: 'Флорист',
    type: ['offline'],
  },
  {
    id: 26,
    name: 'Бариста',
    type: ['offline'],
  },
  {
    id: 27,
    name: 'Школа моделей',
    type: ['offline'],
  },
  {
    id: 28,
    name: 'Визажист',
    type: ['offline'],
  },
  {
    id: 29,
    name: 'Экскурсовод',
    type: ['offline'],
  },
  {
    id: 30,
    name: 'Репетитор для учеников младших классов',
    type: ['offline'],
  },
  {
    id: 31,
    name: 'Модератор чатов/сообществ',
    type: ['smm'],
  },
  {
    id: 32,
    name: 'Мемолог',
    type: ['smm'],
  },
  {
    id: 33,
    name: 'Менеджер чата поддержки',
    type: ['smm'],
  },
  {
    id: 34,
    name: 'Комьюнити-менеджер',
    type: ['smm'],
  },
  {
    id: 35,
    name: 'Основы фриланса.',
    type: ['sales'],
  },
  {
    id: 36,
    name: 'Создание и продажа handmade-товаров',
    type: ['sales'],
  },
  {
    id: 37,
    name: 'Менеджер по продажам',
    type: ['sales'],
  },
  {
    id: 38,
    name: 'Ассистент для маркетплейсов (карточки и работа с отзывами)',
    type: ['sales'],
  },
  {
    id: 39,
    name: 'Разработчик игровых модов',
    type: ['gaming'],
  },
  {
    id: 40,
    name: 'Комментатор/аналитик в киберспорте',
    type: ['gaming'],
  },
];
