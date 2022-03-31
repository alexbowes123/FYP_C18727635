import { useEffect, useState } from "react";
import styled from "styled-components";
import {popularProducts} from "../data";
import Product from "./Product";
import user from "./LoginForm";
import Cookies from "js-cookie";


//import axios to get products from the db
import axios from "axios";
import { axiosJWT } from "../refresh"
import LoginForm from "./LoginForm";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({cat,filters,sort}) => {
    // console.log(cat,filters,sort);

    //fetching data for products 


    //an empty array
    const [products,setProducts] = useState([]);

    //when filters are updated, update the products    
    const [filteredProducts,setFilteredProducts] = useState([]);
 

    useEffect(()=>{

        console.log("token is" + Cookies.get('authorization'));

        // FUNCTION TO GET PRODUCTS
        const getProducts = async () =>{
            try{
                //run the axios.interceptor to genereate the token before this request
                const res = await axiosJWT.get(
                    cat
                    ? `/api/products?category=${cat}` 
                    // : "/api/products");
                    : "/api/products", { headers: {"token" : "Bearer "+Cookies.get('authorization')} });


                // output products retrieved from db    
                console.log(res);
                setProducts(res.data);
            } catch(error){}
        };
        getProducts();
        
    },[cat]); // Dependency: when the category changes, run the useEffect

    //filtering 
    useEffect(()=>{
        cat && setFilteredProducts(
            products.filter(item=> Object.entries(filters).every(([key,value]) =>
                item[key].includes(value)
                )
            )

        );
    },[products,cat,filters])


    //SORT ITEMS ALPHABETICALLY OR BY PRICE
    useEffect(() =>{

        if(sort==="asc"){
            setFilteredProducts((prev) => 
                [...prev].sort((a,b) => a.title.localeCompare(b.title))
            );
        } else if (sort ==="desc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a,b)=> b.title.localeCompare(a.title))
            );
        }
        else if (sort == "price-asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a,b)=> a.price - b.price)
            );
        }
        else if (sort == "price-desc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a,b)=> b.price - a.price)
            );
        }
    },[sort]);

    return (
        <Container>
            {filteredProducts.map(item=>(
                <Product item={item} key = {item.id}/>
            ))}
        </Container>
    )
}

export default Products