import { useCreateCustomAPI } from "@entities/CustomAPI/useCreateCustomAPI";
import { useIsDesktop } from "@hooks/useIsDesktop";
import { ReactComponent as PlusIcon } from "@icons/icon-plus.svg";
import { CreateCustomAPIForm } from "@modules/CustomAPI/CreateCustomAPIForm";
import { useState } from "react";
import { Button, Card, Dropdown, DropdownButton, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

export const ApplicationViewPage = () => {
  const isDesktop = useIsDesktop();
  const [createAPI, setCreateAPI] = useState(false);
  const [statusCode, setStatusCode] = useState("");
  const [activeTab, setActiveTab] = useState("swagger");

  const { mutate: handleSubmit } = useCreateCustomAPI({
    onSuccess: () => {
      toast.success("API created successfully");
      setCreateAPI(false);
    },
    onError: () => {
      toast.error("Error creating API");
    },
  });

  const handleSave = () => {
    if (statusCode) {
      toast.success(`Status code ${statusCode} saved successfully!`);
    } else {
      toast.error("Please select a status code");
    }
  };
  

  return (
    <div className="d-flex flex-column gap-3 pt-2 px-5">
      <div
        className={
          "d-flex align-items-center flex-wrap " +
          (isDesktop ? "justify-content-between" : "justify-content-center")
        }
      >
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
      <div className="d-flex flex-column align-items-start">
        <p className="text-left mt-3 mb-3">
          This is a sample server Petstore server. You can find out more about
          Swagger at http://swagger.io or on irc.freenode.net, #swagger. For
          this sample, you can use the api key special-key to test the
          authorization filters.
        </p>
        <div className="d-flex flex-column align-items-center w-100 py-4">
          <Tabs
            activeKey={activeTab}
            onSelect={(tab) => {
              if (tab) setActiveTab(tab);
            }}
            id="justify-tab-example"
            className="mb-3 d-flex justify-content-center gap-4 w-100"
          >
            <Tab
              eventKey="swagger"
              title={<span style={{ color: "black" }}>Swagger</span>}

            >
              Tab content for swagger
            </Tab>
            <Tab
              eventKey="configuration"
              title={<span style={{ color: "black" }}>Configuration</span>}

            >
              <div className=" d-flex align-items-center gap-5 mt-4">
                <Card className="card-light-success flex-grow-1">
                  <Card.Body>
                    <Card.Text>
                      <div className="d-flex align-items-center justify-content-between gap-5">
                        
                        <div className="d-flex align-items-center gap-4">
                          <Button variant="info" className="text-white fw-bold">
                            POST
                          </Button>
                          <p className="mb-0 fw-bold">/api/v1/pet</p>
                        </div>

                        <div className="d-flex flex-column gap-2 align-items-start ">
                          <label htmlFor="status-code-dropdown" className="fw-bold mb-0">
                            Update Response Code
                          </label>
                          <DropdownButton
                            id="status-code-dropdown"
                            title={statusCode || "Select Status Code"}
                            variant="outline-secondary"
                            size="sm"
                            onSelect={(eventKey) => {
                              if (eventKey) {
                                setStatusCode(eventKey);
                              }
                            }}
                          >
                            <Dropdown.Item eventKey="200">200 OK</Dropdown.Item>
                            <Dropdown.Item eventKey="400">400 Bad Request</Dropdown.Item>
                            <Dropdown.Item eventKey="404">404 Not Found</Dropdown.Item>
                            <Dropdown.Item eventKey="500">500 Internal Server Error</Dropdown.Item>
                          </DropdownButton>
                        </div>

                        <div className="d-flex align-items-center gap-4">
                          <div className="d-flex align-items-center gap-4">
                            <Button
                              variant="outline-secondary"
                              className="rounded-circle d-flex justify-content-center align-items-center p-2"

                              title="Edit"
                              onClick={() => console.log("Edit Clicked")}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              className="rounded-circle d-flex justify-content-center align-items-center p-2 "

                              title="Delete"
                              onClick={() => console.log("Delete Clicked")}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSave}
                            disabled={!statusCode}
                          >
                            Save
                          </Button>


                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>

              </div>
              <div className=" d-flex align-items-center gap-5 mt-4">
                <Card className="card-light-success flex-grow-1">
                  <Card.Body>
                    <Card.Text>
                      <div className="d-flex align-items-center justify-content-between gap-5">
                        
                        <div className="d-flex align-items-center gap-4">
                          <Button variant="success" className="text-white fw-bold">
                            GET
                          </Button>
                          <p className="mb-0 fw-bold">/api/v1/pet</p>
                        </div>

                        <div className="d-flex flex-column gap-2 align-items-start ">
                          <label htmlFor="status-code-dropdown" className="fw-bold mb-0">
                            Update Response Code
                          </label>
                          <DropdownButton
                            id="status-code-dropdown"
                            title={statusCode || "Select Status Code"}
                            variant="outline-secondary"
                            size="sm"
                            onSelect={(eventKey) => {
                              if (eventKey) {
                                setStatusCode(eventKey);
                              }
                            }}
                          >
                            <Dropdown.Item eventKey="200">200 OK</Dropdown.Item>
                            <Dropdown.Item eventKey="400">400 Bad Request</Dropdown.Item>
                            <Dropdown.Item eventKey="404">404 Not Found</Dropdown.Item>
                            <Dropdown.Item eventKey="500">500 Internal Server Error</Dropdown.Item>
                          </DropdownButton>
                        </div>

                        <div className="d-flex align-items-center gap-4">
                          <div className="d-flex align-items-center gap-4">
                            <Button
                              variant="outline-secondary"
                              className="rounded-circle d-flex justify-content-center align-items-center p-2"

                              title="Edit"
                              onClick={() => console.log("Edit Clicked")}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              className="rounded-circle d-flex justify-content-center align-items-center p-2 "

                              title="Delete"
                              onClick={() => console.log("Delete Clicked")}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSave}
                            disabled={!statusCode}
                          >
                            Save
                          </Button>


                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>

              </div>
              <div className=" d-flex align-items-center gap-5 mt-4">
                <Card className="card-light-success flex-grow-1">
                  <Card.Body>
                    <Card.Text>
                      <div className="d-flex align-items-center justify-content-between gap-5">
                        
                        <div className="d-flex align-items-center gap-4">
                          <Button variant="warning" className="text-white fw-bold">
                            PUT
                          </Button>
                          <p className="mb-0 fw-bold">/api/v1/pet</p>
                        </div>

                        <div className="d-flex flex-column gap-2 align-items-start ">
                          <label htmlFor="status-code-dropdown" className="fw-bold mb-0">
                            Update Response Code
                          </label>
                          <DropdownButton
                            id="status-code-dropdown"
                            title={statusCode || "Select Status Code"}
                            variant="outline-secondary"
                            size="sm"
                            onSelect={(eventKey) => {
                              if (eventKey) {
                                setStatusCode(eventKey);
                              }
                            }}
                          >
                            <Dropdown.Item eventKey="200">200 OK</Dropdown.Item>
                            <Dropdown.Item eventKey="400">400 Bad Request</Dropdown.Item>
                            <Dropdown.Item eventKey="404">404 Not Found</Dropdown.Item>
                            <Dropdown.Item eventKey="500">500 Internal Server Error</Dropdown.Item>
                          </DropdownButton>
                        </div>

                        <div className="d-flex align-items-center gap-4">
                          <div className="d-flex align-items-center gap-4">
                            <Button
                              variant="outline-secondary"
                              className="rounded-circle d-flex justify-content-center align-items-center p-2"

                              title="Edit"
                              onClick={() => console.log("Edit Clicked")}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              className="rounded-circle d-flex justify-content-center align-items-center p-2 "

                              title="Delete"
                              onClick={() => console.log("Delete Clicked")}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSave}
                            disabled={!statusCode}
                          >
                            Save
                          </Button>


                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>

              </div>
              <div className=" d-flex align-items-center gap-5 mt-4">
                <Card className="card-light-success flex-grow-1">
                  <Card.Body>
                    <Card.Text>
                      <div className="d-flex align-items-center justify-content-between gap-5">
                        
                        <div className="d-flex align-items-center gap-4">
                          <Button variant="danger" className="text-white fw-bold">
                            DELETE
                          </Button>
                          <p className="mb-0 fw-bold">/api/v1/pet</p>
                        </div>

                        <div className="d-flex flex-column gap-2 align-items-start ">
                          <label htmlFor="status-code-dropdown" className="fw-bold mb-0">
                            Update Response Code
                          </label>
                          <DropdownButton
                            id="status-code-dropdown"
                            title={statusCode || "Select Status Code"}
                            variant="outline-secondary"
                            size="sm"
                            onSelect={(eventKey) => {
                              if (eventKey) {
                                setStatusCode(eventKey);
                              }
                            }}
                          >
                            <Dropdown.Item eventKey="200">200 OK</Dropdown.Item>
                            <Dropdown.Item eventKey="400">400 Bad Request</Dropdown.Item>
                            <Dropdown.Item eventKey="404">404 Not Found</Dropdown.Item>
                            <Dropdown.Item eventKey="500">500 Internal Server Error</Dropdown.Item>
                          </DropdownButton>
                        </div>

                        <div className="d-flex align-items-center gap-4">
                          <div className="d-flex align-items-center gap-4">
                            <Button
                              variant="outline-secondary"
                              className="rounded-circle d-flex justify-content-center align-items-center p-2"

                              title="Edit"
                              onClick={() => console.log("Edit Clicked")}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              className="rounded-circle d-flex justify-content-center align-items-center p-2 "

                              title="Delete"
                              onClick={() => console.log("Delete Clicked")}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSave}
                            disabled={!statusCode}
                          >
                            Save
                          </Button>


                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>

              </div>
            </Tab>
          </Tabs>
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
