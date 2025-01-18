import { useCreateCustomAPI } from "@entities/CustomAPI/useCreateCustomAPI";
import { ReactComponent as PlusIcon } from "@icons/icon-plus.svg";
import { CreateCustomAPIForm } from "@modules/CustomAPI/CreateCustomAPIForm";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

export const ApplicationViewPage = () => {
  const [createAPI, setCreateAPI] = useState(false);
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
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mt-5">Flight Attendance</h1>
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
        <p className="text-left mt-3 mb-5">
          This is a sample server Petstore server. You can find out more about
          Swagger at http://swagger.io or on irc.freenode.net, #swagger. For
          this sample, you can use the api key special-key to test the
          authorization filters.
        </p>
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
