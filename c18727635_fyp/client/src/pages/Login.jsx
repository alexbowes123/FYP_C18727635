
import React from "react";
import  styled  from "styled-components";

import Copyright from "../components/Copyright";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

// Added to apply background colour black to edges between components

const Container = styled.div`
`

const Login = () => {
    return(
            <Container>
                <Navbar/>
                <LoginForm/>
                <Footer/>
                <Copyright/>
            </Container>
    )
}

export default Login