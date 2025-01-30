import { IVariableEntity } from "../Variable";

export interface IModelEntity {
  id: string;
  modelName: string;
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
  modelName: string;
  variables: IVariableEntity[];
}
