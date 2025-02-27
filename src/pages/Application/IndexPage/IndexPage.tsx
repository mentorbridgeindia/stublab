import { useCreateApplication } from "@entities/Application/useCreateApplication";
import { useGetApplications } from "@entities/Application/useGetApplications";
import { ReactComponent as IconPlus } from "@icons/icon-folder-plus.svg";
import { CreateApplication } from "@modules/Application/CreateApplication";
import { FolderCard } from "@molecules/FolderCard";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { assignType } from "./helpers";
import { Loader } from "@/ui/atoms/Loader";

export const ApplicationIndexPage = () => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const { data: applications, isLoading, isPending } = useGetApplications();

  const { mutate: createApplication, isPending: isCreating } = useCreateApplication({
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
      {(isLoading || isPending || isCreating) ? (
        <Loader isLoading={true} />
      ) : (
        <>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(true)}>
              <IconPlus />
              Create Application
            </Button>
          </div>
  
          {applications && applications.length > 0 ? (
            <div className="mt-3">
              <Card>
                <Card.Body>
                  <Row>
                    {applications?.map((application) => (
                      <Col
                        sm={12}
                        md={6}
                        lg={3}
                        className="mb-3 center"
                        key={application.id}
                      >
                        <FolderCard
                          type={assignType(application.apiCount ?? 0)}
                          label={application.name}
                          count={application.apiCount ?? 0}
                          subLabel={application.path}
                          link={`/application/${application.id}`}
                        />
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ) : (
            <div className="mt-3">
              <p>No applications found</p>
            </div>
          )}
  
          <CreateApplication
            show={show}
            handleClose={handleClose}
            handleSubmit={createApplication}
            isLoading={isLoading || isCreating}
            isPending={isPending}
            isUpdating={isLoading || isCreating}
          />
        </>
      )}
    </div>
  );
}