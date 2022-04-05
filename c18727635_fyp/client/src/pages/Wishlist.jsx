import React from "react";
import  styled  from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { useContext } from "react";
import { UserContext } from "../userContext";
import WishlistHeader from "../components/WishlistHeader";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import { FavoriteOutlined } from "@material-ui/icons";

const Container = styled.div`

    height: 100vh;
   
`
const Message = styled.h3`

    font-size:25px;
    font-weight:bolder;
    color: white;
    margin: 0 auto;
    height: 5%;
    padding-top:2%;
    pading-left: ;
    background-color: black;
    text-align:center;

`

const HeartLogo = styled.div`
    background-color: black;
    color:white;
    align-items: center;
    text-align:center;
`


const Order = () => {

    const {user,setUser} = useContext(UserContext);

    return(
        <Container>
            <Navbar/>
            <Banner/>
            <Message>Your Wishlist</Message>
            <HeartLogo> 
                <FavoriteOutlined/>
            </HeartLogo>
            <WishlistHeader/>
            <Footer/>
            <Copyright/>
        </Container>
    )

}

export default Order