import axios from "axios";
import { toast } from "react-toastify";
import { FormLabel } from "@atoms/FormLabel/FormLabel";
import { FormActionButtons } from "@molecules/FormActionButtons";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import {
  ApplicationFormData,
  ICreateApplication,
} from "./CreateApplication.types";
import { useCreateApplication } from "@/entities/Application/useCreateApplication";
import { useNavigate } from "react-router-dom";
import { json } from "stream/consumers";


const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(255, "Name must not exceed 255 characters"),
  path: Yup.string()
    .required("Path is required")
    .matches(/^\/[a-zA-Z0-9-/]*$/, "Path must start with '/' and contain valid characters"),
  description: Yup.string()
    .required("Description is required")
    .max(1000, "Description must not exceed 1000 characters"),
});

export const CreateApplication = ({ show, handleClose }: ICreateApplication) => {
  const navigate = useNavigate();
      const { mutate: createApplication } = useCreateApplication({
        onSuccess: () => {
          toast.success("Application submitted successfully!");
          setFormData({ name: "", path: "", description: "" });
          setErrors({});
          handleClose();
          navigate("/application");

        },
        onError:(error) =>{
          toast.error("Failed to submit application. Please check the server.");
        }
      });
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: "",
    path: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

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
    const isValid = await validateForm();
    if (isValid) {
      const jsonData = {
        name: formData.name,
        path: formData.path,
        description: formData.description,
      };
      createApplication(jsonData);
    }
   
  }

      // try {
      //   const response = await axios.post("http://localhost:8080/add", jsonData, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });

      //   if (response.status === 201) {
      //     toast.success("Application submitted successfully!");
      //     setFormData({ name: "", path: "", description: "" });
      //     setErrors({});
      //     handleClose();
      //   } else {
      //     toast.error("Something went wrong. Please try again.");
      //   }
      // } catch (error) {
      //   console.log();
        
      //   toast.error("Failed to submit application. Please check the server.");
      // }

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
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </div>

          <div className="mb-3">
            <FormLabel className="mb-1">Path</FormLabel>
            <Form.Control
              placeholder="e.g., /user-management"
              name="path"
              value={formData.path}
              onChange={handleChange}
              isInvalid={!!errors.path}
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
          isPrimaryDisabled={
            !formData.name.trim() || !formData.path.trim() || !formData.description.trim()
          }
        />
      </div>
    </Modal>
  );
};
