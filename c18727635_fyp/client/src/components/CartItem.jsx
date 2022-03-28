import styled from "styled-components"
import { useContext, useEffect, useState} from "react";
import axios from "axios";
import { UserContext, CartContext } from "../userContext";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Title = styled.div`

`
const Price = styled.div`

`

const Quantity = styled.div`
`

const ItemTotal = styled.div`
`
const FinalTotal = styled.div`
`

const CartItem = ({item}) =>{


    const [product, setProduct] = useState([]);

    const {userCart,setUserCart} = useContext(CartContext);

    useEffect(()=>{
   
    
        // FUNCTION TO GET PRODUCTS
        const getCart = async () =>{
            try{
            
                const res = await axios.get(`http://localhost:5000/api/products/find/${item.productId}`);


                // output products retrieved from db    
                console.log("Item Retrieved is",res.data);
                setProduct(res.data);

           
            } catch(error){}
        };
        getCart();
        
    },[]); 

    // const Total = ({ product, item }) => (
    //     <h3>
    //       {product.price.reduce((sum, product.price) => (
    //         sum = item.quantity * product.price;
    //       ), 0)}
    //     </h3>
    // )

    return(
        <Container>
              <Title>
                <h4>{product.title}</h4>
            </Title>
            <Price>
                <h4>€{product.price}</h4>
            </Price>
            <Quantity>
                <h4>{item.quantity}</h4>
            </Quantity>
            <ItemTotal>
                <h4></h4>

            </ItemTotal>
            <FinalTotal>

            </FinalTotal>
        </Container>
    )

}

export default CartItem