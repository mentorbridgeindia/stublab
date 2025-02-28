import { ICustomAPIEntity } from "@/entities/CustomAPI";
import { CreateCustomAPIForm } from "@/modules/CustomAPI";
import { ReactComponent as IconSave } from "@icons/icon-save.svg";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDeleteCustomAPIById } from "@/entities/CustomAPI";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateStatusCode } from "@/entities/CustomAPI/useUpdateStatusCode";

interface ApiConfigurationCardProps {
  api: ICustomAPIEntity;
  applicationId: string;
  handleSubmit: (data: any) => void;
}

const ApiConfigurationCard: React.FC<ApiConfigurationCardProps> = ({ api, handleSubmit, applicationId }) => {
  const { method, url, defaultStatusCodes, id } = api;
  const queryClient = useQueryClient();
  const [statusCode, setStatusCode] = useState<string | null>(
    defaultStatusCodes
  );
  console.log(statusCode);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editApiData, setEditApiData] = useState<ICustomAPIEntity | null>(null);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const { data: isDeleted, isLoading } = useDeleteCustomAPIById(idToDelete ?? "", {
    enabled: !!idToDelete
  });

  useEffect(() => {
    if (isDeleted && !isLoading && idToDelete) {

      setIdToDelete(null);
    }
  }, [isDeleted, isLoading]);

  const variant = (() => {
    const methodVariants: Record<string, string> = {
      POST: "info",
      GET: "success",
      PUT: "warning",
    };
    return methodVariants[method] || "danger";
  })();
  const { mutate: updateStatusCode, isPending: isUpdating } = useUpdateStatusCode({
    onSuccess: () => {
      toast.success(`${id.toUpperCase()} status code updated successfully!`);
      queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
    },
    onError: (error) => {
      toast.error(`Failed to update status code: ${error.message}`);
    },
  });

  const handleSave = (): void => {
    if (statusCode) {
      updateStatusCode({ id, defaultStatusCode: statusCode });
    } else {
      toast.error(`Please select a status code for ${id.toUpperCase()}`);
    }
  };


  const handleStatusCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setStatusCode(event.target.value);
  };

  const handleEdit = (): void => {
    console.log(`${id.toUpperCase()} Edit Clicked`);
    setEditApiData(api);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
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
            setIdToDelete(id);
            setTimeout(() => {
              queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
            }, 2000);
            toast.success(`API  deleted successfully!`);
          },
          style: { backgroundColor: "green", color: "white", border: "none" }
        },
        {
          label: "No",
          onClick: () => {
            console.log(`${id.toUpperCase()} Deletion Canceled`);

          },
          style: { backgroundColor: "red", color: "white", border: "none" }
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
                  value={statusCode ?? ''}
                  onChange={handleStatusCodeChange}
                  size="sm"
                >
                  <option value="">Select Status Code</option>
                  {api.responseStatusCodes?.map((responseStatus) => (
                    <option
                      key={responseStatus.id}
                      value={responseStatus.id}
                    >
                      {responseStatus.statusCode} - {responseStatus.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col lg={2} md={2} xs={2} sm={2} className="text-center">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSave}
                  disabled={isUpdating}
                  style={{
                    visibility:
                      statusCode !== defaultStatusCodes ? "visible" : "hidden",
                  }}
                  className="w-sm-50"
                >
                  {isUpdating ? "Saving..." : <><IconSave /><span className="d-none d-md-block d-lg-block">Save</span></>}
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
      {showEditForm && editApiData && <CreateCustomAPIForm onSubmit={handleSubmit} onCancel={handleCloseEditForm} initialValues={editApiData} />}
    </div>
  );
};

export default ApiConfigurationCard;
