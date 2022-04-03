import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Checkout from "./pages/Checkout";
import Logout from "./pages/Logout";
import Purchase from "./pages/Purchase";
import Order from "./pages/Order";
import Wishlist from "./pages/Wishlist";
import React from "react";
import "./App.css"; //imported to target overall body

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import {useState} from "react";
import { UserContext, CartContext, WishlistContext} from "./userContext";

const App = () => {

    const [user, setUser] = useState({
        accessToken: "",
        refreshToken: ""
    })

    const [userCart,setUserCart] = useState({
        userId: "",
        products:[]
    })

    const [userWishlist, setUserWishlist] = useState({
        userId: "",
        products:[]
    })
    
    return (

        // Using react router dom
        <Router>
            <UserContext.Provider value = {{user,setUser}}>
                <CartContext.Provider value = {{userCart,setUserCart}}>
                    <WishlistContext.Provider value = {{userWishlist,setUserWishlist}}>
                        <Routes>
                                <Route exact path='/' element={<Home/>} />
                                <Route exact path='/login' element={<Login/>} />
                                <Route exact path='/register' element={<Registration/>} />
                                <Route exact path='/checkout' element={<Checkout/>}/>
                                <Route exact path='/logout' element={<Logout/>}/>
                                <Route exact path='/purchase' element={<Purchase/>}/>
                                <Route exact path='/order' element={<Order/>}/>
                                <Route exact path='/wishlist' element={<Wishlist/>}/>
                                {/* bring to page of products by category */}
                                <Route path='/products/:category' element={<ProductList/>} />
                                {/* search for an individual product */}
                                {/* <Route path='/product/:id' element={<Product/>} /> */}
                        </Routes>
                    </WishlistContext.Provider>
                </CartContext.Provider>
            </UserContext.Provider>
        </Router>
    );
};

export default App;