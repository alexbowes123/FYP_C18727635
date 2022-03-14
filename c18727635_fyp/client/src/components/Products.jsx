import { useEffect, useState } from "react";
import styled from "styled-components";
import {popularProducts} from "../data";
import Product from "./Product";
import user from "./LoginForm";
import Cookies from "js-cookie";

//import axios to get products from the db
import axios from "axios";
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

        // FUNCTION TO GET PRODUCTS
        const getProducts = async () =>{
            try{
                // if there is a category parameter, fetch by category, else
                // get all products
                const res = await axios.get(
                    cat
                    ? `http://localhost:5000/api/products?category=${cat}` 
                    // : "http://localhost:5000/api/products");
                    : "http://localhost:5000/api/products", { headers: {"token" : "Bearer "+Cookies.get('authorization')} });

                    //example of token passed as header
                    // : "http://localhost:5000/api/products", { headers: {"token" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjllOWEwNDkyOTM0ZDZhNTUzZmY4YiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDcwODg0NjIsImV4cCI6MTY0NzM0NzY2Mn0.XNYvyd1DXnk7--D5D5Akz-QKhDH50HpMtw-ZiQqOWYc"} });
                    //pass token in request as header 

                // output products retrieved from db    
                console.log(res);
                setProducts(res.data);
            } catch(error){}
        };
        getProducts();
        
    },[cat]); // Dependency: when the category changes, run the useEffect

    useEffect(()=>{
        cat && setFilteredProducts(
            products.filter(item=> Object.entries(filters).every(([key,value]) =>
                item[key].includes(value)
                )
            )

        );
    },[products,cat,filters])


    //SORT ITEMS ALPHABETICALLY
    useEffect(() =>{

        const parsePrice = x => parseFloat(x.replace(/^\€/, '')) || 0
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
                [...prev].sort((a,b)=> parsePrice(b.price) - parsePrice(a.price))
            );
        }
        else if (sort == "price-desc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a,b)=> parsePrice(b.price) - (parsePrice(a.price)))
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