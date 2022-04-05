import React from "react";
import  styled  from "styled-components";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Copyright from "../components/Copyright";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// Added to apply background colour black to edges between components
const Root = styled.div`
    background-color:#232323;

`

const Home = () => {
    return(
        <div>
            <Root>
                <Navbar/>
                <Banner/>
                <Categories/>
                <Footer/>
                <Copyright/>
            </Root>    
        </div>
    )
}

export default Home