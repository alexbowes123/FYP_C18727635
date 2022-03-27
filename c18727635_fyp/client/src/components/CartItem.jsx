import styled from "styled-components"
import { useEffect, useState} from "react";
import axios from "axios";

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

const CartItem = ({item}) =>{


    const [product, setProduct] = useState([]);

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

    return(
        <Container>
              <Title>
                <h4>{product.title}</h4>
            </Title>
            <Price>
                <h4>€{product.price}</h4>
            </Price>
        </Container>
    )

}

export default CartItem