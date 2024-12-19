import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ApplicationModal from './Modals/application-modal/ApplicationModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { NavBar } from "@modules/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer } from "react-toastify";
import { CreateModelPage } from "./pages/Model/CreateModelPage";


const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = (data: { name: string; path: string; description: string }) => {
    console.log('Submitted Data:', data);
  };

  return (
    <div className="App">
       <ToastContainer position="bottom-left" />
      <NavBar />
      <Container className="well-container">
        <CreateModelPage />
      </Container>
      <Button variant="primary" onClick={() => setModalVisible(true)}>
        Open Modal
      </Button>
      <ApplicationModal
        show={modalVisible}
        handleClose={handleModalClose}
        handleSubmit={handleModalSubmit}
      />
     
    </div>
  );
};

export default App;
