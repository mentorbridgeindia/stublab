import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ModelForm.css"; 
import { FaTrash } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { ModelData } from './ModelForm.types';



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
    toast.info("Form reset");
  };

  return (
    <Container>
      <ToastContainer position="top-center" />
      <h1 className="my-4 text-center">CREATE API MODELS</h1>
      <div className="model-container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Model Name Input */}
          <Row className="model-name-row">
            <Col sm={12} lg={2} className="model-name-label">
              <label>Model Name</label>
            </Col>
            <Col sm={10} lg={4}>
              <Form.Control
                {...register("modelName", { required: "Please enter model name" })}
                type="text"
                placeholder="Enter model name"
                className="model-name-input"
              />
              {errors?.modelName && <p className="error-message">{errors.modelName.message}</p>}
            </Col>
          </Row>
          <hr></hr>

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
              <div className="plus-icon">
                {index === fields.length - 1 && (
                  <CiCirclePlus
                    onClick={() =>
                      append({
                        name: "",
                        type: "string",
                        isNullable: false,
                        defaultValue: "",
                        sampleText: "",
                      })
                    }
                    className="icon"
                    size={30}
                    color="blue"
                  />
                )}
              </div>
              <div>
                <Form.Control
                  {...register(`variables.${index}.name` as const, { required: "please enter variable name" })}
                  type="text"
                  placeholder="Enter variable name"
                  className="input-field"
                />
                {errors?.variables?.[index]?.name && (
                  <p className="error-message">
                    {errors?.variables?.[index]?.name?.message}
                  </p>
                )}
              </div>

              <Form.Select {...register(`variables.${index}.type` as const, { required: "please select type" })} defaultValue="string">
                <option value="string">String</option>
                <option value="int">Int</option>
                <option value="long">Long</option>
                <option value="float">Boolean</option>
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
              <Button variant="Secondary" onClick={() => remove(index)} >
                <FaTrash className="icon-trash"
                  size={15}
                  color="white"
                />
              </Button>
              
            </div>

          ))}


          {/* Add More Fields */}
          <div className="d-flex " >

            <div className="submit-cancel">
              <Button type="submit" variant="success" className="submit-cancel-buttons" >
                Submit
              </Button>
              <Button variant="secondary-outline" className="submit-cancel-buttons" onClick={handleCancel}>
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
