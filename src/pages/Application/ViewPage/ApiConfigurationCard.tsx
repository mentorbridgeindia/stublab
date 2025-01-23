import React from 'react';
import { Button, Card, DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';
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
                    <Row className="align-items-center">
                        {/* Column 1: Method */}
                        <Col lg={2} className='d-flex justify-content-center'>
                            <Button variant={method.variant} className="text-white fw-bold" size="sm">
                                {method.label}
                            </Button>
                        </Col>

                        {/* Column 2: API Path */}
                        <Col lg={4} className='d-flex justify-content-center'>
                            <p className="mb-0 fw-bold">{apiPath}</p>
                        </Col>

                        {/* Column 3: Status Code */}
                        <Col lg={2} className='d-flex justify-content-center'>
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
                        </Col>

                        <Col lg={2} className='d-flex justify-content-center'>
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
                        </Col>
                        {/* Column 4: Actions */}
                        <Col lg={2} className='d-flex justify-content-center'>
                            <div className="d-flex align-items-center gap-3">
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
                            </div>
                        </Col>

                        {/* Column 5: Save Button */}

                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ApiConfigurationCard;
