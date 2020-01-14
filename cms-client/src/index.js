import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Products from './components/products/products';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Route, Link, Redirect, BrowserRouter as Router, Switch} from 'react-router-dom';
import PageNotFound from './404';
import ProductPage from './components/products/productPage';
import ProductsHier from './components/products/productsHier';

const routing = (
    <Router >
        <Switch>
            <Route exact path = "/" component = {Products} />
            <Route exact path = "/product/:id" component = {ProductPage} />
            <Redirect exact path="/products" to='/' />
            <Route exact path = "/products/*" component = {ProductsHier} />
            <Route component = {PageNotFound} />
        </Switch>
      </Router>
)


//
//
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
