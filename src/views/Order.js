import React from "react";
import ReactGA from 'react-ga';

import { Container } from "reactstrap";

import CatalogNavbar from "../components/Navbars/CatalogNavbar.js"
import DarkFooter from "../components/Footers/DarkFooter.js"
import SentNotification from "../components/SentNotification.js"

import { clearStore } from "../redux/actions/index.js"

import { SERVER } from "../constants/index.js";

import store from "../redux/store/index.js";

import Loader from 'react-loader-spinner';

function Order(props) {

  const [error, setError] = React.useState();
  const [spinner, setSpinner] = React.useState(true);
  const [requested, setRequested] = React.useState(false);

  let total = 0;
  const iconClass = error?"now-ui-icons ui-1_simple-remove":"now-ui-icons ui-1_check";
  const [client] = React.useState(props.location.state.client);
  const [cartItems] = React.useState(props.location.state.cartItems.orderCartItems);

  function sendMetrics(){

  cartItems.forEach( (item) => {

    for (var i = 0; i < item.Cantidad; i++) {
      ReactGA.event({
        category: "Products",
        action: "Solicito producto",
        label: item.Id + " " + item.Nombre + " " + item.IdStock.IdTalle.Nombre
       });
    }
  })}

  if(!requested){

    setRequested(true);
    let body = {};
    body.client = client.orderClient;
    body.items = cartItems;

    body = JSON.stringify(body);

    fetch(SERVER + 'catalog/order', {
      method: 'post',
      body: body,
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(
        (res) => {
          if(!res.ok){
            setSpinner(false);
            setError(true);
          } else{
            store.dispatch(clearStore());
            setSpinner(false);
            setError(false);
            sendMetrics();
          }},
        (error) => {
          setSpinner(false);
          setError(true);
          throw error;
        })
        .catch(
          (e) => {
            setSpinner(false);
            setError(true);
            console.log(e)});
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

  if(spinner){
    return(
      <>
        <CatalogNavbar />
        <div className="wrapper">
          <div className="main spinner">
          <Loader
             type="Circles"
             color="#2CA8FF"
             height={250}
             width={250}
          />
          </div>
        <DarkFooter />
        </div>
      </>
    );
  } else {

  return(
    <>
      <CatalogNavbar />
      <div className="wrapper">
        <SentNotification error= {error} />
        <div className="section section-products text-center" id="sent">
          <Container>
              <div className="card card-cascade wider shadow mb-5 cart-card" id="cart-card">
                <div className= "row cart-table">
                  { cartItems.map( (item) => {
                    total = total + (item.Cantidad*item.Precio);
                    return(
                      <div key={item.IdCart} className="row cart-row">
                        <div className="item-th col-xs-11 col-sm-6 col-md-5 col-lg-5 col-xl-5" id="cart-product-card">
                          <div className="row">
                            <div className="p-2">
                              <img src={item.show} alt="" width="70" className="img-fluid rounded shadow-sm pic-70"/>
                              <div className="ml-3 d-inline-block align-middle text-align-left">
                                <h5 className="mb-0 text-dark d-inline-block align-middle">{item.Nombre}</h5><div className="text-muted font-weight-normal font-italic d-block text-align-left">Talle: {item.IdStock.IdTalle.Nombre}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row col-xs-12 col-sm-5 col-md-5 col-lg-5 col-xl-5 second-row">
                          <div className="align-middle col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><strong>{item.Cantidad} x ${item.Precio}</strong></div>
                          <div className="align-middle col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><strong>${item.Cantidad*item.Precio}</strong></div>
                          <div className="align-middle col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2"><i className={iconClass}></i></div>
                        </div>
                      </div>
                    )
                  })}
                    <div className="row cart-row">
                      <div className="item-th col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id="cart-total-card">
                        <div className="row">
                          <div className="p-2">
                            <div className="ml-3 d-inline-block align-middle">
                              <h2 className="mb-0 text-dark d-inline-block align-middle"><strong>Total: </strong>${total}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
          </Container>
        </div>
      <DarkFooter />
      </div>
    </>
  )

}
}

export default Order;
