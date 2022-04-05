import styled from "styled-components"

const Container = styled.div`
    height:40px;
    background-color: #ffff00;
    color:black;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 14px;
    font-weight: bolder;

`

const Banner = () => {
    return (
        <Container>
            SALE NOW ON! Buy 1 Jiu Jitsu Gi, get another HALF PRICE! (Not really)
        </Container>
    )
}

export default Banner