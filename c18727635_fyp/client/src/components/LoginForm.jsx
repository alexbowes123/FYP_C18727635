import React,{useState} from "react";
import styled from "styled-components";

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

const userForm = styled.div`
    flex:1;
    display:block;
    align-items:center;
    justify-content:center;
    background-color: #f2f2f2;
`

const formItems = styled.div`
display: block;

`


    





// const LoginForm = () => {
function LoginForm() {

    const url = ""
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    // handling login 
    function handle(e){
        const newLogin ={...login}
        newLogin[e.target.id] = e.target.value
        setLogin(newLogin)
        console.log(newLogin)
    
    }

    return (
        <Container>
           <Wrapper>
                <Left>
                    <Logo>Sign into Blackbelt.</Logo>
                    <userForm>
                        {/* LI = LOG IN  */}
                        <form>
                            <formItems>
                            <label for="email"><b>Email:</b></label>
                            <input type="text" name="email" onChange={(e)=>handle(e)} id="email"  value={login.email} required/>
                            <label for="psw"><b>Password:</b></label>
                            <input type="password" name="psw" onChange={(e)=>handle(e)} id="psw" value={login.password} required/>
                            <input type="submit" value="Submit" />
                            </formItems>
                        </form>
                    </userForm>
                    {/* Left */}
                </Left>
                <Right>
                <Logo>Don't have an account? Sign up.</Logo>
                <userForm>
                    {/* SU = SIGN UP */}
                        <form>
                            {/* <label for="emailSU"><b>Email:</b></label> */}
                                {/* <input type="text"  name="emailSU" onchange={(e)=>handle(e)} id="emailSU" value={data.email} required/> */}
                            {/* <label for="nameSU"><b>Name:</b></label>
                                <input type="text" onChange={(e)=>handle(e)}  name="nameSU" value={data.name} id="nameSU" required/>
                            <label for="psw"><b>Password:</b></label>
                                <input type="password"  onChange={(e)=>handle(e)} name="pswSU" value={data.name} id="pswSU" required/>
                            <label for="psw"><b>Repeat Password:</b></label>
                                <input type="password" name="psw-repeatSU" id="psw-repeatSU" required/>
                            <input type="submit" value="Submit" /> */}
                        </form>
                    </userForm>
                </Right>
            </Wrapper>
            
        </Container>
    )
}

export default LoginForm