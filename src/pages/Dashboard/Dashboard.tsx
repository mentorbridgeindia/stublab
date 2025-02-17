import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
    className: "api",
  },
  {
    logo: <Modellogo className="icon" />,
    name: "Models",
    number: "69",
    className: "model",
  },
  {
    logo: <Applicationlogo className="icon" />,
    name: "Applications",
    number: "5",
    className: "application",
  },
  {
    logo: <Responselogo className="icon" />,
    name: "Often used",
    number: "200",
    className: "response",
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

const graphData = [
  { day: "Sunday", time: "12-1", value: 30 },
  { day: "Monday", time: "1-2", value: 20 },
  { day: "Tuesday", time: "2-3", value: 25 },
  { day: "Wednesday", time: "3-4", value: 80 },
  { day: "Thursday", time: "4-5", value: 90 },
  { day: "Friday", time: "5-6", value: 70 },
  { day: "Saturday", time: "6-7", value: 95 },
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
                <h4 className="quote">
                  "Welcome to your StubLab's dashboard!"
                </h4>
              </div>
              <Greetinglogo className="greeting-logo ms-auto" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {Data.map((data, index) => (
          <Col xs={8} sm={6} md={4} lg={3} key={index} className="mb-4">
            <Card
              className={`data-card ${data.className} text-center p-3 shadow-sm`}
            >
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

      <Row className="mt-5">
        <Col md={12}>
          <Card
            className="shadow-sm p-4 w-100"
            style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}
          >
            <Card.Body>
              <h4 className="text-primary">User Activity Hours</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={graphData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis
                    dataKey="day"
                    stroke="#333"
                    label={{
                      value: "Days",
                      position: "insideBottom",
                      dy: 10, 
                      style: { textAnchor: "middle" },
                    }}
                  />
                  <YAxis
                    stroke="#333"
                    label={{
                      value: "Number of Hits",
                      angle: -90,
                      position: "center",
                      dx: -15,
                      style: { textAnchor: "middle" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #ccc",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4A90E2"
                    strokeWidth={3}
                    fill="#4A90E2"
                  />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    orientation="top"
                    stroke="#666"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
