import React from 'react';
import { Form } from 'react-bootstrap';

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
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {isTextArea ? (
        <Form.Control
          as="textarea"
          rows={4}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Form.Control
          type="text"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
      {error && name === 'description' && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  );
};

export default FormField;
