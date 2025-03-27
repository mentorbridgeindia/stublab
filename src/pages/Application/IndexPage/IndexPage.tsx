import { useCreateApplication } from "@entities/Application/useCreateApplication";
import { useGetApplications } from "@entities/Application/useGetApplications";
import { ReactComponent as IconPlus } from "@icons/icon-folder-plus.svg";
import { CreateApplication } from "@modules/Application/CreateApplication";
import { EmptyState } from "@molecules/EmptyState/EmptyState";
import { FolderCard } from "@molecules/FolderCard";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";
import { assignType } from "./helpers";

export const ApplicationIndexPage = () => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const { data: applications, isLoading } = useGetApplications();

  const { mutate: createApplication } = useCreateApplication({
    onSuccess: () => {
      toast.success("Application created successfully");
      queryClient.invalidateQueries({ queryKey: ["application"] });
      handleClose();
    },
    onError: () => {
      toast.error("Error creating application");
    },
  });

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(true)}>
          <IconPlus />
          Create Application
        </Button>
      </div>

      {!!applications && applications?.length > 0 && !isLoading ? (
        <div className="mt-3">
          <Card>
            <Card.Body>
              <Row>
                {applications?.map((application) => (
                  <Col
                    sm={12}
                    md={6}
                    lg={4}
                    className="mb-3 center"
                    key={application.id}
                  >
                    <FolderCard
                      type={assignType(application.totalApiCount ?? 0)}
                      label={application.name}
                      count={application.totalApiCount ?? 0}
                      subLabel={application.path}
                      link={`/application/${application.id}`}
                      createdAt={application.createdOn}
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <EmptyState title="No applications found" />
      )}

      <CreateApplication
        show={show}
        handleClose={handleClose}
        handleSubmit={createApplication}
      />
    </div>
  );
};
