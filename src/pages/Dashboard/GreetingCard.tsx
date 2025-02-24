import React from "react";
import { Card } from "react-bootstrap";
import { ReactComponent as Greetinglogo } from "@icons/icon-greeting.svg";
import "./GreetingCard.scss";

const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) return "Good Morning,";
  else if (hours < 16) return "Good Afternoon,";
  else return "Good Evening,";
};

const GreetingCard: React.FC = () => {
  return (
    <Card className="greeting-card p-4">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="greeting-text">{getGreeting()}</h2>
          <h1 style={{ fontSize: "100px" }}>User!</h1>
          <h4 className="quote">"Welcome to your StubLab's dashboard!"</h4>
        </div>
        <Greetinglogo className="greeting-logo ms-auto" />
      </Card.Body>
    </Card>
  );
};

export default GreetingCard;
