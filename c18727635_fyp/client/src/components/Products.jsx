import { useEffect, useState } from "react";
import styled from "styled-components";
import {popularProducts} from "../data";
import Product from "./Product";

//import axios to get products from the db
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({cat,filters,sort}) => {
    console.log(cat,filters,sort);

    const [products,setProducts] = useState([]);
    const [filteredProducts,setFilteredProducts] = useState([]);

    useEffect(()=>{
        const getProducts = async () =>{
            try{
                // get products, if there is a category parameter, fetch by category, else
                // get all products
                const res = await axios.get(
                    cat
                    ? `http://localhost:5000/api/products?category=${cat}` 
                    : "http://localhost:5000/api/products");
                console.log(res);
            } catch(error){}
        };
            getProducts();//
        
    },[cat]);

    return (
        <Container>
            {popularProducts.map(item=>(
                <Product item={item} key = {item.id}/>
            ))}
        </Container>
    )
}

export default Products