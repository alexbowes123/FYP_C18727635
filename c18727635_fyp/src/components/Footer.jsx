import styled from "styled-components"

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
const SocialContainer = styled.h1``

const SocialIcon = styled.div``

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
                <Desc>Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah</Desc>
            </Left>
            <Center></Center>
            <Right></Right>
        </Container>
    )
}

export default Footer