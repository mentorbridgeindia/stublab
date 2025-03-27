import { useIsMobile } from "@/hooks/useIsMobile";
import {
  useDeleteApplicationById,
  useGetApplicationById,
} from "@entities/Application";
import { ICustomAPIMutation } from "@entities/CustomAPI/CustomAPI.types";
import { useCreateCustomAPI } from "@entities/CustomAPI/useCreateCustomAPI";
import { useUpdateCustomAPI } from "@entities/CustomAPI/useUpdateCustomAPI";
import { useIsDesktop } from "@hooks/useIsDesktop";
import { ReactComponent as IconDownload } from "@icons/icon-download.svg";
import { ReactComponent as EmptyApiIcon } from "@icons/icon-empty-api.svg";
import { ReactComponent as PlusIcon } from "@icons/icon-plus.svg";
import { ReactComponent as TrashIcon } from "@icons/icon-trash.svg";
import { CreateCustomAPIForm } from "@modules/CustomAPI/CreateCustomAPIForm";
import { ICreateCustomAPIForm } from "@modules/CustomAPI/CreateCustomAPIForm.types";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Col,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import ApiConfigurationCard from "./ApiConfigurationCard";
import "./ViewPage.scss";

export const ApplicationViewPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isDesktop = useIsDesktop();
  const [createAPI, setCreateAPI] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("swagger");
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const { id } = useParams();
  const isMobile = useIsMobile();
  const { data: applicationDetails } = useGetApplicationById(id ?? "", {
    queryConfig: { enabled: !!id },
  });

  const { mutate: handleCreateCustomAPI } = useCreateCustomAPI({
    onSuccess: () => {
      setCreateAPI(false);
      toast.success("API created successfully");
      invalidateQuery();
    },
    onError: () => {
      toast.error("Error creating API");
    },
  });

  const { mutate: handleUpdateCustomAPI } = useUpdateCustomAPI({
    onSuccess: () => {
      setCreateAPI(false);
      toast.success("API updated successfully");
      invalidateQuery();
    },
    onError: () => {
      toast.error("Error updating API");
    },
  });

  const { data: isDeleted, isLoading } = useDeleteApplicationById(
    id ?? "",
    idToDelete !== null
  );

  useEffect(() => {
    if (isDeleted && !isLoading && idToDelete !== null) {
      toast.success(`${id?.toUpperCase()} deleted successfully!`);
      navigate("/application");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted, isLoading]);

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["application", id],
    });
  };

  const handleSubmit = (
    data: ICreateCustomAPIForm & { applicationId: string }
  ) => {
    if (id) {
      data.applicationId = id;
      if (createAPI) {
        handleCreateCustomAPI(data as unknown as ICustomAPIMutation);
      } else {
        handleUpdateCustomAPI(data as unknown as ICustomAPIMutation);
      }
    }
  };

  const createModel = () => {
    navigate("/model/create");
  };

  const handleDownload = () => {
    const swagger = applicationDetails?.swagger;
    if (swagger) {
      const blob = new Blob([JSON.stringify(swagger, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${applicationDetails?.name}-swagger.json`;
      a.click();
    }
  };

  const handleDelete = (): void => {
    if (applicationDetails?.id) {
      confirmAlert({
        title: "Confirm Deletion",
        message: `Are you sure you want to delete the application ${applicationDetails?.name}?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              setIdToDelete(applicationDetails.id);
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
      });
    }
  };

  const handleRequest = async (req: any): Promise<any> => {
    try {
      const clientId = localStorage.getItem("clientId");
      const url = new URL(req.url);
      url.protocol = "https";
      url.hostname = "api.stublab.com";
      url.port = "";
      console.log("url", url.toString());
      return new Request(url.toString(), {
        method: req.method,
        headers: {
          ...req.headers,
          "x-client-id": clientId ?? "",
          "Content-Type": "application/json",
        },
        body: req.body,
      });
    } catch (error) {
      console.error("Error modifying request:", error);
      return req; // Return the original request on error
    }
  };

  const addHeaders = (request: any) => {
    const clientId = localStorage.getItem("clientId");
    request.headers["x-client-id"] = clientId ?? "";
    request.headers["Content-Type"] = "application/json";
    request.headers["Accept"] = "application/json";
    return request;
  };

  return (
    <div className="d-flex flex-column gap-3 pt-2">
      <div
        className={
          "d-flex  px-lg-5 align-items-center flex-wrap " +
          (isDesktop ? "justify-content-between" : "justify-content-center")
        }
      >
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/application">Application</Breadcrumb.Item>
          <Breadcrumb.Item className="mt-1" active>
            {applicationDetails?.name}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-primary"
            className="d-flex align-items-center gap-2  "
            size="sm"
            onClick={() => setCreateAPI(true)}
          >
            {!isMobile && <PlusIcon />}
            Add API
          </Button>
          <Button
            variant="outline-primary"
            className="d-flex align-items-center gap-2  "
            size="sm"
            onClick={createModel}
          >
            {!isMobile && <PlusIcon />}
            Add Model
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            {!isMobile && <TrashIcon />}
            Delete Application
          </Button>
        </div>
      </div>
      <div
        className={
          "d-flex align-items-center px-lg-5 flex-wrap " +
          (isDesktop ? "justify-content-between" : "justify-content-center")
        }
      >
        <h1 className="mt-2">{applicationDetails?.name}</h1>
        <h5 className="text-left mt-3 mb-3">
          Path:{" "}
          <Badge pill={false} color="secondary">
            {applicationDetails?.path}
          </Badge>
        </h5>
      </div>
      <div>
        <p className="text-left float-start px-lg-5 mt-3 mb-3">
          {applicationDetails?.description}
        </p>
      </div>

      <div>
        {applicationDetails?.mockApiList &&
        applicationDetails.mockApiList.length > 0 ? (
          <div className="d-flex flex-column align-items-center w-100 tab-100 py-4">
            <Tabs
              activeKey={activeTab}
              onSelect={(tab: string | null) => {
                if (tab) {
                  setActiveTab(tab);
                }
              }}
              id="justify-tab-example"
              className="mb-3 d-flex justify-content-center gap-4 w-100 "
            >
              <Tab
                eventKey="swagger"
                className="mx-sm-2"
                title={<span style={{ color: "black" }}>Swagger</span>}
              >
                <div className="d-flex justify-content-end mb-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleDownload}
                  >
                    <IconDownload /> Download Swagger
                  </Button>
                </div>
                <div className="swagger-container">
                  <SwaggerUI
                    spec={applicationDetails?.swagger}
                    requestInterceptor={addHeaders}
                  />
                </div>
              </Tab>

              <Tab
                eventKey="configuration"
                title={<span style={{ color: "black" }}>Configuration</span>}
              >
                {applicationDetails?.mockApiList?.length ? (
                  <div>
                    <Row className="header-row mb-3  ">
                      <Col
                        lg={1}
                        md={2}
                        sm={2}
                        className="col-method d-none d-md-block d-lg-block"
                      >
                        Method
                      </Col>
                      <Col
                        lg={2}
                        md={4}
                        sm={4}
                        className="d-none d-md-block d-lg-block"
                      >
                        URL
                      </Col>
                      <Col
                        lg={6}
                        md={2}
                        sm={2}
                        className="col-status d-none d-md-block d-lg-block"
                      >
                        Update Status Code
                      </Col>
                      <Col
                        lg={2}
                        md={2}
                        sm={2}
                        className="col-actions d-none d-md-block d-lg-block"
                      >
                        Actions
                      </Col>
                    </Row>
                    <div>
                      {id &&
                        applicationDetails?.mockApiList?.map((api) => (
                          <ApiConfigurationCard
                            key={api.method}
                            applicationId={id}
                            api={api}
                            handleSubmit={handleSubmit}
                          />
                        ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-center mt-5">No API found</h4>
                  </div>
                )}
              </Tab>
            </Tabs>
          </div>
        ) : (
          <div className="empty-state-icon">
            <EmptyApiIcon />
            <p className="animated-text">
              {"No API found".split("").map((char, index) => (
                <span key={index}>{char === " " ? "\u00A0" : char}</span>
              ))}
            </p>
          </div>
        )}
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
