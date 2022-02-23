import styled from "styled-components"

import { FavoriteOutlined, ShoppingCartOutlined } from "@material-ui/icons";

const Container = styled.div`
    flex:1,
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display:flex;
    align-items: center;
    justify-content: center;
`

const Circle = styled.div`

`

const Image = styled.img`
    height: 75%;
    
`

const Info = styled.div`

`

const Icon = styled.div`

`

const Title = styled.div`

`
const Product = ({item}) => {
    return (
        <Container>
            <Circle/>
            <Image src = {item.img}/>
            <Info>
                <Title>
                    <h4>{item.title}</h4>
                </Title>
                <Icon>
                    <ShoppingCartOutlined/>
                </Icon>
                <Icon>
                    <FavoriteOutlined/>
                </Icon>
            </Info>
        </Container>
    )
}

export default Product