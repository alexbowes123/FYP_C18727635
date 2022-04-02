import React,{useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { axiosBASE } from "../refresh";
import styled from "styled-components";
import Cookies from "js-cookie";
import { UserContext, CartContext } from "../userContext";


const Wrapper = styled.div`
    padding: 0px 20px;
    display: flex;

    justify-content: space-between;
    background-color: #232323;
    height:440px;

 
`

const Left = styled.div`
    flex:1;
    display:block;
    align-items:center;
    background-color: #f2f2f2;
    padding-right: 10px;
    // border: 2px solid orange;
    margin-right: 10%;
    height: 70%;
    margin-top:10%;
    

    
`

const Right = styled.div`
    flex:1;
    display:block;
    background-color: #f2f2f2;
    // border: 2px solid red;
    height: 70%;
    margin-top:10%;

`



const Logo = styled.h1`
  font-weight:bolder;
  color: #232323;
  text-align:center;
  height: 20%;
`

const Message = styled.h3`
font-weight:bolder;
color: #232323;
text-align:center;

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


const Input = styled.input`
  font-size: 18px; 
  background: white;
  border: 1px solid dark-grey;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;

const Button = styled.button`
    font-size: 18px;
    background: white;
    border: 1px solid dark-grey;
`



const refreshUrl = "/api/auth/refresh";

    
function LoginForm() {

    let navigate = useNavigate();

    const registerUrl = "/api/auth/register";
    const loginUrl = "/api/auth/login";
    const cartUrl = "/api/cart"
    const orderUrl = "/api/order"

    const {user,setUser} = useContext(UserContext);

    const {userCart,setUserCart} = useContext(CartContext);



    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const getUserCart = async(userData) => {
        try{

            //get cart from db based on userid 
            const getCart = await axiosBASE.get(`/api/cart/find/${userData._id}`)

            return getCart.data;

        }catch(err){
            console.log(err);
        }
    }

    function validateEmail (email) {
        console.log("in validate")
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(regexp.test(email));
        
        return regexp.test(email);
      }

  
    const submitLogin = async(e) =>
    {

        const emailVerify = validateEmail(login.email);

        if(!emailVerify){
            alert("Invalid email entered");
            return;
        }
       
        e.preventDefault();
        axiosBASE.post(loginUrl,{
            email: login.email,
            password: login.password

        }).then(async (res) => {
            console.log('hello response ')
            console.log(res.data);
            setUser(res.data);
            
            //place the accessToken in a cookie to be passed to requests
            Cookies.set('authorization', res.data.accessToken);
            Cookies.set('refresh',res.data.refreshToken);

            //GET THE LOGGED IN USER'S CART 
     
            const cartData = await getUserCart(res.data);

            setUserCart({...cartData}); //spread operator an object

            navigate('../'); 

        })
        .catch(err=>{
            console.log('Error is',err);
        })

    }

    function handleLogin(e){
        const newLogin ={...login}
        newLogin[e.target.id] = e.target.value
        setLogin(newLogin)
    }

    //use state for loading values from register inputs into axios for posting to 
    //db
    const [register,setRegister] = useState({
        email: "",
        username: "",
        password: ""
    })

    const submit = async(e) => {
    
       
        e.preventDefault();

        const emailVerify = validateEmail(register.email);

        if(!emailVerify){
            alert("Invalid email entered");
            return;
        }

        // create a user 
        axiosBASE.post(registerUrl,{
            email: register.email,
            username: register.username,
            password: register.password

        }).then(res=>{

            //CREATE AN ORDERLIST FOR THE NEW USER
            axiosBASE.post(orderUrl,{
                userId: res.data._id,
                receipts: [

                ]
            })

      

            console.log("order created, now on to cart");

            //CREATE A CART FOR THE NEW USER
            axiosBASE.post(cartUrl,{
            userId: res.data._id,
            products: [
             
            ]

        }).then(res=>{
            console.log('hello cart ')
            console.log(res.data);
             navigate('../register');
            
        }).catch(err=>{
            console.log('Error is',err);
        })
                
        })
    }

    function handleRegister(e){
        const newRegister = {...register}
        newRegister[e.target.id] = e.target.value
        setRegister(newRegister)
    }


    
    return (
       
           <Wrapper>
                <Left>
                    <Logo>Sign into Blackbelt.</Logo>
                   
                    <UserForm>  
                        <Form onSubmit={(e)=>submitLogin(e)}> 
                            <FormItems>
                                <FormLabel><label htmlFor="email"><b>Email:</b></label></FormLabel>
                                <Input type="text" name="email" onChange={(e)=>handleLogin(e)} id="email"  value={login.email} required/>
                            </FormItems> 
                            <FormItems> 
                                <FormLabel><label htmlFor="psw"><b>Password:</b></label></FormLabel>
                                <Input type="password" name="password" onChange={(e)=>handleLogin(e)} id="password" value={login.password} required/>
                              
                            </FormItems> 
                            <FormItems>
                                    <Button>Login</Button>     
                            </FormItems>
                        </Form>
                    </UserForm>
               
                </Left>
                <Right>
                    <Logo>Don't have an account?<br/>Sign up.</Logo>
                <UserForm>
                        <Form onSubmit={(e)=>submit(e)}> 
                        <FormItems>
                           <FormLabel><label htmlFor="email"><b>Email:</b></label></FormLabel>
                           <Input type="text" name="email" onChange={(e)=>handleRegister(e)} id="email"  value={register.email} required/>
                        </FormItems>
                        <FormItems>
                           <FormLabel><label htmlFor="username"><b>Username:</b></label></FormLabel>
                           <Input type="text" name="username" onChange={(e)=>handleRegister(e)} id="username" value={register.username} required/>
                        </FormItems>   
                        <FormItems>
                            <FormLabel><label htmlFor="password"><b>Password:</b></label></FormLabel>
                           <Input type="password" name="password" onChange={(e)=>handleRegister(e)} id="password" value={register.password} required/>
                        </FormItems> 
                        <FormItems>  
                           <Button>submit</Button>
                        </FormItems>
                       </Form>
                    </UserForm>
                </Right>
            </Wrapper>
            
     
    )
}

export default LoginForm

