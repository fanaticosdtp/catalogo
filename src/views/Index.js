import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// sections for this page
import CarouselSection from "./index/CarouselSection.js";
import CategoriesSection from "./index/CategoriesSection.js";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import CatalogNavbar from "components/Navbars/CatalogNavbar.js";
import CartNotification from "components/CartNotification.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import ErrorPage from "./ErrorPage.js";

import Loader from 'react-loader-spinner';

import { SERVER } from "../constants/index.js";

function IndexSections(params) {
  if (!params.error) {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <CartNotification />
          <div className="main">
            <CarouselSection categories={params.categories} />
            <CategoriesSection categories={params.categories} />
          </div>
        <DarkFooter />
        </div>
      </>
    )
  }
  return (
    <>
      <CatalogNavbar />
      <div className="wrapper">
      <div className="main">
        <ErrorPage />
      </div>
    <DarkFooter />
    </div>
    </>
  );
}

function Index() {
  const [categories, setCategories] = React.useState( [] );
  const [error, setError] = React.useState( false );
  const [spinner, setSpinner] = React.useState( true );

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    if (categories && categories.length <= 0){
      fetch(SERVER + 'catalog/categories')
        .then(
          (res) => {
            if(!res.ok){ throw res; }
            return res.json();},
          (error) => {
            setError(true);
            setSpinner(false);
            throw error;
          })
          .then((data) => {
            setError(false);
            setCategories(data);
            setSpinner(false);
          })
          .catch(
            (e) => {
              setError(true);
              setSpinner(false);
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
        <IndexNavbar />
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
      <IndexSections error={error} categories= {categories}/>
    </>
  );}
}

export default Index;
