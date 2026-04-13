import { Nullable } from "./common";

export interface CitiesResponse {
  data: City[]
}

interface City {
  id: 'cities';
  type: string;
  attributes: CityAttributes;
  relationships: CityRelationships;
};

interface CityAttributes {
  name: string;
  name_en: string;
  slug: string;
  published: boolean;
  properties: CityProperties;
  rank: number;
  created_at: string;
  updated_at: string;
}

export interface CityProperties {
  codes: CityCodes;
  district: string;
  namecase: CityNamecase;
  coordinates: CityCoordinates;
}

export interface CityCodes {
  fias: string;
  kladr: string;
  oktmo: string;
}

export interface CityNamecase {
  nominative: string;
  genitive: string;
  dative: string;
  accusative: string;
  ablative: string;
  prepositional: string;
  locative: string;
}

export interface CityCoordinates {
  lat: number;
  lon: number;
}


interface CityRelationships {
  region: RegionRelation;
  country: CountryRelation;
  admissions: AdmissionsRelation;
}

interface RegionRelation {
  data: RegionData;
  links: Links;
}

interface RegionData {
  id: number;
  type: 'regions';
}

interface CountryRelation {
  data: CountryData;
  links: Links;
}

interface CountryData {
  id: number;
  type: 'countries';
}

interface AdmissionsRelation {
  data: AdmissionData[];
  links: Links;
}

interface AdmissionData {
  id: number;
  type: 'admissions';
}
