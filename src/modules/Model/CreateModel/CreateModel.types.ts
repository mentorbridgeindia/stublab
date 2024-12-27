import { UseFormReturn } from "react-hook-form";

export interface Variable {
  name: string;
  type: string;
  isNullable: boolean;
  defaultValue?: string;
  sampleText?: string;
}

export interface ModelData {
  modelName: string;
  variables: Variable[];
}

export interface ModelFormProps {
  onFormSubmit: (data: ModelData, reset: () => void) => void;
  onCancel: () => void;
  form: UseFormReturn<ModelData>;
}


export interface ICreateModel {
  onFormSubmit: (data: ModelData, reset: () => void) => void;
  onCancel: () => void;
}

export interface IUseCreateModel {
  form: UseFormReturn<ModelData>;
  onFormSubmit: (data: ModelData, reset: () => void) => void;
}
