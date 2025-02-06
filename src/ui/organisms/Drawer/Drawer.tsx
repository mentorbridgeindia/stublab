import { Offcanvas } from "react-bootstrap";
import { IDrawer } from "./Drawer.types";
import "./Drawer.scss";

export const Drawer = (props: IDrawer) => {
  return (
    <Offcanvas
      show={props.show}
      onHide={props.onHide}
      placement={"end"}
      className="drawer-lg"
      backdrop={false}
    >
      <Offcanvas.Header closeButton className="drawer-header">
        <Offcanvas.Title>{props.title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{props.children}</Offcanvas.Body>
    </Offcanvas>
  );
};
