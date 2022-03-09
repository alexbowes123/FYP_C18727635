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
    background-color: #f2f2f2;
`

const Circle = styled.div`

`

const Image = styled.img`
    height: 75%;
    
`

const Info = styled.div`

    padding-left: 10px;

`

const Icon = styled.div`

`

const Title = styled.div`

`
const Price = styled.div`

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
                <Price>
                    <h4>€{item.price}</h4>
                </Price>
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