
import React from "react";
import  styled  from "styled-components";
import { useNavigate } from "react-router-dom";

// Added to apply background colour black to edges between components
const Root = styled.div`
    background-color:#232323;

`

const Logout = () => {
    let navigate = useNavigate();

    return(
        <div>
                <h2>You have logged out successfully.</h2>

                <h3>Click here to return to the Home page</h3>

                <button id ="returnHome" value = "Return to Home page" onClick={()=>{
                    navigate('/');
                }}>Return to Home</button> 

        </div>
    )
}

export default Logout