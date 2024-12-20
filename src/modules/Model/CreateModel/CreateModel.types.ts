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
}
