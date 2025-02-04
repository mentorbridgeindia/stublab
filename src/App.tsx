import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Form from './components/Form';
import NavBar from './components/navbar';
import ModelForm from './pages/ModelForm/ModelForm';
import OpenAI from './pages/openai';

function App() {
  return (
    <div className="App">
     {/* <NavBar />
      <Form />
      <ModelForm/>
      <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button> */}
     <OpenAI />
    </div>
  );
}

export default App;