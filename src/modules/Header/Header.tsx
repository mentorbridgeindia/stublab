import { ReactComponent as IconLogo } from "@icons/icon-logo-nav.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";

export const Header = () => {
  const jwtToken = localStorage.getItem("accessToken");
  function getAccountUrl() {
    const accountURL = `https://stublab.securosphere.in/profile?token=${jwtToken}`;
    return accountURL;
  }

  if (!jwtToken) {
    return null;
  }

  return (
    <Navbar fixed="top" expand="lg">
      <Container>
        <Navbar.Brand href="/home" className="logo-lg">
          <IconLogo />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/application">Applications</Nav.Link>
            <Nav.Link href="/model">Models</Nav.Link>
            <Nav.Link href={getAccountUrl()}>Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
