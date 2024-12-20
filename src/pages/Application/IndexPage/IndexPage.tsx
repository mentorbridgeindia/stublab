import { ReactComponent as IconPlus } from "@icons/icon-plus.svg";
import { CreateApplication } from "@modules/Application/CreateApplication";
import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ApplicationIndexPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(true)}>
          <IconPlus />
          Create Application
        </Button>
      </div>
      <div className="mt-3">
        <Card>
          <Card.Body>
            <Table responsive borderless>
              <thead className="bg-secondary">
                <tr>
                  <th className="text-white text-start">Name</th>
                  <th className="text-white">Path</th>
                  <th className="text-white" colSpan={3}>
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-start">
                    <Link to="/application/1">Application 1</Link>
                  </td>
                  <td>/app-1</td>
                  <td colSpan={3}>Description 1</td>
                </tr>
                <tr>
                  <td className="text-start">
                    <Link to="/application/2">Application 2</Link>
                  </td>
                  <td>/app-2</td>
                  <td colSpan={3}>Description 2</td>
                </tr>
                <tr>
                  <td className="text-start">
                    <Link to="/application/3">Application 3</Link>
                  </td>
                  <td>/app-3</td>
                  <td colSpan={3}>Description 3</td>
                </tr>
                <tr>
                  <td className="text-start">
                    <Link to="/application/4">Application 4</Link>
                  </td>
                  <td>/app-4</td>
                  <td colSpan={3}>Description 4</td>
                </tr>
                <tr>
                  <td className="text-start">
                    <Link to="/application/5">Application 5</Link>
                  </td>
                  <td>/app-5</td>
                  <td colSpan={3}>Description 5</td>
                </tr>
                <tr>
                  <td className="text-start">
                    <Link to="/application/6">Application 6</Link>
                  </td>
                  <td>/app-6</td>
                  <td colSpan={3}>Description 6</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
      <CreateApplication
        show={show}
        handleClose={handleClose}
        handleSubmit={() => {}}
      />
    </div>
  );
};
