import React, { useEffect, useContext, useRef } from 'react'
import { UserContext, CartContext } from "../userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosJWT } from "../refresh"

export default function Paypal(){

    const paypal = useRef()

    let navigate = useNavigate();

    const {userCart,setUserCart} = useContext(CartContext);

    const {user,setUser} = useContext(UserContext);


    useEffect(()=>{
        window.paypal.Buttons({
            createOrder: (data,actions, err)=>{
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Goods from BlackBelt",
                            amount: {
                                currency_code: "EUR",
                                value: userCart.cartTotal
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) =>{
                const order = await actions.order.capture();
                console.log(order);

                //create a receipt for the user in their orderList
                try{
                    const recipt = await axiosJWT.put(
                        `/api/order/find/${user._id}`,{
                            receipts:[
                                {
                                    reciptId: order.id,
                                    orderDate: order.create_time,
                                    payerName: order.payer.name.surname,
                                    payerEmail: order.payer.email_address,
                                    purchaseCurrency: order.purchase_units[0].amount.currency_code,
                                    purchaseAmount: order.purchase_units[0].amount.value,
                                    orderStatus: order.status
                                    
                                },
                            ]
                        }
                    ).then(res=>{
                        console.log('order list updated ')
                        console.log(res.data);
                    }).catch(err=>{
                        console.log('Error is',err);
                    })    
                    
                }catch(error){
                    console.log("error adding receipt is:", + error);
                }




                console.log("trying to clear the cart");
               
                //remove items in cart from product array after creating order document
                try{
                    const res = await axiosJWT.put(
                        `/api/cart/emptyCart/${user._id}`,{

                        }
                    ).then(res=>{
                        console.log('cart item deducted ')
                        console.log(res.data);
                        setUserCart(res.data); //update cart context 
            
                    }).catch(err=>{
                        console.log('Error is up in',err);
                    })     
                }catch(error){
                    console.log(error);
                } 

                navigate("../Purchase")
            },
            onError: (err)=>{
                console.log(err)
            }
        }).render(paypal.current);
    }, [])
    return (
        <div>
            <div ref = {paypal}></div>
        </div>
    )
}

;