import { useGetApplicationById } from "@entities/Application";
import { useCreateCustomAPI } from "@entities/CustomAPI/useCreateCustomAPI";
import { useIsDesktop } from "@hooks/useIsDesktop";
import { ReactComponent as PlusIcon } from "@icons/icon-plus.svg";
import { CreateCustomAPIForm } from "@modules/CustomAPI/CreateCustomAPIForm";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const ApplicationViewPage = () => {
  const isDesktop = useIsDesktop();
  const [createAPI, setCreateAPI] = useState(false);
  const { id } = useParams();
  const { data: application } = useGetApplicationById(id ?? "", {
    queryConfig: { enabled: !!id },
  });
  const { mutate: handleSubmit } = useCreateCustomAPI({
    onSuccess: () => {
      toast.success("API created successfully");
      setCreateAPI(false);
    },
    onError: () => {
      toast.error("Error creating API");
    },
  });
  return (
    <div className="d-flex flex-column gap-3 pt-2 px-5">
      <div
        className={
          "d-flex align-items-center flex-wrap " +
          (isDesktop ? "justify-content-between" : "justify-content-center")
        }
      >
        <h1 className="mt-5">{application?.name}</h1>
        <Button
          variant="outline-primary"
          className="d-flex align-items-center gap-2"
          size="sm"
          onClick={() => setCreateAPI(true)}
        >
          <PlusIcon />
          Add API
        </Button>
      </div>
      <div className="d-flex justify-content-start flex-column align-items-start">
        <p className="text-left mt-3 mb-5">{application?.description}</p>
        <div id="api-list">
          <Card className="card-light-success">
            <Card.Body>
              <Card.Text>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <Button variant="success" className="text-white fw-bold">
                    POST
                  </Button>
                  <p className="mb-0 fw-bold">/api/v1/pet</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      {createAPI && (
        <CreateCustomAPIForm
          onCancel={() => setCreateAPI(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
