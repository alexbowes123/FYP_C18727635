import { UserContext } from "../userContext";
import { React , useState, useEffect} from "react";
import styled from "styled-components";
import { useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import CartItem from "./CartItem";



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


const Logo = styled.h1`
  font-weight:bolder;
  color: white;
`



const MenuItem = styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
    color: white;
`

const headers = {
    'token': "Bearer "+Cookies.get('authorization'),
    'Content-Type': 'application/json'
}

const data = {
    "token": Cookies.get('refresh')
}




const BasketHeader = () => {

    const {user,setUser} = useContext(UserContext);

    const [cart,setCart] = useState([]);
    
    function getCartNow()  {
        console.log("cart is a",cart);
    }
 

    useEffect(()=>{

    
        // FUNCTION TO GET PRODUCTS
        const getCart = async () =>{
            try{
            
                const res = await axios.get(`http://localhost:5000/api/cart/find/${user._id}`);


                // output products retrieved from db    
                console.log("cart Retrieved is",res.data);
                setCart(res.data.products);

           
            } catch(error){}
        };
        getCart();
        
    },[]); // Dependency: when the category changes, run the useEffect

 
    return (
        <Container>
            <Banner>
                <Wrapper>
                    <Left>
                        <Details>Order Details</Details>
                        {cart.map(item=>(
                <CartItem item={item} key = {item.id}/>
            ))}
                    </Left>
                    <Center>
                        <Details>Quantity</Details>
                    </Center>
                    <Right>
                        <PriceDetails>Price</PriceDetails>
                        <TotalDetails>Total</TotalDetails>
                        <button onClick={getCartNow()}>Get cart</button>
                    </Right>
                </Wrapper>
            </Banner>
        </Container>
        
    )
}

export default BasketHeader