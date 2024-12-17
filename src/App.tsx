import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ApplicationModal from './Modals/application-modal/ApplicationModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = (data: { name: string; path: string; description: string }) => {
    console.log('Submitted Data:', data);
  };

  return (
    <div className="App d-flex justify-content-center align-items-center min-vh-100">
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
