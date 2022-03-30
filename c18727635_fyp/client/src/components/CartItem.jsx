import styled from "styled-components"
import { useContext, useEffect, useState} from "react";
import axios from "axios";
import { axiosJWT } from "../refresh"
import { UserContext, CartContext } from "../userContext";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 4px solid red;

`
const Title = styled.div`

`
const Price = styled.div`

`

const Quantity = styled.div`
overflow: hidden
`
const QuantityBox = styled.div`
    text-align:center;
    background-color:white;
   
`

const ItemTotal = styled.div`
`
const FinalTotal = styled.div`
`
const IconPlus = styled.div`
   
    background-color:#00ff00;  
    text-align:center;
    border-radius:10px;

`
const IconMin = styled.div`
   
    background-color:red;
    text-align:center;

   
`

const CartItem = ({item}) =>{


    const [product, setProduct] = useState([]);

    const {userCart,setUserCart} = useContext(CartContext);

    const {user,setUser} = useContext(UserContext);

    // useEffect(()=>{
   
    
        // FUNCTION TO GET PRODUCTS
    //     const getCart = async () =>{
    //         try{
            
    //             const res = await axios.get(`http://localhost:5000/api/products/find/${item.productId}`);


    //             // output products retrieved from db    
    //             console.log("Item Retrieved is",res.data);
    //             setProduct(res.data);

           
    //         } catch(error){}
    //     };
    //     getCart();
        
    // },[]); 

    // const Total = ({value }) => (
    //     <h3>
    //       Price: 

    //       {(sum, value) => ({
    //         sum = value.quantity * value.price,
    //         return sum
    //     }), 0}
          
    //     </h3>
    //   )

    useEffect(()=>{
        console.log("quantity is now" + item.quantity);

    },[userCart])



    const addToCart = async(item) => {
            
        //update a cart based on the current user's id
        if(user.username != null){
            try{
                const res = await axiosJWT.put(
                    `http://localhost:5000/api/cart/find/${user._id}`,{
                    products: [
                        {
                            productId:item.productId,
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

    const RemoveFromCart = async(item) => {
            
        //update a cart based on the current user's id
        if(user.username != null){
            try{
                const res = await axiosJWT.put(
                    `http://localhost:5000/api/cart/deduct/${user._id}`,{
                    products: [
                        {
                            productId:item.productId,
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
                    console.log('cart item deducted ')
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
  

      

    return(
        <Container>
              <Title>
                <h4>{item.title}</h4>
            </Title>
            <Quantity>
                <IconMin>
                    <button style={{border:"none", cursor:"pointer", backgroundColor:"red"}} onClick={()=>{RemoveFromCart(item)}}>      
                        <RemoveOutlinedIcon/>
                    </button>
                </IconMin>
                <QuantityBox><h4>{item.quantity}</h4></QuantityBox>
                <IconPlus>
                    <button style={{border:"none", borderRadius:"10px", cursor:"pointer", backgroundColor:"#00ff00"}} onClick={()=>{addToCart(item)}}>      
                        <AddOutlinedIcon/>
                    </button>
                </IconPlus>
            </Quantity>
            <Price>
                <h4>€{item.price}</h4>
            </Price>
          
            {/* <Total value = {item}/> */}
           
        </Container>
    )

}

export default CartItem