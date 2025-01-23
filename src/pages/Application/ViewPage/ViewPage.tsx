import React, { useState } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ReactComponent as PlusIcon } from '@icons/icon-plus.svg';
import { CreateCustomAPIForm } from '@modules/CustomAPI/CreateCustomAPIForm';
import { useCreateCustomAPI } from '@entities/CustomAPI/useCreateCustomAPI';
import { useIsDesktop } from '@hooks/useIsDesktop';
import ApiConfigurationCard from './ApiConfigurationCard'; 
import './ViewPage.scss';

export const ApplicationViewPage: React.FC = () => {
  const isDesktop = useIsDesktop();
  const [createAPI, setCreateAPI] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('swagger');

  const [statusCodes, setStatusCodes] = useState<Record<string, string | null>>({
    post: null,
    get: null,
    put: null,
    delete: null,
  });

  const { mutate: handleSubmit } = useCreateCustomAPI({
    onSuccess: () => {
      toast.success('API created successfully');
      setCreateAPI(false);
    },
    onError: () => {
      toast.error('Error creating API');
    },
  });

  const handleSave = (method: string): void => {
    const code = statusCodes[method];
    if (code) {
      toast.success(`${method.toUpperCase()} status code ${code} saved successfully!`);
    } else {
      toast.error(`Please select a status code for ${method.toUpperCase()}`);
    }
  };

  const handleStatusCodeChange = (method: string, code: string): void => {
    setStatusCodes((prev) => ({
      ...prev,
      [method]: code,
    }));
  };

  const handleEdit = (method: string): void => {
    console.log(`${method.toUpperCase()} Edit Clicked`);
  };

  const handleDelete = (method: string): void => {
    console.log(`${method.toUpperCase()} Delete Clicked`);
  };

  return (
    <div className="d-flex flex-column gap-3 pt-2 px-5">
      <div
        className={
          'd-flex align-items-center flex-wrap ' + (isDesktop ? 'justify-content-between' : 'justify-content-center')
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
          This is a sample server Petstore server. You can find out more about Swagger at http://swagger.io or on
          irc.freenode.net, #swagger.
        </p>
        <div className="d-flex flex-column align-items-center w-100 tab-100 py-4">
          <Tabs
            activeKey={activeTab}
            onSelect={(tab: string | null) => {
              if (tab) {
                setActiveTab(tab);
              }
            }}
            id="justify-tab-example"
            className="mb-3 d-flex justify-content-center gap-4 w-100"
          >
            <Tab eventKey="swagger" title={<span style={{ color: 'black' }}>Swagger</span>}>
              Tab content for swagger
            </Tab>
            <Tab eventKey="configuration" title={<span style={{ color: 'black' }}>Configuration</span>}>
              <div className="d-flex justify-content-between px-3 py-2 bg-light border rounded">
                <span className="fw-bold" style={{ flex: 1 }}>
                  Method
                </span>
                <span className="fw-bold" style={{ flex: 2 }}>
                  URL
                </span>
                <span className="fw-bold" style={{ flex: 17 }}>
                  Update Status Code
                </span>
                <span className="fw-bold" style={{ flex: 2 }}>
                  Actions
                </span>
                <span className="fw-bold" style={{ flex: 2 }}>
                  
                </span>
              </div>
              {['post', 'get', 'put', 'delete'].map((method) => (
                <ApiConfigurationCard
                  key={method}
                  method={{
                    label: method.toUpperCase(),
                    variant:
                      method === 'post'
                        ? 'info'
                        : method === 'get'
                        ? 'success'
                        : method === 'put'
                        ? 'warning'
                        : 'danger',
                  }}
                  apiPath={`/api/v1/pet`}
                  statusCode={statusCodes[method]}
                  onStatusCodeChange={(code) => handleStatusCodeChange(method, code)}
                  onEdit={() => handleEdit(method)}
                  onDelete={() => handleDelete(method)}
                  onSave={() => handleSave(method)}
                />
              ))}
            </Tab>
          </Tabs>
        </div>
      </div>
      {createAPI && <CreateCustomAPIForm onCancel={() => setCreateAPI(false)} onSubmit={handleSubmit} />}
    </div>
  );
};
