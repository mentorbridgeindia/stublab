import './App.css';
import ModelForm from './pages/ModelForm/ModelForm';
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
