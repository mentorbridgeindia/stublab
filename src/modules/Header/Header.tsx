import { ReactComponent as IconLogo } from "@icons/icon-logo.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";

export const Header = () => {
  const jwtToken = sessionStorage.getItem("accessToken");

  const accountURL=`https://stublab.securosphere.in/profile?token=${jwtToken}`;
 
  return (
    <Navbar fixed="top" className="bg-primary">
      <Container>
        <Navbar.Brand href="/" className="logo-lg">
          <IconLogo />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/application">Applications</Nav.Link>
          <Nav.Link href="/model">Models</Nav.Link>
          <Nav.Link href={accountURL} target="_blank" rel="noopener noreferrer">Account</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
