import { Header } from "@/modules/Header";
import { Home } from "@modules/Home";
import { ApplicationIndexPage } from "@pages/Application/IndexPage";
import { CreateModelPage } from "@pages/Model/CreatePage";
import { ModelIndexPage } from "@pages/Model/IndexPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import CustomApi from "./page/CustomApi"; 
import "bootstrap/dist/css/bootstrap.min.css";
import OrgPage from "./page/CustomApi";


function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-left" />
      <Header />
    
      <CustomApi/>
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
    </div>
  );
}

export default App;
