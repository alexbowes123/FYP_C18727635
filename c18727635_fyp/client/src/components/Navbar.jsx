import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { CartContext, UserContext } from "../userContext";
import { AccountBoxOutlined, FavoriteOutlined, ShoppingCartOutlined } from "@material-ui/icons";

import React from "react";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { axiosJWT } from "../refresh"


import { useNavigate } from "react-router-dom";

const logoutURL = "/api/auth/logout"

const Container = styled.div`
    height: 60px; 
    background-color: #232323;
`

const Wrapper = styled.div`
    padding: 0px 20px;
    display: flex;
    align-items:center;
    justify-content: space-between;
 
`

const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
`


const Language = styled.span`
    font-size: 14px;
    color: white;
`

const Center = styled.div`
    flex:1;
    text-align:center;
`

const Logo = styled.h1`
  font-weight:bolder;
  color: white;
`

const Message = styled.h3`

    color:white;
`
const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
`

const MenuItem = styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
    color: white;
`

const headers = {
    'token': "Bearer "+Cookies.get('authorization'),
    'Content-Type': 'application/json'
}

//pass the refresh token when logging out a user
const data = {
    "token": Cookies.get('refresh')
}

const LogoutButton = styled.button`
    font-size: 12px;
    background: white;
    border: 1px solid dark-grey;
    font-weight: bolder;
`



const Navbar = () => {

    const {user,setUser} = useContext(UserContext);

    const {userCart,setUserCart} = useContext(CartContext);

    let navigate = useNavigate()

    useEffect(()=>{
        console.log("nav userCart is", userCart);
    },[userCart])

    
   

    function handleLogout(e){
        e.preventDefault();

        axiosJWT.post(logoutURL, data, {
            headers: headers
        }).then((response)=>{
            console.log(response);
            user.username = null; //set user.username to null so the user's name and logout button will disappear
            setUserCart(null); //empty cart context after logout

            //the username disappears when the token is refreshed or the dom re renders
            console.log("user is",user);
            //placeholder visit register after logging out
            navigate('../');

        }).catch(err=>{
            console.log('Error is',err);
        })
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>ENG</Language>
                </Left>
                <Center>
                <Link to="/" style={{ textDecoration: 'none' }}><Logo>Blackbelt.</Logo></Link>
                </Center>
                <Right>
                   
                    {/* If the logged username is not null, display the name,
                    else, display LOGIN that user can click to visit login page */}

                    {user.username != null 
                    ?   <Message>{user.username}</Message>
                    :   <Link to="/login" style={{ textDecoration: 'none' }}><MenuItem> 
                            <Message>Login</Message>
                        </MenuItem></Link> }

                    {user.username != null ? <LogoutButton onClick={handleLogout} style ={{marginLeft:30}}>LOGOUT</LogoutButton>: null }  
                   
                    <Link to="/checkout" style={{ textDecoration: 'none' }}><MenuItem>
                    {userCart != null? <Badge badgeContent = {userCart.products.length} color="primary"> <ShoppingCartOutlined/></Badge> : <Badge color="primary"> <ShoppingCartOutlined/></Badge> } 
                    </MenuItem></Link>

                    <Link to="/order" style={{ textDecoration: 'none' }}><MenuItem> 
                        <AccountBoxOutlined/>
                    </MenuItem></Link>

                    <Link to="/wishlist" style={{ textDecoration: 'none' }}><MenuItem> 
                        <FavoriteOutlined/>
                    </MenuItem></Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar