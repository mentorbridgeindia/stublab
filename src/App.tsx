import { Header } from "@/modules/Header";
import { Home } from "@modules/Home";
import { ApplicationIndexPage } from "@pages/Application/IndexPage";
import { CreateModelPage } from "@pages/Model/CreatePage";
import { ModelIndexPage } from "@pages/Model/IndexPage";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <ToastContainer position="bottom-left" />
      <Header />
      <Container className="well-container">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/application" element={<ApplicationIndexPage />} />
              <Route path="/model" element={<ModelIndexPage />} />
              <Route path="/model/create" element={<CreateModelPage />} />
              <Route path="/model/edit/:id" element={<CreateModelPage />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Container>
    </div>
  );
};

export default App;
