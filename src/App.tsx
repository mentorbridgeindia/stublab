import { NavBar } from "@modules/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import { CreateModelPage } from "./pages/Model/CreateModelPage";

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-left" />
      <NavBar />
      <Container className="well-container">
        <CreateModelPage />
      </Container>
    </div>
  );
}

export default App;
