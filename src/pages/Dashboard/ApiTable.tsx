import React from "react";
import { Table } from "react-bootstrap";
import "./ApiTable.scss";

const apiData = [
  { projectName: "User Authentication API", statusCode: "200 OK", statusClass: "status-200", hits: "12.5K" },
  { projectName: "Payment Gateway API", statusCode: "400 Bad Request", statusClass: "status-400", hits: "8.3K" },
  { projectName: "Order Management API", statusCode: "500 Internal Server Error", statusClass: "status-500", hits: "5.9K" },
  { projectName: "Product Catalog API", statusCode: "403 Forbidden", statusClass: "status-403", hits: "7.2K" },
];

const ApiTable: React.FC = () => {
  return (
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
                <span className={`status-badge ${api.statusClass}`}>{api.statusCode}</span>
              </td>
              <td>{api.hits}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApiTable;
