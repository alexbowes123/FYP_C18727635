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

import {useState} from "react";
import { UserContext } from "./userContext";

const App = () => {

    const [user, setUser] = useState({
        accessToken: "",
        refreshToken: ""
    })
    
    return (

        // Using react router dom
        <Router>
            <UserContext.Provider value = {{user,setUser}}>
            <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/register' element={<Registration/>} />

            {/* bring to page of products by category */}
            <Route path='/products/:category' element={<ProductList/>} />

            {/* search for an individual product */}
            {/* <Route path='/product/:id' element={<Product/>} /> */}
            </Routes>
            </UserContext.Provider>
        </Router>
    );
};

export default App;