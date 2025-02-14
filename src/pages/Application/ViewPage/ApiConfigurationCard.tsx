import { ICustomAPIEntity } from "@/entities/CustomAPI";
import { ReactComponent as IconSave } from "@icons/icon-save.svg";
import React, { useState } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

interface ApiConfigurationCardProps {
  api: ICustomAPIEntity;
}

const ApiConfigurationCard: React.FC<ApiConfigurationCardProps> = ({ api }) => {
  const { method, url, defaultStatusCode, id } = api;

  const [statusCode, setStatusCode] = useState<number>(
    defaultStatusCode ?? 200
  );

  const variant = (() => {
    const methodVariants: Record<string, string> = {
      POST: "info",
      GET: "success",
      PUT: "warning",
    };
    return methodVariants[method] || "danger";
  })();

  const handleSave = (): void => {
    if (statusCode) {
      toast.success(
        `${id.toUpperCase()} status code ${statusCode} saved successfully!`
      );
    } else {
      toast.error(`Please select a status code for ${id.toUpperCase()}`);
    }
  };

  const handleStatusCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setStatusCode(Number(event.target.value));
  };

  const handleEdit = (): void => {
    console.log(`${id.toUpperCase()} Edit Clicked`);
  };

  const handleDelete = (id: string): void => {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete API configuration for ${id.toUpperCase()}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log(`${id.toUpperCase()} Deleted Successfully`);
            toast.success(`${id.toUpperCase()} deleted successfully!`);
          },
        },
        {
          label: "No",
          onClick: () => {
            console.log(`${id.toUpperCase()} Deletion Canceled`);
            toast.info(`${id.toUpperCase()} deletion canceled.`);
          },
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      overlayClassName: "overlay-custom-class-name",
    });
  };

  return (
    <div className="mt-4 api-card-accordion">
      <Accordion defaultActiveKey="1">
        <Accordion.Item
          eventKey="0"
          className={`border-${variant}`}
          style={{
            borderWidth: "1px",
            borderRadius: "5px",
            backgroundColor: `rgba(var(--bs-${variant}-rgb), 0.1)`,
          }}
        >
          <Accordion.Header className={`accordion-header ${variant}`}>
            <Row
              className="w-100 align-items-sm-start py-2 px-lg-3"
              style={{
                borderRadius: "5px",
              }}
            >
              <Col lg={2} md={4} sm={4} xs={4} className="text-center mb-3">
                <Button
                  variant={variant}
                  className="text-white fw-bold"
                  size="sm"
                >
                  {method}
                </Button>
              </Col>

              <Col
                lg={4}
                md={8}
                xs={8}
                sm={8}
                className="text-sm-center text-truncate"
              >
                <p className="mb-0 fw-bold">{url}</p>
              </Col>

              <Col lg={2} md={6} xs={6} sm={6} className="text-center">
                <Form.Select
                  aria-label="Select Status Code"
                  value={statusCode}
                  onChange={handleStatusCodeChange}
                  size="sm"
                >
                  <option value="">Select Status Code</option>
                  {api.responseStatusCodes?.map((statusCode) => (
                    <option
                      key={statusCode.statusCode}
                      value={statusCode.statusCode}
                    >
                      {statusCode.statusCode} - {statusCode.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col lg={2} md={2} xs={2} sm={2} className="text-center">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSave}
                  style={{
                    visibility:
                      statusCode !== defaultStatusCode ? "visible" : "hidden",
                  }}
                  className="w-sm-50"
                >
                  <IconSave />
                  <span className="d-none d-md-block d-lg-block">Save</span>
                </Button>
              </Col>

              <Col lg={2} md={4} xs={4} sm={4} className="text-center">
                <div className="d-flex justify-content-center  gap-3">
                  <Button
                    variant="outline-secondary"
                    className="rounded-circle d-flex justify-content-center align-items-center p-2"
                    title="Edit"
                    onClick={handleEdit}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="rounded-circle d-flex justify-content-center align-items-center p-2"
                    title="Delete"
                    onClick={() => handleDelete(id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </Col>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ApiConfigurationCard;
