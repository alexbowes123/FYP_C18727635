import { React , useState, useEffect, useContext} from "react";
import { UserContext, CartContext } from "../userContext";
import styled from "styled-components";
import Cookies from "js-cookie";
import axios from "axios";
import { axiosBASE } from "../refresh";
import CartItem from "./CartItem";
import PayPal from "./PayPal";


const Container = styled.div`
    height: 65%; 
    background-color: #d2d4cd;
    border: 5px solid black;
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
    font-size: 24px;
    cursor: pointer;
    color: black;
    font-weight:bolder;
    margin:auto;
    padding-top:20px;
`

const CartContent = styled.div`
    display:flex; 
    flex-direction:row;    
`

const Input = styled.input`
    border:none;
`

const Items = styled.div`
    display: inline-block;
    height: 480px;
    width: 50%;
    overflow-y: scroll;
`



const CheckoutInputs = styled.div`
    width: 50%;
`


const UserForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    height: min-content;
    padding: 10px;
`
const Form = styled.form`
    width: 100%;
`

const FormItems = styled.div`
    display:flex;
    justify-content: center;
    margin: 10px 0;
`

const FormLabel = styled.div`
    width: 100px;
`


const InputAddr = styled.input`
  font-size: 18px; 
  background: white;
  border: 1px solid dark-grey;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;

const PayPalBox = styled.div`
    margin:auto;
    width:30%;
    padding-top: 5%;
    display:flex;
`

const BasketHeader = () => {

    const {user,setUser} = useContext(UserContext);

    const [cart,setCart] = useState([]);

    const {userCart,setUserCart} = useContext(CartContext);
    
  

    const getCart = async () =>{
        try{
        
            const res = await axiosBASE.get(`api/cart/find/${user._id}`);

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
                    </Center>
                    <Right>
                        <Details>Payment Information</Details>  
                    </Right>
                </Wrapper> 
            </Banner>
            <CartContent>
                {user.username!=null ?
                    <Items>
                            {cart.products?.map(item=>(
                                <CartItem item={item} key = {item.id}/>
                            ))}    
                    </Items>
                    :
                    <Items></Items>}
           
                { (user.username!= null && cart.cartTotal >1) ? (
                        <CheckoutInputs>
                            <UserForm>
                                <Form> 
                                    <FormItems>
                                        <FormLabel><label htmlFor="address1"><b>Address L1:</b></label></FormLabel>
                                        <InputAddr type="text" name="address1"  id="address1"   required/>
                                    </FormItems>
                                    <FormItems>
                                        <FormLabel><label htmlFor="address2"><b>Address L2:</b></label></FormLabel>
                                        <InputAddr type="text" name="address2"  id="address2" required/>
                                    </FormItems>  
                                    <FormItems>
                                        <FormLabel><label htmlFor="county"><b>County:</b></label></FormLabel>
                                        <InputAddr type="text" name="county"  id="county" required/>
                                    </FormItems>  
                                    <FormItems>
                                        <FormLabel><label htmlFor="country"><b>Country:</b></label></FormLabel>
                                        <InputAddr type="text" name="country"  id="country" required/>
                                    </FormItems>  
                                    <FormItems>
                                    {user.username!=null ? <TotalDetails>Total is €{cart.cartTotal}</TotalDetails>
                                        : <TotalDetails>Total is €0.00</TotalDetails>}
                                
                                    </FormItems>
                                </Form> 
                            </UserForm>
                            <PayPalBox>
                                <PayPal/>
                            </PayPalBox>           
                        </CheckoutInputs>
                    ) : (
                       <CheckoutInputs></CheckoutInputs>
                    
                    )}
            </CartContent>
        </Container>
    )
}

export default BasketHeader