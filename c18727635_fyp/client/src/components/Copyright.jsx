import styled from "styled-components"


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Copyr = styled.p`
    align-items: center;
    justify-content: center;
`

const Copyright = () => {
    return(
        <Container>
           <Copyr>© Alexander Bowes 2022</Copyr>
        </Container>
    )
}

export default Copyright