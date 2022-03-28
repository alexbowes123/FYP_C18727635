import styled from "styled-components"
import { UserContext, CartContext } from "../userContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { axiosJWT } from "../refresh"

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
    
    const {user,setUser} = useContext(UserContext);

    const {userCart,setUserCart} = useContext(CartContext);

    useEffect(()=>{
        // console.log("updated Cart is", userCart);
    },[userCart])


    const addToCart = async(item) => {
             
        //update a cart based on the current user's id
        if(user.username != null){
            try{
                const res = await axiosJWT.put(
                    `http://localhost:5000/api/cart/find/${user._id}`,{
                    products: [
                        {
                            productId:item._id,
                            quantity: 1,
                            title:item.title,
                            desc:item.desc,
                            categories:item.categories,
                            size:item.size,
                            color:item.color,
                            price:item.price
                        
                        },
                    ] 
                }).then(res=>{
                    console.log('cart updated ')
                    console.log(res.data);
                    setUserCart(res.data); //update cart context 
        
                }).catch(err=>{
                    console.log('Error is',err);
                })     
            }catch(error){} 
        }
        else{
            console.log("not logged in, cannot add to cart");
        }
        
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