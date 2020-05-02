import React from "react";

// core components
import CatalogNavbar from "components/Navbars/CatalogNavbar.js";
import CartNotification from "components/CartNotification.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import CatalogSection from "./catalog/CatalogSection.js";
import ErrorPage from "./ErrorPage.js";

import Loader from 'react-loader-spinner';

import { SERVER } from "../constants/index.js";

function CatalogSections(params) {
  if (!params.error) {
    return (
      <>
        <CartNotification />
        <div className="main">
          <CatalogSection products = {params.products} teams={params.teams} />
        </div>
      </>
    )
  } else {
  return (
    <>
      <div className="main">
        <ErrorPage />
      </div>
    </>
  );
  }
}

function Catalog(props) {
  const [products, setProducts] = React.useState( [] );
  const [teams, setTeams] = React.useState( [] );
  const [category] = React.useState( props.match.params.category );
  const [error, setError] = React.useState( false );
  const [spinner1, setSpinner1] = React.useState( true );
  const [spinner2, setSpinner2] = React.useState( true );

  if (products && products.length <= 0){
    fetch(SERVER + 'catalog/products/' + category)
      .then(
        (res) => {
          if(!res.ok){ throw res; }
          return res.json();},
        (error) => {
          setError(true);
          setSpinner1(false);
          throw error;
        })
        .then((data) => {
          if(data && data.length <= 0){
            setError(true);
            setSpinner1(false);
          } else{
            setError(false);
            setSpinner1(false);
            setProducts(data);
          }
        })
        .catch(
          (e) => {
            setError(true);
            setSpinner1(false);
            console.log(e)});
  }

  if (teams && teams.length <= 0){
    fetch(SERVER + 'catalog/teams/')
      .then(
        (res) => {
          if(!res.ok){ throw res; }
          return res.json();},
        (error) => {
          setSpinner2(false);
          throw error;
        })
        .then((data) => {
          setSpinner2(false);
            setTeams(data);
        })
        .catch(
          (e) => {
            setSpinner2(false);
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

  if(spinner1 && spinner2){
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
        <CatalogSections  error={error} products = {products} teams={teams} />
      <DarkFooter />
      </div>
    </>
  );
}}

export default Catalog;
