import { useGetModels } from "@entities/Model";
import { ReactComponent as IconTrash } from "@icons/icon-trash.svg";
import { useEffect } from "react";
import { Button, Card, Col, Form, FormLabel, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import {
  IResponsesForStatusCodes,
  IResponseStatusesProps,
} from "./CreateCustomAPIForm.types";
import { dropdownData } from "./dropdownData";

export const ResponseStatuses = ({
  responses,
  setResponses,
  errors,
  trigger,
}: IResponseStatusesProps) => {
  const { data: models } = useGetModels();
 

  const emptyResponse: IResponsesForStatusCodes = {
    id: uuidv4(),
    name: "viji",
    description: "abcd",
    statusCode: "200",
    responseBodyType: "number",
    listCount: 0,
    responseBody: "",
    primitiveResponse: "2",
    isPrimitiveResponseStatic: true,
    
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

  console.log(errors.responseStatusCodes);
 

  useEffect(() => {
    setResponses("responseStatusCodes", [emptyResponse]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <FormLabel>Response Statuses</FormLabel>
        <Button
          variant="outline-primary"
          className="mb-3"
          size="sm"
          onClick={handleAddResponse}
        >
          + Add Status
        </Button>
      </div>
      {responses?.map((response: IResponsesForStatusCodes, index: number) => (
        <Card className="mb-3" key={response.id}>
          <Card.Body>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <FormLabel>Name</FormLabel>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    isInvalid={!!errors.responseStatusCodes?.[index]?.name}
                    value={response.name}
                    
                    onChange={(e) => {
                      handleFieldChange(response.id, "name", e.target.value);
                      trigger("responseStatusCodes");
                    }}
                  />
                  {errors.responseStatusCodes?.[index]?.name && (
                    <Form.Text className="text-danger">
                      {errors.responseStatusCodes?.[index]?.name?.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col>
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
                    <Form.Text className="text-danger">
                      {errors.responseStatusCodes?.[index]?.statusCode?.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
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
                    <Form.Text className="text-danger">
                      {
                        errors.responseStatusCodes?.[index]?.description
                          ?.message
                      }
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={6} className="mb-3">
                <Form.Group>
                  <FormLabel>Response Type</FormLabel>
                  <Form.Select
                    value={response.responseBodyType}
                    isInvalid={
                      !!errors.responseStatusCodes?.[index]?.responseBodyType
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
                    <option value="">Select Response Type</option>
                    {dropdownData.contentTypes.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.responseStatusCodes?.[index]?.responseBodyType && (
                    <Form.Text className="text-danger">
                      {
                        errors.responseStatusCodes?.[index]?.responseBodyType
                          ?.message
                      }
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              {["list", "object"].includes(response.responseBodyType) && (
                <>
                  <Col sm={12} md={6} className="mb-3">
                    <Form.Group>
                      <FormLabel>Response Body</FormLabel>
                      <Form.Select
                        value={response.responseBody}
                        isInvalid={
                          !!errors.responseStatusCodes?.[index]?.responseBody
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
                        <option value="">Select Response Body</option>
                        {models?.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.responseStatusCodes?.[index]?.responseBody && (
                        <Form.Text className="text-danger">
                          {
                            errors.responseStatusCodes?.[index]?.responseBody
                              ?.message
                          }
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>

                  {response.responseBodyType === "list" && (
                    <Col sm={12} md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>List Count</Form.Label>
                        <div className="d-flex">
                          <Button
                            variant="outline-secondary"
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
                            className="mx-2"
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
                          <Form.Text className="text-danger">
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
                <>
                  <Col sm={12} md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Response</Form.Label>
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
                        <Form.Text className="text-danger">
                          {
                            errors.responseStatusCodes?.[index]
                              ?.primitiveResponse?.message
                          }
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>

                  <Col sm={12} md={6} className="mb-3">
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        label="Is Response constant?"
                        checked={response.isPrimitiveResponseStatic}
                        onChange={(e) => {
                          handleFieldChange(
                            response.id,
                            "isPrimitiveResponseStatic",
                            e.target.checked
                          );
                          trigger("responseStatusCodes");
                        }}
                      />
                    </Form.Group>
                  </Col>
                </>
              )}
              {responses.length > 1 && (
                <Col className="d-flex justify-content-end align-items-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemoveResponse(response.id)}
                  >
                    <IconTrash />
                  </Button>
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
