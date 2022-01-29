import styled from "styled-components"

const Container = styled.div`
    height:30px;
    background-color: teal;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;

`

const Announcement = () => {
    return (
        <Container>
            SALE NOW ON! Buy 1 Jiu Jitsu Gi, get another HALF PRICE! (Not really)
        </Container>
    )
}

export default Announcement