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
    background-color: white;
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
    padding-top: 3px;
    background-color:white;
   
`

const Title = styled.div`

`
const Price = styled.div`

`

const Product = ({item}) => {

    function addToCart(item){
        // e.preventDefault();

        //get the item that was clicked
        console.log("clicking cart!: "+item.title);
        console.log("item id is"+item._id);

        //trigger an api call to create or update a cart for the user
        
    }

    function addToWishlist(item){
        console.log("clicking wishlist!: "+item.title);
    }
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
                    <button style={{border:"none", cursor:"pointer", backgroundColor:"white"}} onClick={()=>{addToCart(item)}}>      
                        <ShoppingCartOutlined/>
                    </button>
                </Icon>
    
                <Icon>
                    <button style={{border:"none", cursor:"pointer", backgroundColor:"white"}} onClick={()=>{addToWishlist(item)}}> 
                    <FavoriteOutlined/>
                    </button>
                </Icon>
               
            </Info>
        </Container>
    )
}

export default Product