import styled from "styled-components"
import { useContext } from "react";
import { axiosJWT } from "../refresh"
import { UserContext, WishlistContext} from "../userContext";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: white;
    
    border: solid 1px black;
    height: 14vh;
   
`

const ItemImg = styled.h4`
    width:80px;
    height: 80px; 
    background-color:white;
    align-items:center;
`
const Image = styled.img`

    height: 8vh; 
    width: 10hw;
`


const OrderDate = styled.h4`
    width:14%;
    border: 1px solid green;
    overflow-x: scroll;
    background-color:white;
    text-align:center;
    padding-top: 2%;
`

const PayedTo = styled.h4`
    width:14%;
    border: 1px solid green;
    overflow-x: scroll;
    background-color:white;
    text-align:center;
    padding-top: 2%;
`

const PayeeEmail = styled.h4`
    width:14%;
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


const Icon = styled.div`

    padding-top:3%;
    padding-left:3%;

   
`


const WishlistItem = ({item}) =>{

    const {user,setUser} = useContext(UserContext);

    const {userWishlist,setUserWishlist} = useContext(WishlistContext);


    const RemoveFromWishlist = async(item) => {
            
        //update a wishlist based on the current user's id
        if(user.username != null){
            try{
                const res = await axiosJWT.put(
                    `/api/wishlist/deduct/${user._id}`,{
                    products: [
                        {
                            productId:item.productId,
                            quantity: 1,
                            title:item.title,
                            desc:item.desc,
                            categories:item.categories,
                            size:item.size,
                            color:item.color,
                            price:item.price,
                            img:item.img
                        
                        },
                    ] 
                }).then(res=>{
                    console.log('wishlist item deducted ')
                    console.log(res.data);
                    setUserWishlist(res.data); //update cart context 
        
                }).catch(err=>{
                    console.log('Error is',err);
                })     
            }catch(error){} 
        }
        else{
            console.log("not logged in, cannot add to wishlist");
        }
        
    }

    return(
        <Container>

            <Icon>
                <button style={{border:"none", cursor:"pointer", backgroundColor:"white"}} onClick={()=>{RemoveFromWishlist(item)}}> 
                <DeleteOutlineOutlinedIcon/>
                </button>
            </Icon>

            <ItemImg><Image src = {item.img}/></ItemImg>
            <OrderDate>{item.title}</OrderDate>
            <PayedTo>{item.price}</PayedTo>
            <PayeeEmail>{item.inStock}</PayeeEmail>
        </Container>
    )

}

export default WishlistItem