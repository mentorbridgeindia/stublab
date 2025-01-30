import { ReactComponent as IconPlus } from "@icons/icon-folder-plus.svg";
import { CreateApplication } from "@modules/Application/CreateApplication";
import { FolderCard, FolderCardType } from "@molecules/FolderCard";
import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

export const ApplicationIndexPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const assignType = (apiCount: number): FolderCardType => {
    const typeMap: Record<string, number> = {
      danger: 0,
      primary: 5,
      secondary: 10,
      warning: 15,
      info: 20,
      light: 25,
      dark: 30,
      success: 35,
      new: 36,
    };

    return (Object.keys(typeMap).find((type) => apiCount < typeMap[type]) ??
      "new") as FolderCardType;
  };

  const applications = [
    {
      id: 1,
      name: "Flight Booking System",
      path: "/flight-booking",
      apiCount: 12, // can be from 0 to 39
    },
    {
      id: 2,
      name: "Hotel Reservation System",
      path: "/hotel-reservation",
      apiCount: 8, // can be from 0 to 39
    },
    {
      id: 3,
      name: "Travel Itinerary Planner",
      path: "/itinerary-planner",
      apiCount: 25, // can be from 0 to 39
    },
    {
      id: 4,
      name: "Tour Package Explorer",
      path: "/tour-packages",
      apiCount: 18, // can be from 0 to 39
    },
    {
      id: 5,
      name: "Car Rental Service",
      path: "/car-rental",
      apiCount: 5, // can be from 0 to 39
    },
    {
      id: 6,
      name: "Travel Insurance Calculator",
      path: "/insurance-calculator",
      apiCount: 31, // can be from 0 to 39
    },
    {
      id: 7,
      name: "Local Attraction Finder",
      path: "/attractions-finder",
      apiCount: 14, // can be from 0 to 39
    },
    {
      id: 8,
      name: "Travel Budget Estimator",
      path: "/budget-estimator",
      apiCount: 21, // can be from 0 to 39
    },
    {
      id: 9,
      name: "Currency Exchange Rates",
      path: "/currency-rates",
      apiCount: 9, // can be from 0 to 39
    },
    {
      id: 10,
      name: "Real-Time Weather Updates",
      path: "/weather-updates",
      apiCount: 27, // can be from 0 to 39
    },
  ];

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(true)}>
          <IconPlus />
          Create Application
        </Button>
      </div>

      <div className="mt-3">
        <Card>
          <Card.Body>
            <Row>
              {applications.map((application) => (
                <Col
                  sm={12}
                  md={6}
                  lg={3}
                  className="mb-3 center"
                  key={application.id}
                >
                  <FolderCard
                    type={assignType(application.apiCount)}
                    label={application.name}
                    count={application.apiCount}
                    subLabel={application.path}
                    link={`/application/${application.id}`}
                  />
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </div>
      <CreateApplication
        show={show}
        handleClose={handleClose}
        handleSubmit={(d) => {
          console.log(d);
        }}
      />
    </div>
  );
};
