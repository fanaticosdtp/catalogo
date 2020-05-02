import React from "react";

// core components
import CatalogNavbar from "components/Navbars/CatalogNavbar.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import CartSection from "../views/cart/CartSection.js"

import { Redirect } from "react-router-dom";

import store from "../redux/store/index.js";

function CartSections(params) {

  if (!params.error && (params.cartItems && params.cartItems.length > 0)) {
    return (
      <>
        <div className="main">
          <CartSection cartItems= {params.cartItems} handleOrderSend={params.handleOrderSend}/>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="main">
        <Redirect to="/index"/>
      </div>
    </>
  );
}

function Cart(props) {
  const [error, setError] = React.useState( false );
  const [redirect, setRedirect] = React.useState( false );
  const [cartItems, setCartItems] = React.useState( store.getState().cartItems );
  const [orderCartItems, setOrderCartItems] = React.useState(  );
  const [orderClient, setOrderClient] = React.useState(  );


  store.subscribe(() => {setCartItems(store.getState().cartItems)})

  function handleOrderSend(cartItems, client){
    setOrderCartItems(cartItems);
    setOrderClient(client);
    setRedirect(true);
  }

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  if(!redirect){

  return (
    <>
      <CatalogNavbar />
      <div className="wrapper">
        <CartSections  error={error} cartItems={cartItems} handleOrderSend={handleOrderSend} />
      <DarkFooter />
      </div>
    </>
  );}
  else{

  return (
    <>
      <Redirect to={{
        pathname: "/order",
        state: {
          cartItems:{orderCartItems}, client:{orderClient}
        }
      }} />
    </>
  );

  }
}

export default Cart;
