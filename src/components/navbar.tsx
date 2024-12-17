import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import { OffcanvasComponent } from "@/ui/organism/Drawer";
import { FaEllipsisV } from 'react-icons/fa';

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
          <OffcanvasComponent 
            buttonLabel=  <FaEllipsisV style={{color: "#e5e7eb",}} />
            title="Stublab's offcanvas"
            placement="end"
          >
            <p>StubLab is an innovative stub server application designed to empower development teams to configure, test, and iterate on APIs quickly—without relying on a traditional database. It provides a robust platform for developers to streamline their API workflows, making the process of building and testing APIs more efficient and hassle-free. </p>
          </OffcanvasComponent>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;