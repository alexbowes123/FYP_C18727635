import React from "react";
import  styled  from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { useContext } from "react";
import { UserContext } from "../userContext";
import BasketHeader from "../components/BasketHeader";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";

const Container = styled.div`

    height: 100vh;
   
`
const Message = styled.h3`

    font-size:25px;
    font-weight:bolder;
    color: black;
    width: 95%;
    margin: 0 auto;
    height: 10%;
    padding-top:2%;

`


const Checkout = () => {

    const {user,setUser} = useContext(UserContext);

    return(
        <Container>
            <Navbar/>
            <Banner/>
            <Message>Your Cart</Message>
            <BasketHeader/>
            <Footer/>
            <Copyright/>
        </Container>
    )

}

export default Checkout