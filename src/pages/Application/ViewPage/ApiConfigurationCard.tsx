import React from 'react';
import { Button, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ApiConfigurationCardProps {
    method: {
        label: string;
        variant: string;
    };
    apiPath: string;
    statusCode: string | null;
    onStatusCodeChange: (statusCode: string) => void;
    onEdit: () => void;
    onDelete: () => void;
    onSave: () => void;
}

const ApiConfigurationCard: React.FC<ApiConfigurationCardProps> = ({
    method,
    apiPath,
    statusCode,
    onStatusCodeChange,
    onEdit,
    onDelete,
    onSave,
}) => {
    return (
        <div className="d-flex align-items-center gap-5 mt-4">
            <Card
                className={`border-${method.variant} flex-grow-1`}
                style={{ borderWidth: '1px', backgroundColor: `rgba(var(--bs-${method.variant}-rgb), 0.1)` }}
            >
                <Card.Body>
                    <Card.Text>
                        <div className="d-flex align-items-center justify-content-between gap-5">
                            <div className="d-flex align-items-center gap-4">
                                <Button variant={method.variant} className="text-white fw-bold" size="sm">
                                    {method.label}
                                </Button>
                                <p className="mb-0 fw-bold">{apiPath}</p>
                            </div>

                            <div className="d-flex flex-column gap-2 align-items-start">
                                <DropdownButton
                                    id="status-code-dropdown"
                                    title={statusCode || 'Select Status Code'}
                                    variant="outline-secondary"
                                    size="sm"
                                    onSelect={(code: string | null) => {
                                        if (code) {
                                            onStatusCodeChange(code);
                                        }
                                    }}
                                >
                                    <Dropdown.Item eventKey="200">200 OK</Dropdown.Item>
                                    <Dropdown.Item eventKey="400">400 Bad Request</Dropdown.Item>
                                    <Dropdown.Item eventKey="404">404 Not Found</Dropdown.Item>
                                    <Dropdown.Item eventKey="500">500 Internal Server Error</Dropdown.Item>
                                </DropdownButton>
                            </div>

                            <div className="d-flex align-items-center gap-4" style={{ minWidth: '150px' }}>
                                <Button
                                    variant="outline-secondary"
                                    className="rounded-circle d-flex justify-content-center align-items-center p-2"
                                    title="Edit"
                                    onClick={onEdit}
                                >
                                    <FaEdit />
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    className="rounded-circle d-flex justify-content-center align-items-center p-2"
                                    title="Delete"
                                    onClick={onDelete}
                                >
                                    <FaTrash />
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={onSave}
                                    style={{
                                        visibility: statusCode ? 'visible' : 'hidden',
                                        width: '60px', 
                                    }}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ApiConfigurationCard;
