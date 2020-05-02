import React from "react";

// core components
import CatalogNavbar from "components/Navbars/CatalogNavbar.js";
import CartNotification from "components/CartNotification.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import ProductSection from "./product/ProductSection.js";
import ErrorPage from "./ErrorPage.js";

import Loader from 'react-loader-spinner';

import { SERVER } from "../constants/index.js";

function ProductSections(params) {
  if (params.error) {
    return (
      <>
        <div className="main">
          <ErrorPage />
        </div>
      </>
    );
  }
  if (!params.product){
    return (
      <>
        <CartNotification />
        <div className="main">
          <ErrorPage />
        </div>
      </>
    )
  }
  return (
    <>
      <CartNotification />
      <div className="main">
        <ProductSection product = {params.product} />
      </div>
    </>
  )
}

function Product(props) {
  const [product, setProduct] = React.useState(  );
  const [productId] = React.useState( props.match.params.product );
  const [error, setError] = React.useState( false );
  const [spinner, setSpinner] = React.useState( true );

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    if (!product){
      fetch(SERVER + 'catalog/product/' + productId)
        .then(
          (res) => {
            if(!res.ok){ throw res; }
            return res.json();},
          (error) => {
            setSpinner(false);
            setError(true);
            throw error;
          })
          .then((data) => {
            if(data && data.length <= 0){
              setSpinner(false);
              setError(true);
            } else{
              setSpinner(false);
              setError(false);
              setProduct(data);
            }
          })
          .catch(
            (e) => {
              setSpinner(false);
              setError(true);
              console.log(e)});
    }

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
  return (
    <>
      <CatalogNavbar />
      <div className="wrapper">
        <ProductSections  error={error} product = {product} />
      <DarkFooter />
      </div>
    </>
  );
}}

export default Product;
