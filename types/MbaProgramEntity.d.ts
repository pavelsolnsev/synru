import type { Nullable } from './common';

export interface MbaProgramEntity {
  id: number;
  name: string;
  slug: string;
  annotation: string;
  image_url: string;
  published: boolean;
  properties?: {
    title?: string;
    description?: string;
  };
  rank: number;
  customFields: CustomFieldMbaPrograms;
}

interface CustomFieldMbaPrograms {
  mba_programs_dates_start: [{
    date_from: Nullable<string>;
    time_from: Nullable<string>;
  }];
  mba_program_advantages: Array<{
    text: Nullable<string>;
  }>;
  mba_program_get: Array<{
    text: Nullable<string>;
  }>;
  mba_program_why_choose: Array<{
    text: Nullable<string>;
  }>;
  mba_program_who: Array<{
    percent: Nullable<string>;
    title: Nullable<string>;
  }>;
  mba_program_location: Array<{
    title: Nullable<string>;
    address: Nullable<string>;
    description: Nullable<string>;
    image: Nullable<string>;
    place: Nullable<string>;
    tags: Array<{
      text: Nullable<string>;
    }>;
  }>;
  learning_program: Array<
    {
      title: Nullable<string>;
      duration: Nullable<string>;
      description: Nullable<string>;
    }
  >;
  mba_program_hero?: Array<
    {
      title: Nullable<string>;
      btnText: Nullable<string>;
      file: Nullable<string>;
      imageLG: Nullable<string>;
      imageMD: Nullable<string>;
      imageSM: Nullable<string>;
      cards?: Array<{
        description: string;
        title: string;
      }>
      tags?: Array<{
        tag: string;
      }>
    }
  >;
  mba_program_experience?: Array<{
    title: Nullable<string>;
    cards?: Array<{
      discription: string;
      title: string;
      bg: string;
    }>
    tags?: Array<{
      title: string;
    }>
  }>;
  mba_program_accent?: Array<{
    title: Nullable<string>;
    cards?: Array<{
      title: string;
      icon: string;
      text: Nullable<string>
    }>
  }>;
  mba_program_result?: Array<{
    title: Nullable<string>;
    cards?: Array<{
      title: string;
      icon: string;
    }>
  }>;
  mba_program_graphics?: Array<{
    title: Nullable<string>;
    subtitle: Nullable<string>;
    imageLG: Nullable<string>;
    imageMD: Nullable<string>;
    imageSM: Nullable<string>;
    cards?: Array<{
      title: string;
      subtitle: string;
      icon: string;
    }>
  }>;
  mba_program_download?: Array<{
    title: Nullable<string>;
    btnText: Nullable<string>;
    imageLG: Nullable<string>;
    imageMD: Nullable<string>;
    imageSM: Nullable<string>;
    actionParams?: { param: string }[]
  }>;
  mba_program_organized?: Array<{
    title: Nullable<string>;
    subtitle: Nullable<string>;
    description: Nullable<string>;
    cards?: Array<{
      title: string;
      subtitle: string;
      icon: string;
    }>
  }>;
  mba_program_document?: Array<{
    title: Nullable<string>;
    description: Nullable<string>;
    imageLG: Nullable<string>;
    imageMD: Nullable<string>;
    imageSM: Nullable<string>;
  }>;
  mba_program_content?: Array<{
    title: Nullable<string>;
    subtitle: Nullable<string>;
    tags?: Array<{
      tag: string;
    }>;
    baseModules?: Array<contentModule>;
    bonusModules?: Array<contentModule>;
  }>;
  mba_experts?: Array<number>;
  mba_program_price?: Array<{
    title: Nullable<string>;
    monthPrice: Nullable<string>;
    oldMonthPrice: Nullable<string>;
    totalPrice: Nullable<string>;
    oldTotalPrice: Nullable<string>;
    discount: Nullable<string>;
    left: Nullable<string>;
    timeLeft: Nullable<string>;
    formTitle: Nullable<string>;
    formSubtitle: Nullable<string>;
    actionParams?: { param: string }[]
  }>
}

export interface contentModule {
  title: string;
  tags?: {
    tag: string;
  }[];
  content?: string;
}

