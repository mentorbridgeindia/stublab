import { Offcanvas } from "react-bootstrap";
import { IDrawer } from "./Drawer.types";

export const Drawer = (props: IDrawer) => {
  return (
    <Offcanvas show={props.show} onHide={props.onHide} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{props.title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{props.children}</Offcanvas.Body>
    </Offcanvas>
  );
};
