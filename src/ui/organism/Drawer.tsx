import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';

export const OffcanvasComponent = ({ buttonLabel, title, children, placement = 'start', buttonVariant = 'opaque' }:any) => {
    const [show, setShow] = useState(false);
  
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    return (
        <> 
        <Button variant={buttonVariant} onClick={handleShow}>
        {buttonLabel}
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {children}
          <Button variant="secondary" onClick={handleClose} className="mt-3">
            Close
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      </>
  );
}

 