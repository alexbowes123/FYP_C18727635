
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

const Purchase = () => {
    let navigate = useNavigate();

    return(
        <div>
                <h2>Your purchase was successful!</h2>

                <h3>Click here to return to the Home page</h3>

                <button id ="returnHome" value = "Return to Home page" onClick={()=>{
                    navigate('../');
                }}>Return to home</button> 

        </div>
    )
}

export default Purchase