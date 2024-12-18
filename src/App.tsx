import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMediaQuery } from 'react-responsive';
import React from 'react';
import Form from './components/Form';
import NavBar from './components/navbar';
import ModelForm from './pages/ModelForm/ModelForm';
import ModelFormMobile from './pages/ModelForm/ModelFormMobile';

function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div className="App">
     <NavBar />
       <Form />
       {isMobile ? <ModelFormMobile /> : <ModelForm />}
      <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>
    
    </div>
  );
}

export default App;