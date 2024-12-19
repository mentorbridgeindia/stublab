import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormInput } from '@atoms/FormInput/FormInput';
import { FormLabel } from '@atoms/FormLabel/FormLabel';
import FormAction from '@molecules/FormActionButtons';
import { ApplicationFormData } from './ApplicationFormData';
import { ApplicationModalProps } from './ApplicationModalProps';

const ApplicationModal: React.FC<ApplicationModalProps> = ({ show, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    path: '',
    description: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'description' && value.length > 1000) {
      setError('Description must not exceed 1000 characters.');
    } else {
      setError('');
    }

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    if (formData.description.length > 1000) {
      setError('Description must not exceed 1000 characters.');
      return;
    }

    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Application Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <FormLabel>Name</FormLabel>
          <FormInput
            placeholder="e.g., GetUserDetails"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <FormLabel>Path</FormLabel>
          <FormInput
            placeholder="e.g., /api/v1/users"
            name="path"
            value={formData.path}
            onChange={handleChange}
          />

          <FormLabel>Description</FormLabel>
          <FormInput
            placeholder="Enter description (max 1000 characters)"
            name="description"
            value={formData.description}
            onChange={handleChange}
            isTextArea
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
      </Modal.Body>
      <div className="d-flex justify-content-center mb-4">
        <FormAction
          primaryLabel="Submit"
          secondaryLabel="Cancel"
          onCancel={handleClose}
          onSubmit={onSubmit}
          isPrimaryDisabled={!!error}
        />
      </div>
    </Modal>
  );
};

export default ApplicationModal;
