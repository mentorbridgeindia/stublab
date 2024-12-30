import { IModelMutation } from "@entities/Model";
import { UseFormReturn } from "react-hook-form";

export interface Variable {
  name: string;
  type: string;
  isNullable: boolean;
  defaultValue?: string;
  sampleText?: string;
}

export interface ModelFormProps {
  onFormSubmit: (data: IModelMutation, reset: () => void) => void;
  onCancel: () => void;
  form: UseFormReturn<IModelMutation>;
}

export interface ICreateModel {
  onFormSubmit: (data: IModelMutation, reset: () => void) => void;
  onCancel: () => void;
}

export interface IUseCreateModel {
  form: UseFormReturn<IModelMutation>;
  onFormSubmit: (data: IModelMutation, reset: () => void) => void;
}
