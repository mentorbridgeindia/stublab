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
import { useGetCustomAPIById } from "@/entities/CustomAPI";
import { useCreateCustomAPI } from "@/entities/CustomAPI/useCreateCustomAPI";

export const CreateCustomAPIForm = ({ onSubmit, onCancel, editingApi }: any) => {
  const {
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<ICreateCustomAPIForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    // defaultValues: data,
  });

  console.log(editingApi)

  const { data } = useGetCustomAPIById(editingApi, {
    queryConfig: {
      enabled: !!editingApi
    }
  });
  console.log(data);


  const values = watch();

  const renderVariant = () => {
    return dropdownData.methods.find((item) => item.value === values.method)
      ?.color;
  };

  const triggerValidation = (field: keyof ICreateCustomAPIForm) => {
    isSubmitted && trigger(field);
  };

  const triggerSubmit = () => {
    if (!!errors && values.responseStatusCodes?.length > 0) {
      const status_200 = values.responseStatusCodes.find(
        (code) => code.statusCode === "200"
      );
      if (status_200) {
        values.defaultStatusCode = status_200.id
      } else {
        values.defaultStatusCode = values.responseStatusCodes[0]?.id
      }
      onSubmit(values);
    }
  };

  return (
    <Drawer show={true} onHide={onCancel} title={"Create Custom API"}>
      <Form>
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
        </div>
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
          onSubmit={triggerSubmit}
        />
      </Form>
    </Drawer>
  );
};
