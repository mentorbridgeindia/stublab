import { useGetApplicationById } from "@entities/Application";
import { useCreateCustomAPI } from "@entities/CustomAPI/useCreateCustomAPI";
import { useIsDesktop } from "@hooks/useIsDesktop";
import { ReactComponent as PlusIcon } from "@icons/icon-plus.svg";
import { CreateCustomAPIForm } from "@modules/CustomAPI/CreateCustomAPIForm";
import React, { useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./ViewPage.scss";
import { ICreateCustomAPIForm } from "../../../modules/CustomAPI/CreateCustomAPIForm.types";
import { useUpdateCustomAPI } from "../../../entities/CustomAPI/useUpdateCustomAPI";
import { ICustomAPIMutation } from "../../../entities/CustomAPI/CustomAPI.types";
import ApiConfigurationCard from "./ApiConfigurationCard";
import { useQueryClient } from "@tanstack/react-query";

export const ApplicationViewPage: React.FC = () => {
  const isDesktop = useIsDesktop();
  const [createAPI, setCreateAPI] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("swagger");
  const [editingApi, setEditingApi] = useState<string>("");

  const { id } = useParams();
  const { data: applicationDetails } = useGetApplicationById(id ?? "", {
    queryConfig: { enabled: !!id },
  });

  const queryClient = useQueryClient();

  function handleInvalidate() {
    queryClient.invalidateQueries({
      queryKey: ['application', id],
    })

  }

  const { mutate: handleCreateCustomAPI } = useCreateCustomAPI({
    onSuccess: () => {
      toast.success("API created successfully");
      handleInvalidate();
      setCreateAPI(false);
    },
    onError: () => {
      toast.error("Error creating API");
    },
  });

  const { mutate: handleUpdateCustomAPI } = useUpdateCustomAPI({
    onSuccess: () => {
      toast.success("API updated successfully");
      handleInvalidate();
    },
    onError: () => {
      toast.error("Error updating API");
    },
  });

  const handleSubmit = (
    data: ICreateCustomAPIForm & { applicationId: string }
  ) => {
    data.applicationId = id ?? "";
    if (createAPI) {
      handleCreateCustomAPI(data as unknown as ICustomAPIMutation);
    } else {
      handleUpdateCustomAPI(data as unknown as ICustomAPIMutation);
    }
  };


  return (
    <div className="d-flex flex-column gap-3 pt-2 px-lg-5">
      <div
        className={
          "d-flex align-items-center flex-wrap " +
          (isDesktop ? "justify-content-between" : "justify-content-center")
        }
      >
        <h1 className="mt-5">{applicationDetails?.name}</h1>
        <Button
          variant="outline-primary"
          className="d-flex align-items-center gap-2  "
          size="sm"
          onClick={() => setCreateAPI(true)}
        >
          <PlusIcon />
          Add API
        </Button>
      </div>
      <div className="d-flex flex-column align-items-start">
        <p className="text-left mt-3 mb-3">{applicationDetails?.description}</p>
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
              <SwaggerUI spec={applicationDetails?.swagger} />
            </Tab>

            <Tab
              eventKey="configuration"
              title={<span style={{ color: "black" }}>Configuration</span>}
            >
              {applicationDetails?.mockApiList ? (
                <div>
                  <Row className="header-row mb-3  ">
                    <Col
                      lg={2}
                      md={2}
                      sm={2}
                      className="col-method d-none d-md-block d-lg-block"
                    >
                      Method
                    </Col>
                    <Col
                      lg={4}
                      md={4}
                      sm={4}
                      className="d-none d-md-block d-lg-block"
                    >
                      URL
                    </Col>
                    <Col
                      lg={2}
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
                      className="d-none d-md-block d-lg-block"
                    ></Col>
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
                    {applicationDetails?.mockApiList?.map((api) => (
                      <ApiConfigurationCard key={api.method} api={api} handleEdit={() => { setCreateAPI(true); setEditingApi(api.id) }} />
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
      </div>
      {createAPI && (
        <CreateCustomAPIForm
          onCancel={() => setCreateAPI(false)}
          onSubmit={handleSubmit}
          editingApi={editingApi}
        />
      )}
    </div>
  );
};
