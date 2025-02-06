import { ModelTypes } from "@/types";
import { IModelEntity } from "../Model/Model.types";

export interface IVariableEntity {
  id: string;
  name: string;
  type: ModelTypes;
  typeDetails: IModelEntity;
  isNullable?: boolean;
  defaultValue?: string;
  sampleText?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}
