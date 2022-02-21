import  styled  from "styled-components";
import { sportCategories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
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