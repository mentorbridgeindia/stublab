import React, { useState } from 'react';
import { Button, Row, Col, Form, Accordion } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface ApiConfigurationCardProps {
    api: {
        id: string;
        method: string;
        url: string;
        defaultStatusCode: string;
        name: string;
    };
}

const ApiConfigurationCard: React.FC<ApiConfigurationCardProps> = ({ api }) => {
    const { method, url, defaultStatusCode, name, id } = api;

    const [statusCode, setStatusCode] = useState<string>(defaultStatusCode);

    const variant =
        method === 'POST'
            ? 'info'
            : method === 'GET'
                ? 'success'
                : method === 'PUT'
                    ? 'warning'
                    : 'danger';


    const handleSave = (): void => {
        if (statusCode) {
            toast.success(`${id.toUpperCase()} status code ${statusCode} saved successfully!`);
        } else {
            toast.error(`Please select a status code for ${id.toUpperCase()}`);
        }
    };

    const handleStatusCodeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setStatusCode(event.target.value);
    };

    const handleEdit = (): void => {
        console.log(`${id.toUpperCase()} Edit Clicked`);
    };

    const handleDelete = (id: string): void => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: `Are you sure you want to delete API configuration for ${id.toUpperCase()}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log(`${id.toUpperCase()} Deleted Successfully`);
                        toast.success(`${id.toUpperCase()} deleted successfully!`);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        console.log(`${id.toUpperCase()} Deletion Canceled`);
                        toast.info(`${id.toUpperCase()} deletion canceled.`);
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            overlayClassName: 'overlay-custom-class-name',
        });
    };


    return (
        <div className="mt-4 api-card-accordion">
            <Accordion defaultActiveKey="1" >
                <Accordion.Item
                    eventKey="0"
                    className={`border-${variant}`}
                    style={{
                        borderWidth: '1px',
                        borderRadius: '5px',
                        backgroundColor: `rgba(var(--bs-${variant}-rgb), 0.1)`,
                    }}
                >
                    <Accordion.Header className={`accordion-header ${variant}`}>
                        <Row
                            className="w-100 align-items-center py-2 px-3"
                            style={{
                                borderRadius: '5px',
                            }}
                        >
                            <Col lg={2} md={3} xs={4} className="text-center">
                                <Button variant={variant} className="text-white fw-bold" size="sm">
                                    {method}
                                </Button>
                            </Col>

                            <Col lg={4} md={5} xs={8} className="text-center text-truncate">
                                <p className="mb-0 fw-bold">{url}</p>
                            </Col>

                            <Col lg={2} md={4} xs={6} className="text-center">
                                <Form.Select
                                    aria-label="Select Status Code"
                                    value={statusCode}
                                    onChange={handleStatusCodeChange}
                                    size="sm"
                                >
                                    <option value="">Select Status Code</option>
                                    <option value="200 OK">200 OK</option>
                                    <option value="400 Bad Request">400 Bad Request</option>
                                    <option value="404 Not Found">404 Not Found</option>
                                    <option value="500 Internal Server Error">500 Internal Server Error</option>
                                </Form.Select>
                            </Col>

                            <Col lg={2} md={4} xs={6} className="text-center">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleSave}
                                    style={{
                                        visibility: statusCode !== defaultStatusCode ? 'visible' : 'hidden',
                                        width: '60px',
                                    }}
                                >
                                    Save
                                </Button>
                            </Col>

                            <Col lg={2} md={4} xs={12} className="text-center">
                                <div className="d-flex justify-content-center gap-3">
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
                                        onClick={()=>handleDelete(id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Accordion.Header>
                    <Accordion.Body>
                        <p className="mb-0">content below for details
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default ApiConfigurationCard;
