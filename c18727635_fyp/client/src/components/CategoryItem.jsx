import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
    flex:1;
    margin: 3px;
    height:48vh;
    width:80%;
    position: relative;

`
const Image = styled.img`
    width: 100%;
    height:100%;


`
const Info= styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    fontWeight: bold;
`

const CategoryItem = ({item}) => {
    return(
        <Container>
          <Link to={`/products/${item.cat}`}>
            <Image src = {item.img}/>
            <Info>
                <Title><i>{item.title}</i></Title> 
            </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem