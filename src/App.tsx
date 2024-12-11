import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModelForm from './pages/model-form/modelform';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<ModelForm />} />
        
      </Routes>
    </div>
  </Router>
  );
}

export default App;
