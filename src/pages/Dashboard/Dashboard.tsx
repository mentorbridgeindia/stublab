import React from "react";
import { Container } from "react-bootstrap";
import GreetingCard from "./GreetingCard";
import DataCards from "./DataCards";
import ApiTable from "./ApiTable";
import Charts from "./Charts";


const Dashboard: React.FC = () => {
  return (
    <Container fluid className="dashboard-container">
      <GreetingCard />
      <DataCards />
      <ApiTable />
      <Charts />
    </Container>
  );
};

export default Dashboard;
