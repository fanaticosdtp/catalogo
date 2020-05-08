import React from "react";

import { Container, Button } from "reactstrap";

import store from "../../redux/store/index.js";
import { deleteProduct } from "../../redux/actions/index.js"

import { Link } from "react-router-dom";

import CartFormModal from "./cart-sections/CartFormModal.js"

import "../../assets/css/cart-fanaticos.css";

function CartSection(props) {

  let total = 0;

  const cartItems = props.cartItems;
  const handleOrderSend = props.handleOrderSend

  function handleTrash(e){
    store.dispatch( deleteProduct(e.target.parentElement.id) );
  }

  function handleSend(name, surname, tel, address, email, contactTo){

    let client = {};
    client.name = name;
    client.surname = surname;
    client.tel = tel;
    client.address = address;
    client.email = email;
    client.contactTo = contactTo;

    handleOrderSend(cartItems, client)

  }

  return(
    <div className="section section-products text-center" id="cart">
      <Container>
          <div className="card card-cascade wider shadow mb-5 cart-card" id="cart-card">
            <div className= "row cart-table">
              {cartItems.map( (item) => {
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
                      <div className="align-middle col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2"><a id={item.IdCart} href="#" className="text-dark" onClick={handleTrash}><i className="fa fa-trash"></i></a></div>
                    </div>
                  </div>
                )
              })}
                <div className="row cart-row">
                  <div className="item-th col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id="cart-total-card">
                    <div className="row">
                      <div className="p-2">
                        <div className="ml-3 d-inline-block align-middle">
                          <h2 className="mb-0 text-dark d-inline-block align-middle"><strong>Total: </strong>${total} + envío</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CartFormModal handleSend={handleSend} />
                    <div className="ml-3 d-inline-block align-middle">
                      <Link id="teams-filter" color="default" className="btn-link btn btn-info" to="/index">
                        <i className="now-ui-icons ui-1_zoom-bold"></i> Seguir buscando
                      </Link>
                    </div>
                </div>
            </div>
          </div>
      </Container>
    </div>
  )


}

export default CartSection;
