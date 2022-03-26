import React,{useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";
import Cookies from "js-cookie";
import { UserContext, CartContext } from "../userContext";



// const Container = styled.div`
//     height: 60px; 
//     background-color: #232323;
// `

const Wrapper = styled.div`
    padding: 0px 20px;
    display: flex;
    align-items:center;
    justify-content: space-between;
    background-color: #232323;
    height: 700px;
 
`

const Left = styled.div`
    flex:1;
    display:block;
    align-items:center;
    background-color: #f2f2f2;
    padding-right: 10px;
    // border: 2px solid orange;
    margin-right: 10%;
    height: 500px;

    
`

const Right = styled.div`
    flex:1;
    display:block;
    background-color: #f2f2f2;
    // border: 2px solid red;
    height: 500px;
`



const Logo = styled.h1`
  font-weight:bolder;
  color: #232323;
  text-align:center;
`

const Message = styled.h3`
font-weight:bolder;
color: #232323;
text-align:center;

`

const UserForm = styled.div`
    flex:1;
    display:block;
    align-items:center;
    justify-content:center;
    background-color: #f2f2f2;
`

const FormItems = styled.div`
display: block;

`

const refreshUrl = "http://localhost:5000/api/auth/refresh";

    
function LoginForm() {

    let navigate = useNavigate();

    const registerUrl = "http://localhost:5000/api/auth/register";
    const loginUrl = "http://localhost:5000/api/auth/login";
    const cartUrl = "http://localhost:5000/api/cart"

    const {user,setUser} = useContext(UserContext);

    const {userCart,setUserCart} = useContext(CartContext);



    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const getUserCart = async(userData) => {
        try{

            //get cart from db based on userid 
            const getCart = await axios.get(`http://localhost:5000/api/cart/find/${userData._id}`)

            return getCart.data;

        }catch(err){
            console.log(err);
        }
    }

  
    const submitLogin = async(e) =>
    {
       
        e.preventDefault();
        axios.post(loginUrl,{
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

    function submit(e)
    {
       
        e.preventDefault();

        // create a user 
        axios.post(registerUrl,{
            email: register.email,
            username: register.username,
            password: register.password

        }).then(res=>{

            //CREATE A CART FOR THE NEW USER
            axios.post(cartUrl,{
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
                       <form onSubmit={(e)=>submitLogin(e)}>  
                            <label htmlFor="email"><b>Email:</b></label>
                            <input type="text" name="email" onChange={(e)=>handleLogin(e)} id="email"  value={login.email} required/>
                            <label htmlFor="psw"><b>Password:</b></label>
                            < input type="password" name="password" onChange={(e)=>handleLogin(e)} id="password" value={login.password} required/>
                            <button>submit</button>  
                        </form>
                    </UserForm>
                </Left>
                <Right>
                <Logo>Don't have an account? Sign up.</Logo>
                <UserForm>
                        <form onSubmit={(e)=>submit(e)}> 
                           <label htmlFor="email"><b>Email:</b></label>
                           <input type="text" name="email" onChange={(e)=>handleRegister(e)} id="email"  value={register.email} required/>
                           <label htmlFor="username"><b>Username:</b></label>
                           <input type="text" name="username" onChange={(e)=>handleRegister(e)} id="username" value={register.username} required/>
                           <label htmlFor="password"><b>Password:</b></label>
                           <input type="password" name="password" onChange={(e)=>handleRegister(e)} id="password" value={register.password} required/>
                           <button>submit</button>
                       </form>
                    </UserForm>
                </Right>
            </Wrapper>
            
     
    )
}

export default LoginForm

