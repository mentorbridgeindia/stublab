import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import FormField from '../FormField/FormField'; // Correct path for FormField
import ModalFooter from '../ModalFooter/ModalFooter'; // Correct path for ModalFooter

interface ApplicationModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (formData: { name: string; path: string; description: string }) => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ show, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
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
        <FormField
          label="Name"
          placeholder="Enter API name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormField
          label="Path"
          placeholder="Enter API path"
          name="path"
          value={formData.path}
          onChange={handleChange}
        />
        <FormField
          label="Description"
          placeholder="Enter description (max 1000 characters)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          isTextArea
          error={error}
        />
      </Modal.Body>
      <div className="d-flex justify-content-center mb-4">
        <ModalFooter
          onCancel={handleClose}
          onOkay={onSubmit}
          isOkayDisabled={!!error}
        />
      </div>
    </Modal>
  );
};

export default ApplicationModal;
