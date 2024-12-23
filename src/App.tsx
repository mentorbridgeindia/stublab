import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { CreateApplication } from "@modules/Application/CreateApplication";
import { Home } from "@modules/Home";
import { NavBar } from "@modules/NavBar";
import { ApplicationIndexPage } from "@pages/Application/IndexPage";
import { CreateModelPage } from "@pages/Model/CreatePage";
import { ModelIndexPage } from "@pages/Model/IndexPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";


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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/application" element={<ApplicationIndexPage />} />
            <Route path="/model" element={<ModelIndexPage />} />
            <Route path="/model/create" element={<CreateModelPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
      <Button variant="primary" onClick={() => setModalVisible(true)}>
        Open Modal
      </Button>
      <CreateApplication
        show={modalVisible}
        handleClose={handleModalClose}
        handleSubmit={handleModalSubmit}
      />
     
    </div>
  );
};

export default App;
