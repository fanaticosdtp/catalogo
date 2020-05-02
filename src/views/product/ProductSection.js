import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Container,
  Button,
  Modal,
  ModalBody
} from "reactstrap";

// core components
import store from "../../redux/store/index.js";

import { addProduct } from "../../redux/actions/index.js";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import "../../assets/css/products-fanaticos.css";

function SizeModal(params){

  const [modal, setModal] = React.useState(false);

  if(params.sizePic){
    return(
    <span className="mr-1 texto-encima centrado">
      <Button id="info-talles" color="default" onClick={() => setModal(true)}>
        Info de talles
      </Button>
      <Modal
        modalClassName="modal-mini modal-info"
        id="size-modal-dialog"
        toggle={() => setModal(false)}
        isOpen={modal}>
        <ModalBody>
          <img className="card-img img-body" src={params.fotoTalle} alt=""/>
        </ModalBody>
        <div className="modal-footer">
          <Button
            className="btn-neutral"
            color="link"
            type="button"
            onClick={() => setModal(false)}
          >
            Cerrar
          </Button>
        </div>
      </Modal>
      </span>
    );
  } else {
    return(
      <></>
    );
  }
}

function ProductButton(params) {
  if(params.active){
    return(
    <Link onClick={params.handleClick} to="/cart">
      <Button className="btn-round cart-btn" color="info" type="button" size="lg">
        <i className="now-ui-icons shopping_cart-simple"></i> Agregar al carrito
      </Button>
    </Link>);
  } else {
    return(
    <Link to="/" onClick={e => e.preventDefault()}>
      <Button className="btn-round cart-btn btn-disabled" type="button" size="lg" disabled>
        <i className="now-ui-icons shopping_cart-simple"></i> Agregar al carrito
      </Button>
    </Link>
    )
  }
}

function ProductSection(props) {
  const product = props.product;
  const [active, setActive] = React.useState(false);
  const [size, setSize] = React.useState();
  let sizePic = false;

  function handleClick(e) {

    product.IdStock = product.IdStock.find( (stock) => stock.IdTalle.Id == size );
    product.Cantidad = 1;
    store.dispatch(addProduct(product));
  }

  function handleChange(e) {
    setActive(true);
    setSize(e.target.parentElement.parentElement.parentElement.id);
  }

  try{
    product.show = require('../../assets/img/products/' + product.Foto1);
  } catch(e) {
    product.show = require('../../assets/img/no-disp.jpg');
  }

  try{
    product.showFotoTalle = require('../../assets/img/sizes/' + product.IdCat.FotoTalles);
    sizePic = true;
  } catch(e) {
    sizePic = false;
  }

  return (
    <>
    <div className="section section-products text-center" id="product">
      <Container>
          <div className="card card-cascade card-ecommerce wider shadow mb-5 product-card" id={product.Id}>
            <div className= "row">
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 contenedor">
                <img className="card-img img-body" src={product.show} alt=""/>
                <span className="mr-1 badge badge-info texto-encima">${product.Precio}</span>
                <SizeModal sizePic={sizePic} fotoTalle={product.showFotoTalle} />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 product-card-body card-body-cascade text-center">
                  <h4 className="card-title product-title"><strong>{product.Nombre}</strong></h4>
                  <h5 className="card-title"><strong>{product.Descripcion}</strong></h5>
                  <FormControl className="card-title row" id="talles" component="fieldset">
                    <RadioGroup row aria-label="position" name="position">
                      {product.IdStock.map(item => {
                          if(item.Cantidad > 0){
                            return (
                              <FormControlLabel
                                key={item.IdTalle.Id}
                                id={item.IdTalle.Id}
                                className="talle-check"
                                value={item.IdTalle.Nombre + "t"}
                                control={<Radio color="primary" />}
                                label={item.IdTalle.Nombre}
                                labelPlacement="top"
                                onChange={handleChange}
                              />
                            );
                          } else {
                            return (
                              <FormControlLabel
                                key={item.IdTalle.Id}
                                disabled
                                id={item.IdTalle.Id}
                                className="talle-check"
                                value={item.IdTalle.Nombre + "t"}
                                control={<Radio color="primary" />}
                                label={item.IdTalle.Nombre}
                                labelPlacement="top"
                              />
                            );
                          }
                      })}
                    </RadioGroup>
                  </FormControl>
                  <ProductButton active = {active} handleClick={handleClick} />
              </div>
            </div>
          </div>
      </Container>
    </div>
    </>
  );
}

export default ProductSection;
