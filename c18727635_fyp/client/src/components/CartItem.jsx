import styled from "styled-components"
import { useContext, useEffect, useState} from "react";
import axios from "axios";
import { axiosJWT } from "../refresh"
import { UserContext, CartContext } from "../userContext";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 2px solid black;
`
const Title = styled.div`
    width: 20%;
    text-align: center;
`
const Price = styled.div`
    width: 10%;
    text-align: center;
`

const Quantity = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    // border: solid 3px green;
    width: 30%;
`
const QuantityBox = styled.div`
    text-align:center;
    background-color:white;
    width: 35px;
`

const ItemPrice = styled.h4`
`
const IconPlus = styled.div`
   
    background-color:#00ff00;  
    text-align:center;
    border-radius:10px;
    display: inline-block;
    height:50%;

`
const IconMin = styled.div`
   
    background-color:red;
    text-align:center;
    border-radius:10px;
    display: inline-block;
    height: 50%;
`

const ImageBgrnd = styled.div`
    width: 99px;
    height: 80px;
    background-color:white;
`

const Image = styled.img`
    width: 99px;
    height: 80px; 
`

const CartItem = ({item}) =>{


    const [product, setProduct] = useState([]);

    const {userCart,setUserCart} = useContext(CartContext);

    const {user,setUser} = useContext(UserContext);

    // useEffect(()=>{
   
    
        // FUNCTION TO GET PRODUCTS
    //     const getCart = async () =>{
    //         try{
            
    //             const res = await axios.get(`/api/products/find/${item.productId}`);


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
                    `/api/cart/find/${user._id}`,{
                    products: [
                        {
                            productId:item.productId,
                            quantity: 1,
                            title:item.title,
                            desc:item.desc,
                            categories:item.categories,
                            size:item.size,
                            color:item.color,
                            price:item.price,
                            img:item.img

                        
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
                    `/api/cart/deduct/${user._id}`,{
                    products: [
                        {
                            productId:item.productId,
                            quantity: 1,
                            title:item.title,
                            desc:item.desc,
                            categories:item.categories,
                            size:item.size,
                            color:item.color,
                            price:item.price,
                            img:item.img
                        
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

            <ImageBgrnd><Image src = {item.img}/></ImageBgrnd>
            <Title><h4>{item.title}</h4></Title>
            <Quantity>
                <IconMin>
                    <button style={{border:"none", cursor:"pointer", backgroundColor:"red"}} onClick={()=>{RemoveFromCart(item)}}>      
                        <RemoveOutlinedIcon/>
                    </button>
                </IconMin>
                <QuantityBox><ItemPrice>{item.quantity}</ItemPrice></QuantityBox>
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