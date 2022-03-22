import React from "react";
import  styled  from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { useContext } from "react";
import { UserContext } from "../userContext";
import BasketHeader from "../components/BasketHeader";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";

const Container = styled.div`
`
const Message = styled.h3`

    font-size:25px;
    font-weight:bolder;
    color: black;
    width: 95%;
    margin: 0 auto;
    height: 30px;
    padding-top:30px;

`

const Checkout = () => {

    const {user,setUser} = useContext(UserContext);

    return(
        <Container>
            <Navbar/>
            <Announcement/>
            <Message>Welcome to the Checkout page, <i>{user.username}</i></Message>
            <BasketHeader/>
            <Footer/>
            <Copyright/>
        </Container>
    )

}

export default Checkout