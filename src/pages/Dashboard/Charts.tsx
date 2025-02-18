import React from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label,
  PieChart, Pie, Cell
} from "recharts";
import "./Charts.scss";

const graphData = [
  { day: "Sunday", time: "12-1", value: 30 },
  { day: "Monday", time: "1-2", value: 20 },
  { day: "Tuesday", time: "2-3", value: 25 },
  { day: "Wednesday", time: "3-4", value: 80 },
  { day: "Thursday", time: "4-5", value: 90 },
  { day: "Friday", time: "5-6", value: 70 },
  { day: "Saturday", time: "6-7", value: 95 },
];

const Piechartdata = [
  { name: "200", value: 32 },
  { name: "400", value: 21 },
  { name: "403", value: 15 },
  { name: "404", value: 18 },
  { name: "500", value: 5 },
];

const COLORS = ["#34A853", "#E74C3C", "#4285f4", "#8884d8", "#E67E22", "#F1C40F"];

const Charts: React.FC = () => {
  return (
    <Row className="mt-4">
      <Col md={9}>
        <Card className="graph p-4 w-100">
          <Card.Body>
            <h4>User Activity Hours</h4>
            <ResponsiveContainer width="100%" height={450}>
              <LineChart data={graphData} margin={{ top: 20, right: 30, left: 12, bottom: 15 }}>
                <CartesianGrid />
                <XAxis dataKey="day" stroke="#333">
                   <Label value="Days" position="insideBottom" textLength={100} offset={-11} />
                </XAxis>
                <YAxis stroke="#333">
                   <Label value="Number of Hits" angle={-90} position="insideBottomLeft" textLength={360} offset={0.01} />
                </YAxis>
                <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #ccc" }} />
                <Line type="monotone" dataKey="value" stroke="#4A90E2" strokeWidth={3} fill="#4A90E2" />
              </LineChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
      <Card className="piechart p-3 w-100">
        <h5 className="text-center">Most Used Status Code</h5>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={Piechartdata}
              innerRadius={60}
              outerRadius={80} 
              paddingAngle={5}
              dataKey="value"
            >
              {Piechartdata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-3">
          <table className="w-100">
            <tbody>
              {Piechartdata.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        backgroundColor: COLORS[index],
                        borderRadius: "50%",
                      }}
                    ></span>
                  </td>
                  <td className="px-2">{item.name}</td>
                  <td>{item.value}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Col>
    </Row>
  );
};

export default Charts;
