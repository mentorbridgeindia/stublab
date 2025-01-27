import { useGetApplicationById } from "@entities/Application";
import React, { useState } from 'react';
import { Button, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ReactComponent as PlusIcon } from '@icons/icon-plus.svg';
import { CreateCustomAPIForm } from '@modules/CustomAPI/CreateCustomAPIForm';
import { useCreateCustomAPI } from '@entities/CustomAPI/useCreateCustomAPI';
import { useIsDesktop } from '@hooks/useIsDesktop';
import ApiConfigurationCard from './ApiConfigurationCard';
import './ViewPage.scss';
import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css"
import { useParams } from "react-router-dom";
import { appDetails } from './data';

export const ApplicationViewPage: React.FC = () => {
    const isDesktop = useIsDesktop();
    const [createAPI, setCreateAPI] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('swagger');
    
    const { id } = useParams();
    const { data: applicationDetails } = useGetApplicationById(id ?? "", {
        queryConfig: { enabled: !!id },
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

    

    return (
        <div className="d-flex flex-column gap-3 pt-2 px-5">
            <div
                className={ 
                    'd-flex align-items-center flex-wrap ' + (isDesktop ? 'justify-content-between' : 'justify-content-center')
                }
            >
                <h1 className="mt-5">{applicationDetails.name}</h1>
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
                    {appDetails.description}
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
                        <Tab
                            eventKey="swagger"
                            title={<span style={{ color: 'black' }}>Swagger</span>}
                        >
                            <SwaggerUI spec=
                                {applicationDetails.swaggerJson}
                            />
                        </Tab>

                        <Tab eventKey="configuration" title={<span style={{ color: 'black' }}>Configuration</span>}>
                            <Row className="header-row mb-3 ">
                                <Col lg={2} className="col-method">Method</Col>
                                <Col lg={4}>URL</Col>
                                <Col lg={2} className='col-status'>Update Status Code</Col>
                                <Col lg={2}></Col>
                                <Col lg={2} className="col-actions">Actions</Col>
                            </Row>
                            {applicationDetails.apiDetails.map((api) => (
                                <ApiConfigurationCard
                                    key={api.method}
                                    api={api}
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
