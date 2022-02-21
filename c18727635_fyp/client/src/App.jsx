import Home from "./pages/Home";
import ProductList from "./pages/ProductList";

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
            <Route path='/' element={<Home/>} />
            <Route path='/products' element={<ProductList/>} />
              
                {/* </Route> */}
                {/* <Route path = '/products'>
                    <ProductList/>
                </Route> */}
            </Routes>
        </Router>
    );
};

export default App;