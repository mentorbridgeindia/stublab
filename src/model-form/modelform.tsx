import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Model = {
    name: string;
    type: string;
    isNullable: boolean;
    defaultValue?: string;
    sampleText?: string;
};

const ModelForm: React.FC = () => {
    const { control, handleSubmit, register, reset } = useForm<{ models: Model[] }>({
        defaultValues: {
            models: [
                { name: "", type: "string", isNullable: false, defaultValue: "", sampleText: "" },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "models",
    });

    const onSubmit = (data: { models: Model[] }) => {
        fetch('http://localhost:8080/api/models', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.models),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create API'); // Ensure error for non-200 status
                }
                return response.json();
            })
            .then((result) => {
                console.log('Success:', result);
                toast.success('API created successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('An error occurred while creating the API.');
            });

    }

    const handleCancel = () => {
        reset({
            models: [
                { name: "", type: "string", isNullable: false, defaultValue: "", sampleText: "" },
            ],
        });
        toast.info("Form reset.");
    };

    return (
        <Container>
            <ToastContainer position="top-center" />
            <h1 className="my-4 text-center">Create API Models</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((item, index) => (
                    <div key={item.id} className="mb-3 border rounded p-3 bg-light">
                        <Row className="align-items-center">
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label>Model Name</Form.Label>
                                    <Form.Control
                                        {...register(`models.${index}.name` as const)}
                                        type="text"
                                        placeholder="Enter model name"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select {...register(`models.${index}.type` as const)} defaultValue="string">
                                        <option value="string">String</option>
                                        <option value="int">Int</option>
                                        <option value="long">Long</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label>Nullable</Form.Label>
                                    <div className="d-flex justify-content-center">
                                        <Form.Check
                                            {...register(`models.${index}.isNullable` as const)}
                                            type="checkbox"
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label>Default Value</Form.Label>
                                    <Form.Control
                                        {...register(`models.${index}.defaultValue` as const)}
                                        type="text"
                                        placeholder="Default value"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Sample Text</Form.Label>
                                    <Form.Control
                                        {...register(`models.${index}.sampleText` as const)}
                                        type="text"
                                        placeholder="Sample text"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={1} className="text-end">
                                <Button variant="danger" onClick={() => remove(index)}>
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    </div>
                ))}
                <div className="d-flex justify-content-between">
                    <Button
                        variant="primary"
                        onClick={() =>
                            append({
                                name: "",
                                type: "string",
                                isNullable: false,
                                defaultValue: "",
                                sampleText: "",
                            })
                        }
                    >
                        Add Model
                    </Button>
                    <div>
                        <Button type="submit" variant="success" className="me-2">
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Form>
        </Container>
    );
};

export default ModelForm;