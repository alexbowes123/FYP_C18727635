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
                    : "http://localhost:5000/api/products");

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
        if(sort==="asc"){
            setFilteredProducts((prev) => 
                [...prev].sort((a,b) => a.title.localeCompare(b.title))
            );
        } else if (sort ==="desc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a,b)=> b.title.localeCompare(a.title))
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