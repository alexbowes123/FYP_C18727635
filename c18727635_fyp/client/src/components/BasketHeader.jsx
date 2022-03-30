import { React , useState, useEffect, useContext} from "react";
import { UserContext, CartContext } from "../userContext";
import styled from "styled-components";
import Cookies from "js-cookie";
import axios from "axios";
import CartItem from "./CartItem";
import PayPal from "./PayPal";


const Container = styled.div`
    height: 800px; 
    background-color: #d2d4cd;
    width: 95%;
    margin: 0 auto;
    margin-bottom: 5%;

  

`
const Banner = styled.div`
    height: 50px; 
    background-color: #e4f5b0;
`
const Wrapper = styled.div`
    padding: 0px 20px;
    display: flex;
    align-items:center;
    justify-content: space-between;
 
`

const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
`

const Center = styled.div`
    flex:1;
    display:flex;
    text-align:center;
`

const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;

`



const Details = styled.span`
    font-size: 14px;
    cursor: pointer;
    color: black;
    font-weight:bolder;
    margin:auto;
    padding-top:20px;
`

const PriceDetails = styled.span`
    font-size: 14px;
    cursor: pointer;
    color: black;
    font-weight:bolder;
    margin:auto;
    padding-top:20px;


`

const TotalDetails = styled.span`
    font-size: 14px;
    cursor: pointer;
    color: black;
    font-weight:bolder;
    margin:auto;
    padding-top:20px;
`

const Input = styled.input`
    border:none;

`






const Items = styled.div`
    display: inline-block;
    padding-left: 12%;
    width: 80%;
`





const BasketHeader = () => {

    const {user,setUser} = useContext(UserContext);

    const [cart,setCart] = useState([]);

    const {userCart,setUserCart} = useContext(CartContext);
    
  

    const getCart = async () =>{
        try{
        
            const res = await axios.get(`http://localhost:5000/api/cart/find/${user._id}`);

            // output products retrieved from db    
            console.log("cart Retrieved is",res.data);
            setCart(res.data);
            
        } catch(error){}
    };
 

    useEffect(()=>{
    
        // GET PRODUCTS IF USERNAME IS SET

        if(user.username!=null){
            getCart();
        }else{
            console.log("not logged in, cannot display cart on checkout page")
        }
    },[]); 

    useEffect(()=>{

        //re render when the cart context changes (as quantity changes)
        getCart()

    },[userCart]);

 
    return (
        <Container>
            <Banner>
                <Wrapper>
                    <Left>
                        <Details>Order Details</Details>
                    </Left>
                    <Center>
                        <Details>Quantity</Details>
                    </Center>
                    <Right>
                        <PriceDetails>Price</PriceDetails>
                        {user.username!=null ? <TotalDetails>Total is €{cart.cartTotal}</TotalDetails>
                        : <TotalDetails>Total is €0.00</TotalDetails>}
                    
                    </Right>
                </Wrapper>
                {user.username!=null ?
                <Items>
                        {cart.products?.map(item=>(
                            <CartItem item={item} key = {item.id}/>
                        ))}    
                </Items>
                :
                <Items></Items>}

                { (user.username!= null && cart.cartTotal >1) ? (
                    <PayPal/>
                ) : (
                    <h2>Cart is empty</h2>
                
                )}
            </Banner>
        </Container>
        
    )
}

export default BasketHeader