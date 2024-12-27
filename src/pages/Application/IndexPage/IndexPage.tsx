import { ReactComponent as IconPlus } from "@icons/icon-plus.svg";
import { CreateApplication } from "@modules/Application/CreateApplication";
import { FolderCard, FolderCardType } from "@molecules/FolderCard";
import { useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ApplicationIndexPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const assignType = (count: number): FolderCardType => {
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

    return (Object.keys(typeMap).find((type) => count < typeMap[type]) ??
      "new") as FolderCardType;
  };

  const applications = [
    {
      id: 1,
      name: "Flight Booking System",
      path: "/flight-booking",
      count: 12, // can be from 0 to 39
    },
    {
      id: 2,
      name: "Hotel Reservation System",
      path: "/hotel-reservation",
      count: 8, // can be from 0 to 39
    },
    {
      id: 3,
      name: "Travel Itinerary Planner",
      path: "/itinerary-planner",
      count: 25, // can be from 0 to 39
    },
    {
      id: 4,
      name: "Tour Package Explorer",
      path: "/tour-packages",
      count: 18, // can be from 0 to 39
    },
    {
      id: 5,
      name: "Car Rental Service",
      path: "/car-rental",
      count: 5, // can be from 0 to 39
    },
    {
      id: 6,
      name: "Travel Insurance Calculator",
      path: "/insurance-calculator",
      count: 31, // can be from 0 to 39
    },
    {
      id: 7,
      name: "Local Attraction Finder",
      path: "/attractions-finder",
      count: 14, // can be from 0 to 39
    },
    {
      id: 8,
      name: "Travel Budget Estimator",
      path: "/budget-estimator",
      count: 21, // can be from 0 to 39
    },
    {
      id: 9,
      name: "Currency Exchange Rates",
      path: "/currency-rates",
      count: 9, // can be from 0 to 39
    },
    {
      id: 10,
      name: "Real-Time Weather Updates",
      path: "/weather-updates",
      count: 27, // can be from 0 to 39
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(true)}>
          <IconPlus />
          Create Application
        </Button>
      </div>
      <Row className="center mt-3">
        {applications.map((application) => (
          <Col
            sm={12}
            md={6}
            lg={3}
            className="mb-3 center"
            key={application.id}
          >
            <FolderCard
              type={assignType(application.count)}
              label={application.name}
              count={application.count}
              subLabel={application.path}
            />
          </Col>
        ))}
      </Row>
      <div className="mt-3">
        <Card>
          <Card.Body>
            <Table responsive borderless>
              <thead className="bg-secondary">
                <tr>
                  <th className="text-white text-start">Name</th>
                  <th className="text-white">Path</th>
                  <th className="text-white" colSpan={3}>
                    API Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="text-start">
                      <Link to={application.path}>{application.name}</Link>
                    </td>
                    <td>{application.path}</td>
                    <td colSpan={3}>{application.count}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
