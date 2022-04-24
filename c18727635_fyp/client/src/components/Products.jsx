import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";

//import axios to get products from the db
import { axiosBASE } from "../refresh"


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`

const Products = ({cat,filters,sort}) => {

    //fetching data for products 

    const [products,setProducts] = useState([]);

    //when filters are updated, update the products    
    const [filteredProducts,setFilteredProducts] = useState([]);

      // FUNCTION TO GET PRODUCTS
      const getProducts = async () =>{
        try{
            const res = await axiosBASE.get(`/api/products/${cat}`); //get products with the same category
            
            // output products retrieved from db    
            console.log(res);
            setProducts(res.data);
        } catch(error){}
    };
 

    useEffect(()=>{

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