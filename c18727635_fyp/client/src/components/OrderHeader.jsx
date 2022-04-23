import { React , useState, useEffect, useContext} from "react";
import { UserContext } from "../userContext";
import styled from "styled-components";
import axios from "axios";
import { axiosBASE } from "../refresh";
import OrderItem from "./OrderItem";



const Container = styled.div`

    background-color: #FAFAD2;
    border: 5px solid black;
    width: 95%;
    margin: 0 auto;
    margin-bottom: 5%;
`
const Banner = styled.div` 
    background-color: #F08080;
`
const Wrapper = styled.div`
    padding: 0px 20px;
    display: flex;
    align-items:center;
    justify-content: space-between;
`


const OrderId = styled.h4`
    width:12%;
    border: 1px solid black;
    text-align:center;
    background-color:white;
`

const OrderDate = styled.h4`
    width:12%;
    border: 1px solid black;
    text-align:center;
    background-color:white;
`

const PayedTo = styled.h4`
    width:12%;
    border: 1px solid black;
    text-align:center;
    background-color:white;
`

const PayeeEmail = styled.h4`
    width:12%;
    border: 1px solid black;
    text-align:center;
    background-color:white;
`

const Currency = styled.h4`
    width:12%;
    border: 1px solid black;
    text-align:center;
    background-color:white;
`
const Amount = styled.h4`
    width:12%;
    border: 1px solid black;
    text-align:center;
    background-color:white;
`

const Status = styled.h4`
    width:12%;
    border: 1px solid black;
    text-align:center;
    background-color:white;
`

const OrderListContent = styled.div`
    display:flex; 
    flex-direction:row;   
`

const Items = styled.div`
    display: inline-block;
    height: 62vh;
    width: 100%;
    overflow-y: scroll;
    overflow-x: scroll;
`



const OrderHeader = () => {

    const {user,setUser} = useContext(UserContext);

    const [order,setOrder] = useState([]);
  

    const getOrder = async () =>{
        try{
        
            const res = await axiosBASE.get(`api/order/find/${user._id}`);

           
            console.log("order list Retrieved is",res.data);
            setOrder(res.data);
            
        } catch(error){}
    };
 

    useEffect(()=>{
        
        if(user.username!=null){
            getOrder();
        }else{
            console.log("not logged in, cannot display orders")
        }
    },[]); 
 
    return (
        <Container>
            <Banner>
                <Wrapper>
                    <OrderId>Receipt ID</OrderId>
                    <OrderDate>Order Date</OrderDate>
                    <PayedTo>Paid To</PayedTo>
                    <PayeeEmail>Payee Email</PayeeEmail>
                    <Currency>Currency</Currency>
                    <Amount>Amount</Amount>
                    <Status>Status</Status>
                </Wrapper> 
            </Banner>
            <OrderListContent>
                {user.username!=null ?
                    <Items>
                            {order.receipts?.map(item=>(
                                <OrderItem item={item} key = {item.id}/>
                            ))}    
                    </Items>
                    :
                    <Items></Items>}
            </OrderListContent>
        </Container>
    )
}

export default OrderHeader