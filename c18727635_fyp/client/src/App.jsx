import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import axios from "axios";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const App = () => {
    return (

        // Using react router dom
        <Router>
            <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/register' element={<Registration/>} />

            {/* bring to page of products by category */}
            <Route path='/products/:category' element={<ProductList/>} />

            {/* search for an individual product */}
            {/* <Route path='/product/:id' element={<Product/>} /> */}
              
         
            </Routes>
        </Router>
    );
};

export default App;