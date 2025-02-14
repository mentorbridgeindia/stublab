import React from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import "./Dashboard.scss";
import { ReactComponent as Apilogo } from "@icons/icon-api.svg";
import { ReactComponent as Modellogo } from "@icons/icon-model.svg";
import { ReactComponent as Applicationlogo } from "@icons/icon-application.svg";
import { ReactComponent as Responselogo } from "@icons/icon-response.svg";
import { ReactComponent as Greetinglogo } from "@icons/icon-greeting.svg";

const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) return "Good Morning,";
  else if (hours < 16) return "Good Afternoon,";
  else return "Good Evening,";
};

const Data = [
  {
    logo: <Apilogo className="api-logo-icon" />, 
    name: "API", 
    number: "17", 
    className: "api"
  },
  {
    logo: <Modellogo className="icon" />, 
    name: "Models", 
    number: "69", 
    className: "model"
  },
  {
    logo: <Applicationlogo className="icon" />, 
    name: "Applications", 
    number: "5", 
    className: "application"
  },
  {
    logo: <Responselogo className="icon" />, 
    name: "Often used", 
    number: "200", 
    className: "response"
  },
];

const apiData = [
  {
    projectName: "User Authentication API",
    statusCode: "200 OK",
    statusClass: "status-200",
    hits: "12.5K",
  },
  {
    projectName: "Payment Gateway API",
    statusCode: "400 Bad Request",
    statusClass: "status-400",
    hits: "8.3K",
  },
  {
    projectName: "Order Management API",
    statusCode: "500 Internal Server Error",
    statusClass: "status-500",
    hits: "5.9K",
  },
  {
    projectName: "Product Catalog API",
    statusCode: "403 Forbidden",
    statusClass: "status-403",
    hits: "7.2K",
  },
];

const Dashboard: React.FC = () => {
  return (
    <Container className="dashboard-container py-4">
       <Row className="justify-content-center">
        <Col md={12}>
          <Card className="greeting-card p-4 shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="greeting-text">{getGreeting()}</h2>
                <h1 style={{ fontSize: "100px" }}>User!</h1>
                <h4 className="quote">"Welcome to your StubLab's dashboard!"</h4>
              </div>
              <Greetinglogo className="greeting-logo ms-auto" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4">
        {Data.map((data, index) => (
          <Col xs={8} sm={6} md={4} lg={3} key={index} className="mb-4">
            <Card className={`data-card ${data.className} text-center p-3 shadow-sm`}>
              <Card.Body className="data-card">
                <div className="logo-container mb-2">{data.logo}</div>
                <h5>{data.name}</h5>
                <h4>{data.number}</h4>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="table-container">
        <Table responsive>
          <thead>
            <tr>
              <th>API Project</th>
              <th>Status Code</th>
              <th>Number of Hits</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((api, index) => (
              <tr key={index}>
                <td>{api.projectName}</td>
                <td>
                  <span className={`status-badge ${api.statusClass}`}>
                    {api.statusCode}
                  </span>
                </td>
                <td>{api.hits}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Dashboard;