
export interface FormFieldProps {
    label: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isTextArea?: boolean;
    error?: string;
  }
  