import { Nullable } from './common';
import { CountryRelation } from './Cities';

export interface RegionsResponse {
  data: Region[]
}

interface Region {
  id: string;
  type: 'regions';
  attributes: RegionAttributes;
  relationships: RegionRelationships;
};

interface RegionAttributes {
  name: string;
  fullname: string;
  name_en: string;
  slug: string;
  type: string;
  published: boolean;
  properties: RegionProperties;
  created_at: string;
  updated_at: string;
}

export interface RegionProperties {
  codes: {
    fias: Nullable<string>;
    kladr: Nullable<string>;
    oktmo: Nullable<string>;
  };
  district: Nullable<string>;
  namecase: {
    nominative: string;
    genitive: string;
    dative: string;
    ablative: string;
    prepositional: string;
    accusative: string;
    locative: string;
  };
}

interface RegionRelationships {
  country: CountryRelation;
}
