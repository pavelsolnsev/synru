import { Nullable } from "./common";

export interface AdmissionsResponse {
  data: Admission[]
}

interface Admission {
  id: string;
  type: 'admissions';
  attributes: AdmissionAttributes;
  relationships: AdmissionRelationships;
};

interface AdmissionAttributes {
  type: 'partner' | 'representation' | 'branch';
  name: string;
  rank: number;
  email: Nullable<string>;
  phone_main: Nullable<string>;
  phone_advanced: Nullable<string>;
  website: Nullable<string>;
  address: Nullable<string>;
  schedule: Nullable<string>;
  director: Nullable<string>;
  published: boolean;
  properties: {
    coordinates: {
      latitude: string;
      longitude: string;
    }
  }
  created_at: string;
  updated_at: string;
}

interface AdmissionAttributesWithId extends AdmissionAttributes {
  id: string;
}

interface AdmissionRelationships {
  city: CityRelation;
}

interface CityRelation {
  data: CityData;
  links: Links;
}

interface CityData {
  id: number;
  type: 'cities';
}

export interface AdmissionsFilterData {
  id: string;
  rank: number;
  key: string;
  name: string;
  value: string;
  country: string;
  iscapital: boolean;
  isfilial: string;
  filial_name: string;
  latitude: string | null;
  longitude: string | null;
  published: boolean;
  region: string;
  district: string;
  director: string | null;
  schedule: string | null;
  address: string | null;
  email: string | null;
  phone_main: string | null;
  phone: string | null;
  slug: string;
}
