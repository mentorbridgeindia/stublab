import { Header } from "@modules/Header";
import { Home } from "@modules/Home";
import { ApplicationIndexPage } from "@pages/Application/IndexPage";
import { ApplicationViewPage } from "@pages/Application/ViewPage";
import { AuthSuccessPage } from "@pages/Auth/AuthSuccess";
import { CreateModelPage } from "@pages/Model/CreatePage";
import { ModelIndexPage } from "@pages/Model/IndexPage";
import { CreateOrganizationPage } from "@pages/Organization/CreatePage/CreateOrganizationPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import "./global.scss";
import ErrorPage from "@pages/Error/ErrorPage";
import { LoginPage } from "@pages/Login/Login";
import { PrivateRoute } from "./PrivateRoute";

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
              <Route path="/" element={<AuthSuccessPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/success" element={<AuthSuccessPage />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/organization/create"
                element={
                    <CreateOrganizationPage />
                }
              />
              <Route
                path="/application"
                element={
                  <PrivateRoute>
                    <ApplicationIndexPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/model"
                element={
                  <PrivateRoute>
                    <ModelIndexPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/model/create"
                element={
                  <PrivateRoute>
                    <CreateModelPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/model/edit/:id"
                element={
                  <PrivateRoute>
                    <CreateModelPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/application/:id"
                element={
                  <PrivateRoute>
                    <ApplicationViewPage />
                  </PrivateRoute>
                }
              />
              <Route path="/error/:message" element={<ErrorPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Container>
    </div>
  );
};

export default App;
