import  styled  from "styled-components";
import { sportCategories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #232323;
`

const Categories = () => {
    return (
    <Container>
        {sportCategories.map((item) => (
            <CategoryItem item = {item} key = {item.id}/>
        ))}
    </Container>
    );
};

export default Categories;