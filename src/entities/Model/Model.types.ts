import { IVariableEntity } from "../Variable";

export interface IModelEntity {
  id: string;
  name: string;
  variables: IVariableEntity[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface IGetModelsResult {
  data: IModelEntity[];
}

export interface IModelMutation {
  id?: string;
  name: string;
  variables: IVariableEntity[];
}
