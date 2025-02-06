export interface ICreateApplication {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (data: ApplicationFormData) => void;
}

export interface ApplicationFormData {
  name: string;
  path: string;
  description: string;
}
