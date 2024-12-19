import React from 'react';
import { FormInput } from '@atoms/FormInput/FormInput';
import { FormLabel } from '@atoms/FormLabel/FormLabel';
import { FormFieldProps } from './FormFieldProps';

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
