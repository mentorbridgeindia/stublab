import { ModelTypes } from "@/types";

export interface IVariableEntity {
  id: string;
  name: string;
  type: ModelTypes;
  isNullable?: boolean;
  defaultValue?: string;
  sampleText?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}
