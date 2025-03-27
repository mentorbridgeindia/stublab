import { ICustomAPIEntity, useDeleteCustomAPIById } from "@/entities/CustomAPI";
import { useUpdateStatusCode } from "@/entities/CustomAPI/useUpdateStatusCode";
import { CreateCustomAPIForm } from "@/modules/CustomAPI";
import { ReactComponent as IconSave } from "@icons/icon-save.svg";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ApiConfigurationCard.scss";

interface ApiConfigurationCardProps {
  api: ICustomAPIEntity;
  applicationId: string;
  handleSubmit: (data: any) => void;
}

const ApiConfigurationCard: React.FC<ApiConfigurationCardProps> = ({
  api,
  handleSubmit,
  applicationId,
}) => {
  const { method, url, defaultStatusCodes, id, name, responseStatusCodes } =
    api;
  const queryClient = useQueryClient();
  const [statusCode, setStatusCode] = useState<string | null>(
    defaultStatusCodes
  );
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editApiData, setEditApiData] = useState<ICustomAPIEntity | null>(null);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    console.log(data);
    handleCloseEditForm();
    handleSubmit(data);
  };

  const { data: isDeleted, isLoading } = useDeleteCustomAPIById(
    idToDelete ?? "",
    {
      enabled: !!idToDelete,
    }
  );

  useEffect(() => {
    if (isDeleted && !isLoading && idToDelete) {
      setIdToDelete(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const variant = (() => {
    const methodVariants: Record<string, string> = {
      POST: "info",
      GET: "success",
      PUT: "warning",
      DELETE: "danger",
    };
    return methodVariants[method] || "secondary";
  })();

  const { mutate: updateStatusCode, isPending: isUpdating } =
    useUpdateStatusCode({
      onSuccess: () => {
        toast.success(`${name} status code updated successfully!`);
        queryClient.invalidateQueries({
          queryKey: ["application", applicationId],
        });
      },
      onError: (error) => {
        toast.error(`Failed to update status code: ${error.message}`);
      },
    });

  const handleSave = (): void => {
    if (statusCode) {
      updateStatusCode({ id, defaultStatusCode: statusCode });
    } else {
      toast.error(`Please select a status code for ${name}`);
    }
  };

  const handleStatusCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setStatusCode(event.target.value);
  };

  const handleEdit = (): void => {
    setEditApiData(api);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleDelete = (id: string): void => {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete API configuration for ${name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setIdToDelete(id);
            setTimeout(() => {
              queryClient.invalidateQueries({
                queryKey: ["application", applicationId],
              });
            }, 2000);
            toast.success(`API deleted successfully!`);
          },
          style: { backgroundColor: "green", color: "white", border: "none" },
        },
        {
          label: "No",
          style: { backgroundColor: "red", color: "white", border: "none" },
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      overlayClassName: "overlay-custom-class-name",
    });
  };

  return (
    <>
      <Card className="api-card mb-4">
        <Card.Header
          className={`api-card-header bg-${variant} bg-opacity-10 border-${variant}`}
        >
          <Row className="align-items-center">
            <Col xs={12} md={4} className="d-flex align-items-center gap-3">
              <Button variant={variant} className="method-badge">
                {method}
              </Button>
              <div>
                <h5 className="mb-0">{name}</h5>
                <small className="text-muted">{url}</small>
              </div>
            </Col>
            <Col xs={12} md={4} className="text-center">
              <Form.Select
                aria-label="Select Status Code"
                value={statusCode ?? ""}
                onChange={handleStatusCodeChange}
                className="status-select"
              >
                <option value="">Select Status Code</option>
                {responseStatusCodes?.map((responseStatus) => (
                  <option key={responseStatus.id} value={responseStatus.id}>
                    {responseStatus.statusCode} - {responseStatus.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleSave}
                disabled={isUpdating}
                className={`save-button ${
                  statusCode !== defaultStatusCodes ? "visible" : "invisible"
                }`}
              >
                {isUpdating ? (
                  "Saving..."
                ) : (
                  <>
                    <IconSave className="me-1" />
                    <span className="d-none d-md-inline">Save</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="action-button"
              >
                <FaInfoCircle className="me-1" />
                <span className="d-none d-md-inline">Details</span>
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleEdit}
                className="action-button"
              >
                <FaEdit className="me-1" />
                <span className="d-none d-md-inline">Edit</span>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(id)}
                className="action-button"
              >
                <FaTrash className="me-1" />
                <span className="d-none d-md-inline">Delete</span>
              </Button>
            </Col>
          </Row>
        </Card.Header>

        {showDetails && (
          <Card.Body className="api-card-body">
            <Row>
              <Col xs={12} md={6}>
                <h6 className="mb-3">Response Status Codes</h6>
                <div className="response-codes">
                  {responseStatusCodes?.map((response) => (
                    <div key={response.id} className="response-code-item mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-primary">
                          {response.statusCode}
                        </span>
                        <span className="text-muted">{response.name}</span>
                      </div>
                      <div className="response-details">
                        <span className="badge bg-secondary me-2">
                          {response.responseType}
                        </span>
                        {response.responseType === "string" && (
                          <code className="response-preview">
                            {response.primitiveResponse}
                          </code>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={12} md={6}>
                <h6 className="mb-3">API Details</h6>
                <div className="api-details">
                  <p>
                    <strong>URL:</strong> {url}
                  </p>
                  <p>
                    <strong>Method:</strong> {method}
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>

      {showEditForm && editApiData && (
        <CreateCustomAPIForm
          onSubmit={onSubmit}
          onCancel={handleCloseEditForm}
          initialValues={editApiData}
        />
      )}
    </>
  );
};

export default ApiConfigurationCard;
