import { ApplicationFormData } from './ApplicationFormData';

export interface ApplicationModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (formData: ApplicationFormData) => void;
}
