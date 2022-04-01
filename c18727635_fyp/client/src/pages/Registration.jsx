
import React from "react";
import  styled  from "styled-components";

import { useNavigate } from "react-router-dom";

// Added to apply background colour black to edges between components

const Container =styled.div`
padding-top: 5%;


width: 95%;
height: 100vh;
margin: 0 auto;
margin-bottom: 5%;
align-items: center;

`

const MsgBox = styled.div`

height: 80%;
background-color: black;
border-radius:10px;

width: 95%;
margin: 0 auto;
margin-bottom: 5%;
align-items: center;
justify-content:center;

`

const ImgBox = styled.div`
    padding-top: 3%;

    width: 50%;
    margin: 0 auto;

`
const Image = styled.img`
    height: 200px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;

`

const Thanks = styled.h1`   
    padding-top: 2%;
    color:white;
    text-align:center;
    width: 50%;
    margin: 0 auto;
`
const SubMsg = styled.h2`
    padding-top: 1%;
    color: white;
    text-align:center;
    width: 50%;
    margin: 0 auto;
`

const ButtonBox = styled.div`
    padding-top: 3%;
    width: 50%;
    margin: 0 auto;
    display: flex;
  justify-content: center;

`

const Button = styled.button`
    
    display: block;
    width: 50%;
    margin: 0 auto;
    position:relative;

    background-color: white;
    color: black;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;


`

const Home = () => {
    let navigate = useNavigate();

    return(
        <Container>
            <MsgBox>
                <ImgBox><Image src="https://www.clearsteps.com/wordpress/wp-content/uploads/2017/12/Green-Check.png"/></ImgBox>
                <Thanks>Thank you for registering successfully!</Thanks>
                <SubMsg>Click here to return to the Login page</SubMsg>

                <ButtonBox><Button id ="returnLogin" value = "Return to Login page" onClick={()=>{
                    navigate('../Login');
                }}>Return to home</Button></ButtonBox>

            </MsgBox>
            
        </Container>
     

      
    )
}

export default Home