import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { ModelData } from './ModelForm.types';
import axios from "axios";

const ModelForm: React.FC = () => {
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm<ModelData>({
    defaultValues: {
      modelName: "",
      variables: [
        { name: "", type: "String", isNullable: false, defaultValue: "", sampleText: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variables",
  });

  const onSubmit = async (data: ModelData) => {
    const jsonData = {
      modelName: data.modelName,
      variables: data.variables,
    };

    try {
      const response = await axios.post("http://localhost:8080/add", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Model data submitted successfully!");
        reset(); 
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit model data. Please check the server.");
    }
  };

  const handleCancel = () => {
    reset({
      modelName: "",
      variables: [
        { name: "", type: "string", isNullable: false, defaultValue: "", sampleText: "" },
      ],
    });
    toast.info("Form reset");
  };

  return (
    <Container>
      <ToastContainer position="top-center" />
      <h1 className="my-4 text-center">CREATE API MODELS</h1>
      <div className="model-container border p-4 rounded bg-light">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="align-items-center mb-4">
            <Col sm={12} lg={2} className="text-lg-end">
              <Form.Label>Model Name</Form.Label>
            </Col>
            <Col sm={10} lg={4}>
              <Form.Control
                {...register("modelName", { required: "Please enter model name" })}
                type="text"
                placeholder="Enter model name"
                className="model-name-input"
              />
              {errors?.modelName && <p className="text-danger small">{errors.modelName.message}</p>}
            </Col>
          </Row>

          <hr />

          <Row className="font-weight-bold text-center border-bottom pb-2 mb-3 ms-4">
            <Col>Name</Col>
            <Col>Type</Col>
            <Col>Nullable</Col>
            <Col>Default Value</Col>
            <Col>Sample Text</Col>
            <Col>Actions</Col>
          </Row>



          {fields.map((item, index) => (
            <Row key={item.id} className="align-items-center justify-content-start ms-3 mb-2">


              <Col>
                <Form.Control
                  {...register(`variables.${index}.name` as const, { required: "please enter variable name" })}
                  type="text"
                  placeholder="Enter variable name"
                />
                {errors?.variables?.[index]?.name && (
                  <p className="text-danger small">
                    {errors?.variables?.[index]?.name?.message}
                  </p>
                )}
              </Col>

              <Col>
                <Form.Select {...register(`variables.${index}.type` as const)} defaultValue="string">
                  <option value="string">String</option>
                  <option value="int">Int</option>
                  <option value="long">Long</option>
                  <option value="boolean">Boolean</option>
                </Form.Select>
              </Col>

              <Col className="ms-4 text-center">
                <Form.Check {...register(`variables.${index}.isNullable` as const)} type="checkbox" />
              </Col>

              <Col className="ms-3 text-center">
                <Form.Control
                  {...register(`variables.${index}.defaultValue` as const)}
                  type="text"
                  placeholder="Default value"
                />
              </Col>

              <Col className="ms-3 text-center">
                <Form.Control
                  {...register(`variables.${index}.sampleText` as const)}
                  type="text"
                  placeholder="Sample text"
                />
              </Col>

              <Col className="text-center pb-1 ">
                <Button variant="danger" onClick={() => remove(index)} className="btn-sm fs-7 py-1 px-2">
                  <FaTrash className="fs-7 mb-1" />
                </Button>
              </Col>
            </Row>
          ))}
          <div className="d-flex justify-content-start mb-3 ms-4 mt-3 px-2">
            <Button
              variant="outline-primary"
              onClick={() =>
                append({
                  name: "",
                  type: "string",
                  isNullable: false,
                  defaultValue: "",
                  sampleText: "",
                })
              }
              className="d-flex align-items-center pt-1 ps-1 pe-2 pb-1   "
            >
              <CiCirclePlus size={20} className="me-2 " />
              Add Variable
            </Button>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Button type="submit" variant="success" className="mx-2">
              Submit
            </Button>
            <Button variant="secondary" className="mx-2" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default ModelForm;
