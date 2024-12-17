import React from 'react';
import { FormInput } from '@atoms/FormInput/FormInput'; // Correct import
import { FormLabel } from '@atoms/FormLabel/FormLabel'; // Correct import

interface FormFieldProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  isTextArea = false,
  error,
}) => {
  return (
    <div className="mb-3">
      <FormLabel>{label}</FormLabel>
      <FormInput
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        isTextArea={isTextArea}
      />
      {error && name === 'description' && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default FormField;
