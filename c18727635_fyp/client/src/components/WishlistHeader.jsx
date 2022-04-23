import { React , useState, useEffect, useContext} from "react";
import { UserContext, WishlistContext } from "../userContext";
import styled from "styled-components";
import axios from "axios";
import { axiosBASE } from "../refresh";
import WishlistItem from "./WishlistItem";



const Container = styled.div`

    background-color: #DCDCDC;
    border: 3px solid grey;
    width: 100%;
    margin: 0 auto;
  
`
const Banner = styled.div` 
    background-color: #808080;
    height: 7vh;

`
const Wrapper = styled.div`
    padding: 0px 20px;
    display: flex;
    
    justify-content: flex-end;
`

const PName = styled.h4`
    width:11%;
    border: 1px solid black;
    text-align:center;
    background-color: #808080;
    color: white;
    margin-left: auto; 
    margin-right: 0;
`

const Pprice = styled.h4`
    width:11%;
    border: 1px solid black;
    text-align:center;
    background-color: #808080;
    color: white;
    margin-left: auto; 
    margin-right: 0;
`

const Pstock = styled.h4`
    width:11%;
    border: 1px solid black;
    text-align:center;
    background-color: #808080;
    color: white;
    margin-left: auto; 
    margin-right: 0;
`

const WishListContent = styled.div`
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



const WishlistHeader = () => {

    const {user,setUser} = useContext(UserContext);

    const {userWishlist,setUserWishlist} = useContext(WishlistContext);

    const [wishlist,setWishlist] = useState([]);


  

    const getWishlist = async () =>{
        try{
        
            const res = await axiosBASE.get(`api/wishlist/find/${user._id}`);
 
            console.log("wish list Retrieved is",res.data);
            setWishlist(res.data);
            
        } catch(error){}
    };

    useEffect(()=>{

        //re render when the wishlist context changes (as quantity changes)
        getWishlist()

    },[userWishlist]);
 

    useEffect(()=>{
        
        if(user.username!=null){
            getWishlist();
        }else{
            console.log("not logged in, cannot display orders")
        }
    },[]); 
 
    return (
        <Container>
            <Banner>
                <Wrapper>
                    <PName>Product Name</PName>
                    <Pprice>Price</Pprice>
                    <Pstock>In Stock?</Pstock>
                </Wrapper> 
            </Banner>
            <WishListContent>
                {user.username!=null ?
                    <Items>
                            {wishlist.products?.map(item=>(
                                <WishlistItem item={item} key = {item.id}/>
                            ))}    
                    </Items>
                    :
                    <Items></Items>}
            </WishListContent>
        </Container>
    )
}

export default WishlistHeader