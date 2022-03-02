import styled from "styled-components"


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #232323;
`

const Copyr = styled.p`
    align-items: center;
    justify-content: center;
    color: white;
`

const Copyright = () => {
    return(
        <Container>
           <Copyr>© Alexander Bowes 2022</Copyr>
        </Container>
    )
}

export default Copyright