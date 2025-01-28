import App from "@/App";
import React from "react";
import { useCreateCustomAPI } from "@entities/CustomAPI/useCreateCustomAPI";
import { useIsDesktop } from "@hooks/useIsDesktop";
import { ReactComponent as PlusIcon } from "@icons/icon-plus.svg";
import { CreateCustomAPIForm } from "@modules/CustomAPI/CreateCustomAPIForm";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";


export const ApplicationViewPage = () => {
  const isDesktop = useIsDesktop();
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
  const jsonData = JSON.parse(
    '\n{\n  "openapi": "3.0.0",\n  "info": {\n    "title": "Stupro API",\n    "version": "v2"\n  },\n  "servers": [\n    {\n      "url": "https://stupro.stublab.in/v2",\n      "description": "Production Server"\n    }\n  ],\n  "paths": {\n    "/getUserDetails": {\n      "get": {\n        "summary": "Get User Details",\n        "description": "Fetch user details from Mongo DB",\n        "responses": {\n          "200": {\n            "description": "Successful operation",\n            "content": {\n              "application/json": {\n                "schema": {\n                  "type": "object",\n                  "properties": {\n                    "AVAILABLE": { "type": "integer", "format": "int32" },\n                    "sold": { "type": "integer", "format": "int32" },\n                    "not-available": { "type": "integer", "format": "int32" },\n                    "Added": { "type": "integer", "format": "int32" },\n                    "string": { "type": "integer", "format": "int32" },\n                    "Test": { "type": "integer", "format": "int32" },\n                    "pending": { "type": "integer", "format": "int32" },\n                    "available": { "type": "integer", "format": "int32" },\n                    "Not Av": { "type": "integer", "format": "int32" },\n                    "terminator": { "type": "integer", "format": "int32" },\n                    "adopted": { "type": "integer", "format": "int32" }\n                  }\n                }\n              }\n            }\n          },\n          "400": {\n            "description": "Invalid status value"\n          },\n          "503": {\n            "description": "Service Error"\n          }\n        }\n      },\n      "post": {\n        "summary": "Create User Details",\n        "description": "Create user details and add it to Mongo DB",\n        "requestBody": {\n          "required": true,\n          "content": {\n            "application/json": {\n              "schema": {\n                "type": "object",\n                "properties": {\n                  "AVAILABLE": { "type": "integer", "format": "int32" },\n                  "sold": { "type": "integer", "format": "int32" },\n                  "not-available": { "type": "integer", "format": "int32" },\n                  "Added": { "type": "integer", "format": "int32" },\n                  "string": { "type": "integer", "format": "int32" },\n                  "Test": { "type": "integer", "format": "int32" },\n                  "pending": { "type": "integer", "format": "int32" },\n                  "available": { "type": "integer", "format": "int32" },\n                  "Not Av": { "type": "integer", "format": "int32" },\n                  "terminator": { "type": "integer", "format": "int32" },\n                  "adopted": { "type": "integer", "format": "int32" }\n                }\n              }\n            }\n          }\n        },\n        "responses": {\n          "201": {\n            "description": "User created successfully"\n          },\n          "400": {\n            "description": "Bad Request"\n          },\n          "503": {\n            "description": "Service Error"\n          }\n        }\n      },\n      "put": {\n        "summary": "Update User Details",\n        "description": "Update user details in Mongo DB",\n        "requestBody": {\n          "required": true,\n          "content": {\n            "application/json": {\n              "schema": {\n                "type": "object",\n                "properties": {\n                  "AVAILABLE": { "type": "integer", "format": "int32" },\n                  "sold": { "type": "integer", "format": "int32" },\n                  "not-available": { "type": "integer", "format": "int32" },\n                  "Added": { "type": "integer", "format": "int32" },\n                  "string": { "type": "integer", "format": "int32" },\n                  "Test": { "type": "integer", "format": "int32" },\n                  "pending": { "type": "integer", "format": "int32" },\n                  "available": { "type": "integer", "format": "int32" },\n                  "Not Av": { "type": "integer", "format": "int32" },\n                  "terminator": { "type": "integer", "format": "int32" },\n                  "adopted": { "type": "integer", "format": "int32" }\n                }\n              }\n            }\n          }\n        },\n        "responses": {\n          "200": {\n            "description": "User updated successfully"\n          },\n          "400": {\n            "description": "Bad Request"\n          },\n          "500": {\n            "description": "Internal Server Error"\n          }\n        }\n      }\n    }\n  }\n}\n'
  );

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
         <div style={{width: "100%"}}>
            <SwaggerUI spec={jsonData} />
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