export interface ResponsePersons {
  data: Person[]
}

interface Person {
  id: string;
  type: string;
  attributes: PersonAttributes;
  relationships: PersonRelationships;
};

interface PersonAttributes {
  name: string;
  patronymic: string;
  surname: string;
  position: string;
  description: string;
  regalia: string;
  photo: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface PersonRelationships {
  tags: Tags;
}

interface Tags {
  data: TagData[];
  links: Links;
}

interface TagData {
  id: number;
  type: string;
}
