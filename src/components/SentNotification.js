import React from "react";

// reactstrap components
import { Alert, Container, Navbar } from "reactstrap";

function SentContainer(props) {

  if (!props.error) {
    return (
        <Navbar className={"fixed-top cart-navbar"} expand="lg" color="success" >
          <Alert color="success" className="cart-alert">
          <Container id="non-empty-cart">
            <div className="alert-icon">
              <i className="now-ui-icons travel_info"></i>
            </div>
            <strong>Listo!</strong> Tu pedido fue recibido. En breve te contactaremos.
          </Container>
      </Alert>
    </Navbar>)
  }
  return (
      <Navbar className={"fixed-top cart-navbar"} expand="lg" color="danger" >
        <Alert color="danger" className="cart-alert">
          <Container id="empty-cart">
            <div className="alert-icon">
              <i className="now-ui-icons travel_info"></i>
            </div>
            <strong>Error!</strong> Tuvimos un problema para procesar tu pedido. Por favor reintenta.
          </Container>
      </Alert>
    </Navbar>
  );
}

function SentNotification(props) {

  const error = props.error;

  return (
    <>
      <SentContainer error={error} />
    </>
  );
}

export default SentNotification;
