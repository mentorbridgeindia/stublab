import React, { useState } from "react";
import { Form, Row, Col, Button, Dropdown, DropdownButton, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormActionButtons } from "@/ui/molecules/FormActionButtons/FormActionButtons";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
const schema = yup.object().shape({
  url: yup.string().url('Please enter a valid URL').required('URL is required'),
  method: yup.string().oneOf(['POST', 'GET', 'PUT', 'DELETE'], 'Invalid HTTP Method').required('Method is required'),
  responseBody: yup.string().required('Response Body is required'),

});
const ResponseForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
const [method, setMethod] = useState<string>("METHODS");
const [fields, setFields] = useState<any[]>([]);
const handleMethodChange = (selectedMethod: string) => {
    setMethod(selectedMethod);
  };
const handleAddStatus = () => {
    setFields([
      ...fields,
      {
        name: "",
        statusCode: "",
        responseType: "",
        listCount: 10,
        responseBody: "User Details",
        response: "",
        isConstant: false,
      },
    ]);
  };
 const handleFieldChange = (index: number, key: string, value: any) => {
    const updatedFields = fields.map((field, idx) =>
      idx === index ? { ...field, [key]: value } : field
    );
    setFields(updatedFields);
  };
const onSubmit = (data: any) => {
    console.log(data);
   };
const handleCancel = () => {
    console.log("Cancel button clicked!");
  
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Header>
          <h5>Request Form</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3 align-items-center">
              <Col xs={2}>
                <DropdownButton
                  title={method}
                  variant="secondary"
                  id="method-dropdown"
                >
                  {["POST", "GET", "PUT", "DELETE"].map((item) => (
                    <Dropdown.Item
                      key={item}
                      onClick={() => handleMethodChange(item)}
                    >
                      {item}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
              <Col xs={7}>
                <Form.Group>
                  <Controller
                    name="url"
                    control={control}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Enter URL"
                        className="form-control-l"
                      />
                    )}
                  />
                  {errors.url && typeof errors.url.message === "string" && (
                    <small className="text-danger">{errors.url.message}</small>
                  )}
                </Form.Group>
              </Col>
            </Row><Col xs={7}>
              <Form.Group className="mb-3">
                <Form.Label>Response Body</Form.Label>
                <Controller
                  name="responseBody"
                  control={control}
                  render={({ field }) => (
                    <Form.Control as="select" {...field}>
                      <option></option>
                      <option>String</option>
                      <option>Number</option>
                      <option>Boolean</option>
                    </Form.Control>
                  )}
                />
                {errors.responseBody?.message && (
                  <p className="text-danger">{String(errors.responseBody.message)}</p>
                )}
              </Form.Group>
            </Col><Button
              variant="outline-primary"
              className="mb-3"
              onClick={handleAddStatus}
            >
              + Add Status
            </Button>{fields.map((field, index) => (
              <Card className="mb-3" key={index}>
                <Card.Body>
                
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={field.name}
                          onChange={(e) =>
                            handleFieldChange(index, "name", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Status Code</Form.Label>
                        <Form.Control
                          as="select"
                          value={field.statusCode}
                          onChange={(e) =>
                            handleFieldChange(index, "statusCode", e.target.value)
                          }
                        >
                          <option></option>
                          <option>200</option>
                          <option>201</option>
                          <option>202</option>
                          <option>203</option>
                          <option>204</option>
                          <option>400</option>
                          <option>500</option>
                              <option>501</option>
                                  <option>503</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                 
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Response Type</Form.Label>
                        <Form.Control
                          as="select"
                          value={field.responseType}
                          onChange={(e) =>
                            handleFieldChange(index, "responseType", e.target.value)
                          }
                        >
                          <option>none</option>
                          <option>List</option>
                          <option>Object</option>
                          <option>String</option>
                          <option>Number</option>
                          <option>Boolean</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                 
                  {["List", "Object"].includes(field.responseType) && (
                    <>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group>
                            <Form.Label>Response Body</Form.Label>
                            <Form.Control
                              as="select"
                              value={field.responseBody}
                              onChange={(e) =>
                                handleFieldChange(index, "responseBody", e.target.value)
                              }
                            >
                              <option>User Details</option>
                              <option>Other Model</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>

                      {field.responseType === "List" && (
                        <Row className="mb-3">
                          <Col>
                            <Form.Group>
                              <Form.Label>List Count</Form.Label>
                              <div className="d-flex">
                                <Button
                                  variant="outline-secondary"
                                  onClick={() =>
                                    handleFieldChange(index, "listCount", field.listCount - 1)
                                  }
                                  disabled={field.listCount <= 1}
                                >
                                  -
                                </Button>

                                <Form.Control
                                  type="number"
                                  value={field.listCount}
                                  onChange={(e) =>
                                    handleFieldChange(index, "listCount", Number(e.target.value))
                                  }
                                  className="mx-2"
                                />
                                <Button
                                  variant="outline-secondary"
                                  onClick={() =>
                                    handleFieldChange(index, "listCount", field.listCount + 1)
                                  }
                                >
                                  +
                                </Button>
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                      )}
                    </>
                  )}

                  {["String", "Boolean", "Number"].includes(field.responseType) && (
                    <Row className="mb-3">
                      <Col>
                        <Form.Group>
                          <Form.Label>Response</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Sample response"
                            value={field.response}
                            onChange={(e) =>
                              handleFieldChange(index, "response", e.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className="mt-4">
                          <Form.Check
                            type="checkbox"
                            label="Is Response constant?"
                            checked={field.isConstant}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                "isConstant",
                                e.target.checked
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                </Card.Body>
              </Card>
            ))}
<FormActionButtons
              isPrimaryDisabled={false}
              primaryLabel="Submit"
              secondaryLabel="Cancel"
              onCancel={handleCancel}
              onSubmit={handleSubmit(onSubmit)}
            />
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResponseForm;
