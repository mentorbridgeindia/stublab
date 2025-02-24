import { MethodTypes } from "@/types";
import { FormLabel } from "@atoms/FormLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormActionButtons } from "@molecules/FormActionButtons";
import { Drawer } from "@organisms/Drawer";
import { Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ICreateCustomAPIForm } from "./CreateCustomAPIForm.types";
import { dropdownData } from "./dropdownData";
import { ResponseStatuses } from "./ReponseStatuses";
import { schema } from "./schema";

export const CreateCustomAPIForm = ({ onSubmit, onCancel,initialValues }: any) => {
  const {
    register,
    setValue,
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<ICreateCustomAPIForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      method: initialValues?.method || "GET",
      ...initialValues,
    },
  });

  const values = watch();

  const renderVariant = () => {
    return dropdownData.methods.find((item) => item.value === values.method)
      ?.color;
  };

  const triggerValidation = (field: keyof ICreateCustomAPIForm) => {
    isSubmitted && trigger(field);
  };

  const triggerSubmit = async() => {
    const isValid=await trigger();
    if (!!isValid && values.responseStatusCodes?.length > 0) {
      onSubmit(values);
    }
  };

  return (
    <Drawer show={true} onHide={onCancel} title={initialValues? "Edit API": "Create Custom API"}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <FormLabel>Name</FormLabel>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            defaultValue={values.name}
            isInvalid={!!errors.name}
            onChange={(e) => {
              setValue("name", e.target.value);
              triggerValidation("name");
            }}
          />
          {errors.name && (<Form.Text className="text-danger">{errors.name.message}</Form.Text>) }
        </div>
        <Row className="mb-3">
          <Col sm={12} md={4} lg={2}>
            <DropdownButton
              size="sm"
              title={values.method || "GET"}
              variant={renderVariant()}
              id="method-dropdown"
              className="fw-bold"
              onSelect={(selectedValue) =>{
                setValue("method", (selectedValue as MethodTypes) );
                trigger("method");
              }}
            >
              {dropdownData.methods.map((item) => (
                <Dropdown.Item key={item.value} eventKey={item.value}>
                  <span className={`text-${item.color}`}>{item.label}</span>
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <input
              type="hidden"
              {...register("method", {
                required: "Method is required",
                validate: (value) =>
                  ["GET", "POST", "PUT", "DELETE"].includes(value) || "Invalid method", 
              })}
            />
            {errors.method && <small className="text-danger">{errors.method.message}</small>}
          </Col>
          <Col sm={12} md={8} lg={10}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter URL"
                className="form-control-l"
                defaultValue={values.url}
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
        <ResponseStatuses
          responses={values.responseStatusCodes}
          setResponses={setValue}
          errors={errors}
          trigger={triggerValidation}
        />
        <FormActionButtons
          primaryLabel="Submit"
          secondaryLabel="Cancel"
          onCancel={onCancel}
          onSubmit={handleSubmit(triggerSubmit)}
        />
      </Form>
    </Drawer>
  );
};
