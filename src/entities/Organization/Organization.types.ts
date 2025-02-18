export interface IOrganizationMutation {
  website: string;
  name: string;
  subDomain: string;
}

export interface IOrganizationEntity extends IOrganizationMutation {
  id: string;
}
