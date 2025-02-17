import { ReactComponent as IconLogo } from "@icons/icon-logo-nav.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { color } from "@uiw/react-codemirror";

export const Header = () => {
  return (
    <Navbar fixed="top">
      <Container>
        <Navbar.Brand href="/" className="logo-lg">
          <IconLogo />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/application">Applications</Nav.Link>
          <Nav.Link href="/model">Models</Nav.Link>
          <Nav.Link>Login</Nav.Link>
          <Nav.Link>Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
