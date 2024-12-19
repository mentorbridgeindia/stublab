import { FormLabel } from "@atoms/FormLabel/FormLabel";
import { FormActionButtons } from "@molecules/FormActionButtons";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import {
  ApplicationFormData,
  ICreateApplication,
} from "./CreateApplication.types";

export const CreateApplication = ({
  show,
  handleClose,
  handleSubmit,
}: ICreateApplication) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: "",
    path: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "description" && value.length > 1000) {
      setError("Description must not exceed 1000 characters.");
    } else {
      setError("");
    }

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    if (formData.description.length > 1000) {
      setError("Description must not exceed 1000 characters.");
      return;
    }

    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Application Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="mb-3">
            <FormLabel className="mb-1">Name</FormLabel>
            <Form.Control
              placeholder="e.g., UserManagement"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <FormLabel className="mb-1">Path</FormLabel>
            <Form.Control
              placeholder="e.g., /user-management"
              name="path"
              value={formData.path}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <FormLabel className="mb-1">Description</FormLabel>
            <Form.Control
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ height: "100px" }}
              as="textarea"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </Modal.Body>
      <div className="d-flex justify-content-center mb-4">
        <FormActionButtons
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
