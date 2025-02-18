import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import {ReactComponent as Apilogo} from "@icons/icon-api.svg";
import {ReactComponent as Modellogo} from "@icons/icon-model.svg";
import {ReactComponent as Applicationlogo} from "@icons/icon-application.svg";
import {ReactComponent as Responselogo} from "@icons/icon-response.svg";
import "./DataCards.scss";

const Data = [
  { logo: <Apilogo className="api-logo-icon" />, name: "API", number: "17", className: "api" },
  { logo: <Modellogo className="icon" />, name: "Models", number: "69", className: "model" },
  { logo: <Applicationlogo className="icon" />, name: "Applications", number: "5", className: "application" },
  { logo: <Responselogo className="icon" />, name: "Often used", number: "200", className: "response" },
];

const DataCards: React.FC = () => {
  return (
    <Row className="mt-4">
      {Data.map((data, index) => (
        <Col xs={8} sm={6} md={4} lg={3} key={index} className="mb-4">
          <Card className={`data-card ${data.className} text-center p-3 shadow-sm`}>
            <Card.Body>
              <div className="logo-container mb-2">{data.logo}</div>
              <h5>{data.name}</h5>
              <h4>{data.number}</h4>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DataCards;
