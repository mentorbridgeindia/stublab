import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./modelform.css"; // Import the CSS

type Model = {
  name: string;
  type: string;
  isNullable: boolean;
  defaultValue?: string;
  sampleText?: string;
};

const ModelForm: React.FC = () => {
  const { control, handleSubmit, register, reset } = useForm<{ models: Model[] }>({
    defaultValues: {
      models: [
        { name: "", type: "string", isNullable: false, defaultValue: "", sampleText: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "models",
  });

  const onSubmit = (data: { models: Model[] }) => {
    fetch("http://localhost:8080/api/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.models),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create API");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Success:", result);
        toast.success("API created successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while creating the API.");
      });
  };

  const handleCancel = () => {
    reset({
      models: [
        { name: "", type: "string", isNullable: false, defaultValue: "", sampleText: "" },
      ],
    });
    toast.info("Form reset.");
  };

  return (
    <Container>
      <ToastContainer position="top-center" />
      <h1 className="my-4 text-center">Create API Models</h1>
      <div className="model-container">
        <div className="label-row">
          <label>Model Name</label>
          <label>Type</label>
          <label className="Null">Nullable</label>
          <label>Default Value</label>
          <label>Sample Text</label>
          <label>Actions</label>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => (
            <div key={item.id} className="input-row">
              <Form.Control
                {...register(`models.${index}.name` as const)}
                type="text"
                placeholder="Enter model name"
                required
              />
              <Form.Select {...register(`models.${index}.type` as const)} defaultValue="string">
                <option value="string">String</option>
                <option value="int">Int</option>
                <option value="long">Long</option>
              </Form.Select>
              <div className="checkbox-container">
                <Form.Check
                  {...register(`models.${index}.isNullable` as const)}
                  type="checkbox"
                />
              </div>
              <Form.Control
                {...register(`models.${index}.defaultValue` as const)}
                type="text"
                placeholder="Default value"
              />
              <Form.Control
                {...register(`models.${index}.sampleText` as const)}
                type="text"
                placeholder="Sample text"
              />
              <Button variant="danger" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
          <div className="d-flex">
            <Button
              variant="primary"
              onClick={() =>
                append({
                  name: "",
                  type: "string",
                  isNullable: false,
                  defaultValue: "",
                  sampleText: "",
                })
              }
            >
              Add Model
            </Button>
            <div>
              <Button type="submit" variant="success" className="me-2">
                Submit
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default ModelForm;
