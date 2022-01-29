import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";

const Home = () => {
    return(
        <div>
            <Announcement/>
            <Navbar/>
            <Categories/>
        </div>
    )
}

export default Home