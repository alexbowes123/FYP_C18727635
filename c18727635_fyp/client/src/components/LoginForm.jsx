import React,{useState} from "react";
import axios from "axios";
import styled from "styled-components";
import Products from "./Products";
import Cookies from "js-cookie";

const Container = styled.div`
    height: 60px; 
    background-color: #232323;
`

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
    border: 2px solid orange;
    margin-right: 10%;
    height: 500px;

    
`

const Right = styled.div`
    flex:1;
    display:block;
    background-color: #f2f2f2;
    border: 2px solid red;
    height: 500px;
`



const Logo = styled.h1`
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


    





// const LoginForm = () => {
function LoginForm() {

    //end point for registration
    const registerUrl = "http://localhost:5000/api/auth/register";

    const loginUrl = "http://localhost:5000/api/auth/login";
    
    const [user, setUser] = useState(null);

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    function submitLogin(e)
    {
       
        e.preventDefault();
        axios.post(loginUrl,{
            email: login.email,
            password: login.password

        }).then(res=>{
            console.log('hello response ')
            console.log(res.data);

            // need to get the jwt in this res.data over to  Products.jsx
            // setUser(res.data);
            Cookies.set('authorization', res.data.accessToken);



            // setUser(res.data);
           
          
            // after login, trying to get JWT token after login and pass into header for another request
            // let currToken = res.data.accessToken
        }).catch(err=>{
            console.log('Error is',err);
        })

    }

    // handling login 
    function handleLogin(e){
        const newLogin ={...login}
        newLogin[e.target.id] = e.target.value
        setLogin(newLogin)
        // console.log(newLogin)
        
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
        axios.post(registerUrl,{
            email: register.email,
            username: register.username,
            password: register.password

        }).then(res=>{
            console.log(res.data);

        })

    }

    function handleRegister(e){
        const newRegister = {...register}
        newRegister[e.target.id] = e.target.value
        setRegister(newRegister)
        console.log(newRegister)
    }

    return (
        <Container>
           <Wrapper>
                <Left>
                    <Logo>Sign into Blackbelt.</Logo>
                    <UserForm>
                       
                       <form onSubmit={(e)=>submitLogin(e)}> 
                           
                            <label for="email"><b>Email:</b></label>
                            <input type="text" name="email" onChange={(e)=>handleLogin(e)} id="email"  value={login.email} required/>
                            <label for="psw"><b>Password:</b></label>
                            < input type="password" name="password" onChange={(e)=>handleLogin(e)} id="password" value={login.password} required/>
                            <button>submit</button> 
                       
                        </form>
                    </UserForm>
               
                </Left>
                <Right>
                <Logo>Don't have an account? Sign up.</Logo>
                <UserForm>
                    {/* SU = SIGN UP */}
                        {/* <form> */}
                            {/* <label for="emailSU"><b>Email:</b></label> */}
                                {/* <input type="text"  name="emailSU" onchange={(e)=>handle(e)} id="emailSU" value={data.email} required/> */}
                            {/* <label for="nameSU"><b>Name:</b></label>
                                <input type="text" onChange={(e)=>handle(e)}  name="nameSU" value={data.name} id="nameSU" required/>
                            <label for="psw"><b>Password:</b></label>
                                <input type="password"  onChange={(e)=>handle(e)} name="pswSU" value={data.name} id="pswSU" required/>
                            <label for="psw"><b>Repeat Password:</b></label>
                                <input type="password" name="psw-repeatSU" id="psw-repeatSU" required/>
                            <input type="submit" value="Submit" /> */}

                            <form onSubmit={(e)=>submit(e)}>
                           
                           <label htmlFor="email"><b>Email:</b></label>
                           <input type="text" name="email" onChange={(e)=>handleRegister(e)} id="email"  value={register.email} required/>
                           <label htmlFor="username"><b>Username:</b></label>
                           <input type="text" name="username" onChange={(e)=>handleRegister(e)} id="username" value={register.username} required/>
                           <label htmlFor="password"><b>Password:</b></label>
                           <input type="password" name="password" onChange={(e)=>handleRegister(e)} id="password" value={register.password} required/>
                           <button>submit</button>
                        
                       </form>
                        {/* </form> */}
                    </UserForm>
                </Right>
            </Wrapper>
            
        </Container>
    )
}

export default LoginForm