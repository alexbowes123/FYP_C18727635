import styled from "styled-components"
import { Facebook, Instagram } from "@material-ui/icons";

const Container = styled.div`
    display: flex;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1``

const Desc = styled.p``

const SocialContainer = styled.h1`
    display:flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=> props.color};
    display:flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;

`

const Center = styled.div`
    flex: 1;


`

const Right = styled.div`
    flex: 1;
`



const Footer = () => {
    return(
        <Container>
            <Left>
                <Logo>Blackbelt.</Logo>
                <Desc>DISCLAIMER: This application is not made for commercial use and does not process any real purchases.</Desc>
                <SocialContainer>
                    <SocialIcon color = "385999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color = "E4405F">
                        <Instagram/>
                    </SocialIcon>

                </SocialContainer>
            </Left>
            <Center></Center>
            <Right></Right>
        </Container>
    )
}

export default Footer