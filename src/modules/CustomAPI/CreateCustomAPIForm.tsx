import { MethodTypes } from "@/types";
import { FormLabel } from "@atoms/FormLabel";
import { useGetModels } from "@entities/Model";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormActionButtons } from "@molecules/FormActionButtons";
import { Drawer } from "@organisms/Drawer";
import { Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ICreateCustomAPIForm } from "./CreateCustomAPIForm.types";
import { dropdownData } from "./dropdownData";
import { ResponseStatuses } from "./ReponseStatuses";
import { schema } from "./schema";

export const CreateCustomAPIForm = ({ onSubmit, onCancel }: any) => {
  const { data: models } = useGetModels();
  const {
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitted, isValid },
  } = useForm<ICreateCustomAPIForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      url: 'http://try',
      method: "POST",
      requestBodyType:"string",
     
      
      
    }
  });

  const values = watch();

  const renderVariant = () => {
    return dropdownData.methods.find((item) => item.value === values.method)
      ?.color;
  };

  const triggerValidation = (field: keyof ICreateCustomAPIForm) => {
    isSubmitted && trigger(field);
  };

  console.log(values);

  const triggerSubmit = () => {
    if(!!errors){
      onSubmit(values);
    }
  }

  return (
    <Drawer show={true} onHide={onCancel} title={"Create Custom API"}>
      <Form>
        <Row className="mb-3">
          <Col sm={12} md={4} lg={2}>
            <DropdownButton
              size="sm"
              title={values.method ?? "Method"}
              variant={renderVariant()}
              id="method-dropdown"
              className="fw-bold"
              onSelect={(selectedValue) =>
                setValue("method", (selectedValue as MethodTypes) ?? "GET")
              }
            >
              {dropdownData.methods.map((item) => (
                <Dropdown.Item key={item.value} eventKey={item.value}>
                  <span className={`text-${item.color}`}>{item.label}</span>
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col sm={12} md={8} lg={10}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter URL"
                className="form-control-l"
                value={values.url}
                isInvalid={!!errors.url}
                onChange={(e) => {
                  setValue("url", e.target.value);
                  triggerValidation("url");
                }}
              />
              {errors.url && typeof errors.url.message === "string" && (
                <small className="text-danger">{errors.url.message}</small>
              )}
            </Form.Group>
          </Col>
        </Row>
        {["POST", "PUT"].includes(values.method) && (
          <Row className="mb-3">
            <Col sm={12} md={6} lg={6}>
              <Form.Group className="mb-3">
                <FormLabel>Request Body Type</FormLabel>
                <Form.Select
                  value={values.requestBodyType}
                  isInvalid={!!errors.requestBodyType}
                  onChange={(e) => {
                    setValue("requestBodyType", e.target.value);
                    triggerValidation("requestBodyType");
                  }}
                >
                  <option value="">Please Select</option>
                  {dropdownData.contentTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
                {errors.requestBodyType?.message && (
                  <small className="text-danger">
                      value={values.requestBodyType}
                    {String(errors.requestBodyType.message)}
                  </small>
                )}
              </Form.Group>
            </Col>
            {["object", "list"].includes(values.requestBodyType) && (
              <Col sm={12} md={6} lg={6}>
                <Form.Group>
                  <FormLabel>Request Body</FormLabel>
                  <Form.Select
                    value={values.requestBody}
                    
                    isInvalid={!!errors.requestBody}
                    onChange={(e) => {
                      setValue("requestBody", e.target.value);
                      triggerValidation("requestBody");
                    }}
                  >
                    {models?.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.requestBody?.message && (
                    <small className="text-danger">
                      {String(errors.requestBody.message)}
                    </small>
                  )}
                </Form.Group>
              </Col>
            )}
          </Row>
        )}
        <ResponseStatuses
          responses={values.responseStatusCodes}
          setResponses={setValue}
          errors={errors}
          trigger={triggerValidation}
        />
      </Form>
      <FormActionButtons
          primaryLabel="Submit"
          secondaryLabel="Cancel"
          onCancel={onCancel}
          onSubmit={triggerSubmit}
        />
    </Drawer>
  );
};
