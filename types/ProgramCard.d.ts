export interface ProgramCard {
  id: string;
  name: string;
  type: 'programs' | 'courses' | 'bs-entities' | 'mba-programs';
  faculty: EntityOption;
  level: EntityOption;
  forms: Record<number, EntityOption>;
  tags: Record<number, EntityOption>;
  place: string;
  link: string;
  new: boolean;
  isPopular: boolean;
  partner: boolean;
  partnerLogo?: string;
  partnerText?: string;
  partnerBonus?: string;
  published_at: string;
  popup: boolean;
  customFields: Record<string, unknown>[];
  advantages?: { text: string, value: string }[];
  program?: { title: string, description: unknown }[];
  presentation: string;
  rank: number;
  direction_ico: string;
  price?: Nullable<number>;
}

export interface EntityOption {
  value: number;
  text: string;
  disabled?: false;
  [key: string]: unknown;
}

export type ProgramMap = Record<'courses' | 'programs', Record<string, ProgramCard>>;
