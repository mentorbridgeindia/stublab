import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import React from 'react';

function NavBar() {
  return (
    <>
      <Navbar fixed="top">
        <Container>
          <Navbar.Brand >Stublab</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link >Login</Nav.Link>
            <Nav.Link >Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;