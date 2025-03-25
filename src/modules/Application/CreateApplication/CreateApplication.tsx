import { FormLabel } from "@atoms/FormLabel/FormLabel";
import { FormActionButtons } from "@molecules/FormActionButtons";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import {
  ApplicationFormData,
  ICreateApplication,
} from "./CreateApplication.types";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(255, "Name must not exceed 255 characters"),
  path: Yup.string()
    .required("Path is required")
    .matches(
      /^\/[a-zA-Z0-9-/]*$/,
      "Path must start with '/' and contain valid characters"
    )
    .max(50, "Path must not exceed 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must not exceed 1000 characters"),
});

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "path") {
      setFormData({
        ...formData,
        [name]: value.startsWith("/") ? value : `/${value}`,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (validationErrors) {
      const errorMessages: { [key: string]: string } = {};
      (validationErrors as Yup.ValidationError).inner.forEach((error) => {
        if (error.path) errorMessages[error.path] = error.message;
      });
      setErrors(errorMessages);
      return false;
    }
  };
  const onSubmit = async () => {
    setSubmitError(null);
    const isValid = await validateForm();
    if (isValid) {
      try {
        handleSubmit(formData); // Ensure this is awaited if it's async
        setErrors({});
      } catch (error) {
        console.error("Submission failed:", error);
      }
    }
  };

  const handlePrimaryBtnDisabled = () => {
    return (
      !formData.name.trim() ||
      !formData.path.trim() ||
      !formData.description.trim() ||
      !formData.path.startsWith("/") ||
      formData.path.length > 50 ||
      formData.description.length < 20 ||
      formData.description.length > 1000 ||
      formData.name.length > 255
    );
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Application</Modal.Title>
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
              isInvalid={!!errors.name}
              maxLength={255}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </div>

          <div className="mb-3">
            <FormLabel className="mb-1">
              Path (e.g., /user-management)
            </FormLabel>
            <Form.Control
              placeholder="e.g., /user-management"
              name="path"
              value={formData.path}
              onChange={handleChange}
              isInvalid={!!errors.path}
              maxLength={50}
            />
            <Form.Control.Feedback type="invalid">
              {errors.path}
            </Form.Control.Feedback>
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
              isInvalid={!!errors.description}
              maxLength={1000}
              minLength={20}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </div>
        </div>
      </Modal.Body>

      <div className="d-flex justify-content-center mb-4">
        <FormActionButtons
          primaryLabel="Submit"
          secondaryLabel="Cancel"
          onCancel={handleClose}
          onSubmit={onSubmit}
          isPrimaryDisabled={handlePrimaryBtnDisabled()}
        />
      </div>
    </Modal>
  );
};
