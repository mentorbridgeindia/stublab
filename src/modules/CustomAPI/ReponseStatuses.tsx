import { useGetModels } from "@/entities/Model";
import {
  ICreateCustomAPIForm,
  IResponsesForStatusCodes,
} from "@/modules/CustomAPI/CreateCustomAPIForm.types";
import { FormLabel } from "@atoms/FormLabel";
import { ReactComponent as IconPlus } from "@icons/icon-plus.svg";
import { ReactComponent as IconTrash } from "@icons/icon-trash.svg";
import { useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { UseFormSetValue } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { dropdownData } from "./dropdownData";
import "./ResponseStatuses.scss";

interface IResponseStatusesProps {
  responses: IResponsesForStatusCodes[];
  setResponses: UseFormSetValue<ICreateCustomAPIForm>;
  errors: any;
  trigger: (field: keyof ICreateCustomAPIForm) => void;
}

export const ResponseStatuses = ({
  responses,
  setResponses,
  errors,
  trigger,
}: IResponseStatusesProps) => {
  const { data: models } = useGetModels();

  const emptyResponse: IResponsesForStatusCodes = {
    id: uuidv4(),
    name: "",
    description: "",
    statusCode: "",
    responseBodyType: "",
    listCount: 0,
    responseBody: "",
    primitiveResponse: "",
  };

  const handleAddResponse = () => {
    setResponses("responseStatusCodes", [
      ...responses,
      { ...emptyResponse, id: uuidv4() },
    ]);
  };

  const handleRemoveResponse = (id: string) => {
    if (responses.length === 1) {
      return;
    }
    const newResponses = responses.filter((response) => response.id !== id);
    setResponses("responseStatusCodes", newResponses);
  };

  const handleFieldChange = (
    id: string,
    field: keyof IResponsesForStatusCodes,
    value: string | number | boolean
  ) => {
    const newResponses: IResponsesForStatusCodes[] = [...responses];
    const updatedResponses = newResponses.map((response) =>
      response.id === id ? { ...response, [field]: value } : response
    );
    setResponses("responseStatusCodes", updatedResponses);
  };

  useEffect(() => {
    setResponses("responseStatusCodes", responses ?? [emptyResponse]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="response-statuses">
      <div className="form-section">
        <div className="form-header d-flex justify-content-between">
          <h3 className="section-title">Response Status Codes</h3>
          <Button
            variant="outline-primary"
            className="add-button"
            onClick={handleAddResponse}
          >
            <IconPlus className="me-1" />
            Add Status
          </Button>
        </div>
        <div className="px-3">
          {responses?.map(
            (response: IResponsesForStatusCodes, index: number) => (
              <Card className="response-card" key={response.id}>
                <div className="card-header">
                  <h4 className="card-title">Response #{index + 1}</h4>
                  {responses.length > 1 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="remove-button"
                      onClick={() => handleRemoveResponse(response.id)}
                    >
                      <IconTrash />
                    </Button>
                  )}
                </div>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <FormLabel>Name</FormLabel>
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        isInvalid={!!errors.responseStatusCodes?.[index]?.name}
                        value={response.name}
                        onChange={(e) => {
                          handleFieldChange(
                            response.id,
                            "name",
                            e.target.value
                          );
                          trigger("responseStatusCodes");
                        }}
                      />
                      {errors.responseStatusCodes?.[index]?.name && (
                        <Form.Text className="error-message">
                          {errors.responseStatusCodes?.[index]?.name?.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <FormLabel>Status Code</FormLabel>
                      <Form.Select
                        value={response.statusCode}
                        isInvalid={
                          !!errors.responseStatusCodes?.[index]?.statusCode
                        }
                        onChange={(e) => {
                          handleFieldChange(
                            response.id,
                            "statusCode",
                            e.target.value
                          );
                          trigger("responseStatusCodes");
                        }}
                      >
                        <option value="">Select Status Code</option>
                        {dropdownData.statusCodes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.responseStatusCodes?.[index]?.statusCode && (
                        <Form.Text className="error-message">
                          {
                            errors.responseStatusCodes?.[index]?.statusCode
                              ?.message
                          }
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <FormLabel>Description</FormLabel>
                  <Form.Control
                    type="text"
                    value={response.description}
                    isInvalid={
                      !!errors.responseStatusCodes?.[index]?.description
                    }
                    placeholder="Enter Description"
                    onChange={(e) => {
                      handleFieldChange(
                        response.id,
                        "description",
                        e.target.value
                      );
                      trigger("responseStatusCodes");
                    }}
                  />
                  {errors.responseStatusCodes?.[index]?.description && (
                    <Form.Text className="error-message">
                      {
                        errors.responseStatusCodes?.[index]?.description
                          ?.message
                      }
                    </Form.Text>
                  )}
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <FormLabel>Response Type</FormLabel>
                      <Form.Select
                        value={response.responseBodyType}
                        isInvalid={
                          !!errors.responseStatusCodes?.[index]
                            ?.responseBodyType
                        }
                        onChange={(e) => {
                          handleFieldChange(
                            response.id,
                            "responseBodyType",
                            e.target.value
                          );
                          trigger("responseStatusCodes");
                        }}
                      >
                        <option value="">Select Type</option>
                        {dropdownData.contentTypes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.responseStatusCodes?.[index]
                        ?.responseBodyType && (
                        <Form.Text className="error-message">
                          {
                            errors.responseStatusCodes?.[index]
                              ?.responseBodyType?.message
                          }
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>

                  {["list", "object"].includes(response.responseBodyType) && (
                    <>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <FormLabel>Response Body</FormLabel>
                          <Form.Select
                            value={response.responseBody}
                            isInvalid={
                              !!errors.responseStatusCodes?.[index]
                                ?.responseBody
                            }
                            onChange={(e) => {
                              handleFieldChange(
                                response.id,
                                "responseBody",
                                e.target.value
                              );
                              trigger("responseStatusCodes");
                            }}
                          >
                            <option value="">Select Response</option>
                            {models?.map((model) => (
                              <option key={model.id} value={model.id}>
                                {model.modelName}
                              </option>
                            ))}
                          </Form.Select>
                          {errors.responseStatusCodes?.[index]
                            ?.responseBody && (
                            <Form.Text className="error-message">
                              {
                                errors.responseStatusCodes?.[index]
                                  ?.responseBody?.message
                              }
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>

                      {response.responseBodyType === "list" && (
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <FormLabel>List Count</FormLabel>
                            <div className="list-count-controls">
                              <Button
                                variant="outline-secondary"
                                className="count-button"
                                disabled={(response.listCount ?? 0) <= 1}
                                onClick={() => {
                                  handleFieldChange(
                                    response.id,
                                    "listCount",
                                    (response.listCount ?? 0) - 1
                                  );
                                  trigger("responseStatusCodes");
                                }}
                              >
                                -
                              </Button>
                              <Form.Control
                                type="number"
                                value={response.listCount}
                                className="count-input"
                                onChange={(e) =>
                                  handleFieldChange(
                                    response.id,
                                    "listCount",
                                    Number(e.target.value)
                                  )
                                }
                              />
                              <Button
                                variant="outline-secondary"
                                className="count-button"
                                onClick={() => {
                                  handleFieldChange(
                                    response.id,
                                    "listCount",
                                    (response.listCount ?? 0) + 1
                                  );
                                  trigger("responseStatusCodes");
                                }}
                              >
                                +
                              </Button>
                            </div>
                            {errors.responseStatusCodes?.[index]?.listCount && (
                              <Form.Text className="error-message">
                                {
                                  errors.responseStatusCodes?.[index]?.listCount
                                    ?.message
                                }
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                      )}
                    </>
                  )}

                  {["string", "boolean", "number"].includes(
                    response.responseBodyType
                  ) && (
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <FormLabel>Response</FormLabel>
                        <Form.Control
                          type="text"
                          placeholder="Sample response"
                          value={response.primitiveResponse}
                          isInvalid={
                            !!errors.responseStatusCodes?.[index]
                              ?.primitiveResponse
                          }
                          onChange={(e) => {
                            handleFieldChange(
                              response.id,
                              "primitiveResponse",
                              e.target.value
                            );
                            trigger("responseStatusCodes");
                          }}
                        />
                        {errors.responseStatusCodes?.[index]
                          ?.primitiveResponse && (
                          <Form.Text className="error-message">
                            {
                              errors.responseStatusCodes?.[index]
                                ?.primitiveResponse?.message
                            }
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  )}
                </Row>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};
