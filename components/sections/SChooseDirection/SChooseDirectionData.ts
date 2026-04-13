export interface Direction {
  title: string;
  text: string;
  titleForm: string;
  icon: string;
  iconSm: string;
  iconNew?: string;
}

export interface HelpCard {
  title: string;
  description: string;
  text: string;
  formId: string;
  type: 'helpCard'
  btn?: string;
}

export interface DirectionDataType {
  directions: Array<Direction | HelpCard>,
  actionParams?: { param: string }[],
} 

import { directionsData as level } from './SChooseDirectionDataLevel';
import { directionsData as format } from './SChooseDirectionDataFormat';
import { directionsData as colleges } from './SChooseDirectionDataColleges';

export const directionType = {
  level,
  format,
  colleges,
} as const;