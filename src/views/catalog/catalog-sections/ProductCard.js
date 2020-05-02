import React from "react";
import { Link } from "react-router-dom";

import {
  Button
} from "reactstrap";

function ProductButton(params) {

  if (params.item.Disponible) {

    params.item.linkTo = "/product/" + params.item.Id;

    return (
      <>
      <Link to={params.item.linkTo}>
        <Button className="btn-round" color="info" type="button" size="lg" id={params.item.Id}>
          <i className="now-ui-icons sport_user-run"></i> Pedir
        </Button>
      </Link>
      </>
    )
  }
  return (
    <>
      <Button className="btn-round btn-disabled" color="danger" type="button" size="lg" id={params.item.Id} disabled={true} >
        <i className="now-ui-icons ui-1_simple-remove"></i> Sin Stock
      </Button>
    </>
  );
}

function ProductCard(props) {

  const item = props.product;

  try{
    item.show = require('../../../assets/img/products/' + item.Foto1);
  } catch(e) {
    item.show = require('../../../assets/img/no-disp.jpg');
  }

  return (
    <>
    <div className="col-xs-8 col-sm-6 col-md-6 col-lg-4 col-xl-4">
        <div className="card card-cascade card-ecommerce wider shadow mb-5 " id={item.Id}>
          <img className="card-img-top" src={item.show} alt=""/>
            <div className="card-body card-body-cascade text-center">
                <h4 className="card-title"><strong>{item.Nombre}</strong></h4>
                <p className="price">${item.Precio}</p>
                <ProductButton item = {item}/>
            </div>
        </div>
    </div>
    </>
  );
}

export default ProductCard;
