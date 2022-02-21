import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
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

            {/* bring to page of products by category */}
            <Route path='/products/:category' element={<ProductList/>} />

            {/* search for an individual product */}
            {/* <Route path='/product/:id' element={<Product/>} /> */}
              
         
            </Routes>
        </Router>
    );
};

export default App;