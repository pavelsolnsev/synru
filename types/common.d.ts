type Fonts =
  | 'a-font_banner'
  | 'a-font_banner-text'
  | 'a-font_h0 '
  | 'a-font_h1'
  | 'a-font_h1-min'
  | 'a-font_h2'
  | 'a-font_h3'
  | 'a-font_h4'
  | 'a-font_h5'
  | 'a-font_h6'
  | 'a-font_slider'
  | 'a-font_slider-text'
  | 'a-font_xl'
  | 'a-font_xl-m'
  | 'a-font_l'
  | 'a-font_l-m'
  | 'a-font_m'
  | 'a-font_m-m'
  | 'a-font_s'
  | 'a-font_s-m'
  | 'a-font_xs'
  | 'a-font_xs-m'
  | 'a-font_xs-r'
  | 'a-font_xxs'
  | 'a-font_xxs-m';

type FormBgColor =
  | 'transparent'
  | 'black'
  | 'grey_40'
  | 'grey_20'
  | 'grey_10'
  | 'red'
  | 'white';

type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

type FontSizeClass =
  | 'a-font_xl'
  | 'a-font_xl-m'
  | 'a-font_l'
  | 'a-font_l-m'
  | 'a-font_m'
  | 'a-font_m-m'
  | 'a-font_s'
  | 'a-font_s-m'
  | 'a-font_xs'
  | 'a-font_xs-m'
  | 'a-font_xxs'
  | 'a-font_xxs-m';

type Nullable<T> = T | null;

interface ErrorCodeData {
  title: string;
  images: string[];
  btn: {
    text: string;
    attributes: Record<string, unknown>;
  };
  description?: string;
}

interface QuizSlide {
  question: string;
  answers: string[];
  type?: string;
  class?: string;
}

type EntityCount = Record<string, {
  directions_count?: number;
  faculties_count?: number;
  programs_count?: number;
}>;

type PartialDeep<T> =
  // eslint-disable-next-line no-unused-vars
  T extends (...args: unknown[]) => unknown ? T :
    T extends Promise<infer U> ? Promise<PartialDeep<U>> :
      T extends Observable<infer U> ? Observable<PartialDeep<U>> :
          {
            [P in keyof T]?: PartialDeep<T[P]>
          };

type DeepRemap<T> = T extends (...args: any[]) => any
  ? T
  : T extends object
    ? { [K in keyof T]: DeepRemap<T[K]>; }
    : T;

type SectionConditionalType =
  'hide'
  | 'show'
  | 'ids'
  | 'excludeIds'
  | 'params'
  | 'excludeParams'
  | 'route'
  | 'excludeRoute'
  | 'beforeDate'
  | 'afterDate'
  | 'routes'
  | 'excludeRoutes';

interface SectionConditionalGroup {
  conditionalType: Nullable<SectionConditionalType>
  conditional: Nullable<string>;
};

type EntityTypes =
  | 'cities'
  | 'courses'
  | 'customEntities'
  | 'custom-entities'
  | 'faculties'
  | 'programs'
  | 'levels'
  | 'forms'
  | 'tags'
  | 'directions';

type RegistrationDataKey =
  | 'default'
  | 'price'
  | 'score'
  | 'budget'
  | 'credit'
  | 'application'
  | 'proftest';

interface BreadcrumbItem {
  external?: boolean,
  title: string,
  link: string,
}

export type {
  Fonts,
  FontSizeClass,
  FormBgColor,
  InputMode,
  Nullable,
  ErrorCodeData,
  QuizSlide,
  EntityCount,
  PartialDeep,
  SectionConditionalType,
  SectionConditionalGroup,
  EntityTypes,
  RegistrationDataKey,
  DeepRemap,
  BreadcrumbItem,
};
