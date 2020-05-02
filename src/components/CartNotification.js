import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Alert, Container, Navbar } from "reactstrap";

// core components
import store from "../redux/store/index.js";

function CartContainer(items) {

  if (items.items && items.items.length > 0) {
    return (
        <Container id="non-empty-cart">
          <div className="alert-icon">
            <i className="now-ui-icons travel_info"></i>
          </div>
          <strong>Aviso!</strong> Tus productos estan esperando.
          <Link to="/cart">
            <button
              type="button"
              className="close"
            >
              <span aria-hidden="true">
                <i className="now-ui-icons shopping_cart-simple"></i>
              </span>
            </button>
          </Link>
        </Container>)
  }
  return (
        <Container id="empty-cart">
          <div className="alert-icon">
            <i className="now-ui-icons travel_info"></i>
          </div>
          <strong>Aviso!</strong> Aún no seleccionaste productos.
        </Container>
  );
}

function CartNotification() {

  const [cartItems, setCartItems] = React.useState( store.getState().cartItems );

  return (
    <>
      <Navbar className={"fixed-top cart-navbar"} expand="lg" color="info" >
        <Alert color="info" className="cart-alert">
            <CartContainer items={cartItems} />
        </Alert>
      </Navbar>
    </>
  );
}

export default CartNotification;
