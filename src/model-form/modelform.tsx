import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./modelform.css"; // Import the CSS
import { FaPlus, FaTrash } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

type Variable = {
  name: string;
  type: string;
  isNullable: boolean;
  defaultValue?: string;
  sampleText?: string;
};

type ModelData = {
  modelName: string;
  variables: Variable[];
};

const ModelForm: React.FC = () => {
  const { control, handleSubmit, register, reset } = useForm<ModelData>({
    defaultValues: {
      modelName: "",
      variables: [
        { name: "phone", type: "int", isNullable: true, defaultValue: "100", sampleText: "7871694931" },
        { name: "email", type: "string", isNullable: false, defaultValue: "100", sampleText: "umarfarookj06@gmail.com" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variables",
  });

  const onSubmit = (data: ModelData) => {
    // Log the resulting JSON to check
    const jsonData = {
      modelName: data.modelName,
      variables: data.variables,
    };

    console.log("Generated JSON:", jsonData);

    // For now, simulate the API submission (your teammate will write the Spring Boot API)
    toast.success("Model data is ready for submission!");
  };

  const handleCancel = () => {
    reset({
      modelName: "",
      variables: [
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Model Name Input */}
          <div className="input-row">
            <label>Model Name</label>
            <Form.Control
              {...register("modelName")}
              type="text"
              placeholder="Enter model name"
              className="model-name-input"
              required
            />
          </div>
          <br></br>

          {/* Variables Section */}
          <div className="label-row">
            <label>Name</label>
            <label>Type</label>
            <label className="Null">Nullable</label>
            <label>Default Value</label>
            <label>Sample Text</label>
            <label>Actions</label>
          </div>

          {fields.map((item, index) => (
            <div key={item.id} className="input-row">
              <Form.Control
                {...register(`variables.${index}.name` as const)}
                type="text"
                placeholder="Enter variable name"
                required
              />
              <Form.Select {...register(`variables.${index}.type` as const)} defaultValue="string">
                <option value="string">String</option>
                <option value="int">Int</option>
                <option value="long">Long</option>
              </Form.Select>
              <div className="checkbox-container">
                <Form.Check
                  {...register(`variables.${index}.isNullable` as const)}
                  type="checkbox"
                />
              </div>
              <Form.Control
                {...register(`variables.${index}.defaultValue` as const)}
                type="text"
                placeholder="Default value"
              />
              <Form.Control
                {...register(`variables.${index}.sampleText` as const)}
                type="text"
                placeholder="Sample text"
              />
              <Button variant="Secondary" onClick={() => remove(index)}>
                <FaTrash style={{ cursor: "pointer", paddingBottom: "1px"}} size={15} color="white" />
              </Button>
            </div>
          ))}

          {/* Add More Fields */}
          <div className="d-flex" >
            <CiCirclePlus onClick={() =>
              append({
                name: "",
                type: "string",
                isNullable: false,
                defaultValue: "",
                sampleText: "",
              })} style={{ cursor: "pointer", marginLeft: "6px" }} size={30} color="blue" />
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "40px", 
              width: "100%",
              gap: "20px"
            }}>
              <Button type="submit" variant="success" className="submit-cancel-buttons" >
                Submit
              </Button>
              <Button variant="secondary-outline" className="submit-cancel-buttons"onClick={handleCancel}>
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
