import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Form from './components/Form';
import NavBar from './components/navbar';

function App() {
  return (
    <div className="App">
     <NavBar />
      <Form />
      <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>
    
    </div>
  );
}

export default App;