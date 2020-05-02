/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ReactGA from 'react-ga';

// fonts for this project
import 'assets/fonts/sf-sports-night.ttf'
// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
import "assets/css/fanaticos.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// pages for this kit
import Index from "views/Index.js";
import Catalog from "views/Catalog.js";
import Product from "views/Product.js";
import Cart from "views/Cart.js";
import Order from "views/Order.js";
import store from "redux/store/index.js";

ReactGA.initialize('UA-165322671-1');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/catalogo">
      <Switch>
          <Route path="/index" render={props => <Index {...props} />} />
          <Route path="/catalog/:category" render={props => <Catalog {...props} />} />
          <Route path="/product/:product" render={props => <Product {...props} />} />
          <Route path="/cart" render={props => <Cart {...props} />} />
          <Route path="/order" render={props => <Order {...props} />} />
          <Redirect to="/index" />
          <Redirect from="/" to="/index" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
