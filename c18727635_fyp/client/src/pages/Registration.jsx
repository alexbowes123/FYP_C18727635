
import React from "react";
import  styled  from "styled-components";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Copyright from "../components/Copyright";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";

// Added to apply background colour black to edges between components
const Root = styled.div`
    background-color:#232323;

`

const Home = () => {
    let navigate = useNavigate();

    return(
        <div>
                <h2>thanks for registering successfully!</h2>

                <h3>Click here to return to the login page</h3>

                <button id ="returnLogin" value = "Return to Login page" onClick={()=>{
                    navigate('../Login');
                }}>Return to Login</button> 

        </div>
    )
}

export default Home