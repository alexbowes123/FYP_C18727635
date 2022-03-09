import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AccountBoxOutlined,FavoriteOutlined, Search, ShoppingCartOutlined } from "@material-ui/icons";
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import React from "react";
import styled from "styled-components";

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
    cursor: pointer;
    color: white;
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display:flex;
    align-items:center;
    margin-left:25px;
    padding: 5px;
    background-color: white;
`

const Input = styled.input`
    border:none;

`

const Center = styled.div`
    flex:1;
    text-align:center;
`

const Logo = styled.h1`
  font-weight:bolder;
  color: white;
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


const Navbar = () => {

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>ENG</Language>
                    <SearchContainer>
                        <Input/>
                        <Search style = {{color: "gray", fontSize: 16}}/>
                    </SearchContainer>

                </Left>
                <Center>
                <Link to="/" style={{ textDecoration: 'none' }}><Logo>Blackbelt.</Logo></Link>
                </Center>
                <Right>
                
                    {/* <Link to="/register" style={{ textDecoration: 'none' }}> <MenuItem>REGISTER</MenuItem></Link> */}
                    <Link to="/login" style={{ textDecoration: 'none' }}><MenuItem>
                        <AccountBoxOutlined/>
                    </MenuItem></Link>
                   
                    <Link to="/checkout" style={{ textDecoration: 'none' }}><MenuItem>
                        <Badge badgeContent={4} color="primary">
                        <ShoppingCartOutlined/>
                        </Badge>
                    </MenuItem></Link>

                    <Link to="/wishlist" style={{ textDecoration: 'none' }}><MenuItem>
                        <Badge badgeContent={1} color="primary">
                        <FavoriteOutlined/>
                        </Badge>
                    </MenuItem></Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar