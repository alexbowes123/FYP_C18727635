import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Copyright from "../components/Copyright";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
    return(
        <div>
            <Announcement/>
            <Navbar/>
            <Categories/>
            <Products/>
            <Footer/>
            <Copyright/>
        </div>
    )
}

export default Home