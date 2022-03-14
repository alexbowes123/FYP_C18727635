import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

import React, { useEffect, useState } from "react";

import {
    BrowserRouter as Router,
    useLocation
  } from "react-router-dom";

const Container = styled.div`
`
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`

const Option = styled.option`
`

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2]
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("newest")

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    console.log(filters);

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>Boxing</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name ="color" onChange = {handleFilters}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select name = "size" onChange={handleFilters}>
                        <Option disabled >
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={e=>setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value ="asc">A-Z (ASC)</Option>
                        <Option value = "desc">A-Z (DES)</Option>
                        <Option value = "price-asc">PRICE (ASC)</Option>
                        <Option value = "price-desc">PRICE (DES)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat = {cat} filters ={filters} sort = {sort} />
            <Footer/>
           
        </Container>
    )
}

export default ProductList