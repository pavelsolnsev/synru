import type { DirectionResponseData } from './Direction';
import type { LevelResource, FormResource } from './entities';
import type { FacultyEntity } from './FacultyEntity';

type FacultyResponseIncluded = LevelResource | FormResource | DirectionResponseData;

export interface FacultiesResponse {
  data: FacultyWithProgram[];
  included: FacultyResponseIncluded[];
  links?: Record<string, string>;
  meta?: Record<string, unknown>;
}

export interface FacultyWithProgram {
  id: string;
  type: 'faculty';
  attributes: FacultyWirhProgramAttributes;
  relationships: RelationshipsObject;
}

export interface FacultyWirhProgramAttributes extends FacultyEntity {
  programs_count: number
  courses_count?: number
}

export interface Direction {
  id: string;
  type: 'directions';
  attributes: DirectionAttributes;
  relationships: unknown;
}

export interface DirectionAttributes {
  name: string;
  rank: number;
  [key: string]: unknown;
}
