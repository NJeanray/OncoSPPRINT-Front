import type { Map } from 'immutable'

export type ProjectItemType = Map<
  string,
  {
    [key: string]: {
      owner_id: number,
      site: string,
      client_id: number,
      state: string,
      second_owner_id: number,
      project_code: string,
      owner_name: string,
      title: string,
      contact_id: number,
      type: string,
      id: number,
      description: string,
      client_name: string
    }
  }
>
export type ProjectType = Map<
  string,
  {
    isFetching: boolean,
    errors: any,
    data: Map<string, ProjectItemType>
  }
>

export type StudiesItemType = Map<
  string,
  {
    [key: string]: {
      id: number,
      name: string,
      state: string,
      type: string,
      site: string,
      project_id: number
    }
  }
>
export type StudiesType = Map<
  string,
  {
    isFetching: boolean,
    errors: any,
    data: Map<string, StudiesItemType>
  }
>

export type PartsItemType = Map<
  string,
  {
    [key: string]: {
      animal_per_cage: number,
      site: string,
      model: number,
      name: string,
      starting_date: string,
      model_type: string,
      study_id: number,
      animal_irradiation: boolean,
      humanization: boolean,
      ethical_protocol: number,
      type: string,
      id: number,
      animal: string
    }
  }
>
export type PartsType = Map<
  string,
  {
    isFetching: boolean,
    errors: any,
    data: Map<string, PartsItemType>
  }
>

export type StudyItemType = {
  [key: string]: {
    id: number,
    name: string,
    state: string,
    type: string,
    site: string,
    project_id: number
  }
}

export type StudyType = Map<
  string,
  {
    isFetching: boolean,
    errors: any,
    data: StudyItemType,
    updated: ?string
  }
>

export type PartItemType = {
  [key: string]: {
    animal_per_cage: number,
    site: string,
    model: number,
    name: string,
    starting_date: string,
    model_type: string,
    study_id: number,
    animal_irradiation: boolean,
    humanization: boolean,
    ethical_protocol: number,
    type: string,
    id: number,
    animal: string
  }
}

export type PartType = Map<
  string,
  {
    isFetching: boolean,
    errors: any,
    data: PartItemType,
    updated: ?string
  }
>
