import type { Admission, AdmissionsFilterData, Region, Country, CitiesResponse } from '~/types';
import { ONE_HOUR } from '~/constants/timeToCache';
import { KEYS } from '~/constants';

const REGION_FILTER_QUERY = {
  'filter[published]': true,
  'page[size]': 0,
  'include': 'country,region,admissions'
}

export default defineCachedEventHandler(async (event): Promise<Record<string, AdmissionsFilterData> | undefined> => {
  const config = useRuntimeConfig(event);

  try {
    const query = getQuery(event);
    const response = await $fetch<CitiesResponseWithIncludes>(`${config.public.apiBase}/api/cities`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      query: {
        ...REGION_FILTER_QUERY,
        ...query,
      },
    });

    return transform(response);
  } catch (err) {
    console.error(err);
  }
}, {
  maxAge: ONE_HOUR,
  name: KEYS.REGIONS_FILTER_DATA,
  getKey: () => 'default',
});

function transform(res: CitiesResponseWithIncludes) {
  if (!res) return {};

  const entities = {
    admissions: {} as Record<string, AdmissionsFilterData>,
    cities: {} as Record<string, CitiesFilterData>,
    regions: {} as Record<string, RegionsFilterData>,
    countries: {} as Record<string, CountriesFilterData>,
  }

  res.included.forEach((include) => {
    if (include.type === 'admissions' && include.attributes.published) {
      entities.admissions[include.id] = {
        id: include.id,
        rank: include.attributes.rank,
        key: include.id,
        value: '',
        name: include.attributes.name,
        country: '',
        iscapital: false,
        isfilial: '',
        filial_name: '',
        latitude: include.attributes?.properties?.coordinates?.latitude,
        longitude: include.attributes?.properties?.coordinates?.longitude,
        published: include.attributes.published,
        region: '',
        district: '',
        director: include.attributes.director,
        schedule: include.attributes.schedule,
        address: include.attributes.address,
        email: include.attributes.email,
        phone_main: include.attributes.phone_main,
        phone: include.attributes.phone_advanced,
        slug: '',
      };
    }

    if (include.type === 'countries') {
      entities.countries[include.id] = {
        id: include.id,
        name: include.attributes.name,
      };
    }

    if (include.type === 'regions') {
      entities.regions[include.id] = {
        id: include.id,
        fullname: include.attributes.fullname,
      };
    }
  });

  res.data.forEach((city) => {
    entities.cities[city.id] = {
      id: city.id,
      name: city.attributes.name,
      slug: city.attributes.slug,
      country_id: city.relationships.country.data?.id || null,
      region_id: city.relationships.region.data?.id || null,
      district: city.attributes.properties?.district ? city.attributes.properties.district : null,
      admissions: city.relationships.admissions.data.map((admission) => {
        return admission.id;
      }),
    };
  });

  Object.values(entities.cities).forEach((city) => {
    city.admissions.forEach((admission) => {
      entities.admissions[admission].value = city.name;
      entities.admissions[admission].country = city.country_id ? entities.countries[city.country_id]?.name : '';
      entities.admissions[admission].region = defineRegion({
        city,
        region: city?.region_id ? entities.regions[city?.region_id] : null,
        admission:entities.admissions[admission],
      });
      entities.admissions[admission].district = city.district ? String(city.district) : '0';
      entities.admissions[admission].slug = city.slug;
     if (city.name === 'Москва') {
        entities.admissions[admission].iscapital = true;
      }
    });
  })

  return entities.admissions;
}

function defineRegion(options: { city: CitiesFilterData, region: RegionsFilterData | null, admission: AdmissionsFilterData }) {
  const { city, region, admission } = options;

  if (!region) {
    return admission.country !== 'Россия' ? admission.country : '';
  };

  if (city.name === 'Москва') return admission.name;

  return city.region_id ? region?.fullname : '';
}

type CityInclude = Admission | Region | Country;

interface CitiesResponseWithIncludes extends CitiesResponse {
  included: CityInclude[]
}

interface CountriesFilterData {
  id: string;
  name: string;
}

interface RegionsFilterData {
  id: string;
  fullname: string;
}

interface CitiesFilterData {
  id: string;
  name: string;
  slug: string;
  country_id: number | null;
  region_id: number | null;
  district: string | null;
  admissions: number[];
}
