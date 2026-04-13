type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

/**
 * @see https://jsonapi.org/format/1.0/#document-meta
 */
export type MetaObject = {
  links?: LinksObject;
  [propName: string]: unknown;
};

/**
 * @see https://jsonapi.org/format/1.0/#document-resource-object-attributes
 */
export type AttributesObject = {
  [attrName: string]: unknown;
};

/**
 * @see https://jsonapi.org/format/1.0/#document-links
 */
export type LinkObject = {
  href: string;
  meta?: MetaObject;
};

/**
 * @see https://jsonapi.org/format/1.0/#document-links
 */
export type Link = string | LinkObject;

/**
 * @see https://jsonapi.org/format/1.0/#document-links
 */
export type LinksObject = {
  [linkName: string]: Link;
};

/**
 * @see https://jsonapi.org/format/1.0/#document-top-level
 */
export type TopLevelLinksObject = {
  self?: Link;
  related?: Link;
  first?: Link | null;
  last?: Link | null;
  prev?: Link | null;
  next?: Link | null;
};

/**
 * @see https://jsonapi.org/format/1.0/#document-resource-identifier-objects
 */
export type ResourceIdentifierObject = {
  id: string;
  type: string;
  meta?: MetaObject;
};

/**
 * @see https://jsonapi.org/format/1.0/#document-resource-object-relationships
 */
export type RelationshipObject = {
  links?: LinksObject;
  data?: ResourceIdentifierObject | ResourceIdentifierObject[] | null;
  meta?: MetaObject;
};

/**
 * @see https://jsonapi.org/format/1.0/#document-resource-object-relationships
 */
export type RelationshipsObject = {
  [relationshipName: string]: RelationshipObject;
};

/**
 * @see https://jsonapi.org/format/1.0/#document-resource-objects
 */
export type ResourceObject = {
  id: string;
  type: string;
  attributes?: AttributesObject;
  relationships?: RelationshipsObject;
  links?: LinksObject;
  meta?: MetaObject;
};

/**
 * When sent by the client the id is not required
 *
 * @see https://jsonapi.org/format/1.0/#document-resource-objects
 * @hidden
 */
export type ClientResourceObject = {
  id?: string;
  type: string;
  attributes?: AttributesObject;
  relationships?: RelationshipsObject;
  links?: LinksObject;
  meta?: MetaObject;
};

/**
 * @see https://jsonapi.org/format/1.0/#error-objects
 */
export type ErrorObject = {
  id?: string;
  links?: LinksObject;
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
    [propName: string]: unknown;
  };
  meta?: MetaObject;
};

/**
 * @see https://jsonapi.org/format/1.0/#document-jsonapi-object
 */
export type JsonApiObject = {
  version?: string;
  meta?: MetaObject;
};

/**
 * This type looks a bit more complicated, as we require either the `data` or `errors` property,
 * but not both at the same time.
 *
 * @see https://jsonapi.org/format/1.0/#document-top-level
 */
export type JsonApiDocument = XOR<
  {
    data:
      | ResourceObject
      | ResourceObject[]
      | ResourceIdentifierObject
      | ResourceIdentifierObject[]
      | null;
  },
  { errors: ErrorObject[] }
> & {
  meta?: MetaObject;
  jsonapi?: JsonApiObject;
  links?: TopLevelLinksObject;
  included?: ResourceObject[];
};

/**
 * Some aspects of an JSON API document which are usually sufficient for client requests
 *
 * @experimental
 * @see https://jsonapi.org/format/1.0/#document-top-level
 */
export type ClientJsonApiDocument = {
  data: ClientResourceObject;
  included?: ResourceObject[];
};

export type DocumentMetaObject = {
  links?: LinksObject;
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
} & MetaObject;
