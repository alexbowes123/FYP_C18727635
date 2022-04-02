import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-left: 1%;
    border: solid 1px black;
   
`

const OrderId = styled.h4`
    width:12%;
    border: 1px solid green;
    overflow-x: scroll;
    background-color:white;
    text-align:center;
    padding-top: 2%;
   
`

const OrderDate = styled.h4`
    width:12%;
    border: 1px solid green;
    overflow-x: scroll;
    background-color:white;
    text-align:center;
    padding-top: 2%;
`

const PayedTo = styled.h4`
    width:12%;
    border: 1px solid green;
    overflow-x: scroll;
    background-color:white;
    text-align:center;
    padding-top: 2%;
`

const PayeeEmail = styled.h4`
    width:12%;
    border: 1px solid green;
    overflow-x: scroll;
    background-color:white;
    text-align:center;
    padding-top: 2%;
`

const Currency = styled.h4`
    width:12%;
    border: 1px solid green;
    overflow-x: scroll;
    background-color:white;
    text-align:center;
    padding-top: 2%;
`
const Amount = styled.h4`
    width:12%;
    border: 1px solid green;
    overflow-x: scroll;
    background-color:white;
    text-align:center;
    padding-top: 2%;
`

const Status = styled.h4`
    width:12%;
    border: 1px solid green;
    overflow-x: scroll;
    background-color:white;
    text-align:center;
    padding-top: 2%;
`


const OrderItem = ({item}) =>{

    return(
        <Container>

            <OrderId>{item._id}</OrderId>
            <OrderDate>{item.orderDate}</OrderDate>
            <PayedTo>{item.payerName}</PayedTo>
            <PayeeEmail>{item.payerEmail}</PayeeEmail>
            <Currency>{item.purchaseCurrency}</Currency>
            <Amount>{item.purchaseAmount}</Amount>
            <Status>{item.orderStatus}</Status>
        </Container>
    )

}

export default OrderItem