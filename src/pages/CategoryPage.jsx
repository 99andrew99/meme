import styled from "styled-components";

const TopContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    size: 30px;
    background-color: black;
`;

const MainContainer = styled.div`
    width: 480px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    position: relative;
    @media (max-width: 480px) {
        width: 100vw;
    }
`;

function CategoryPage({ category }) {
    return (
        <TopContainer>
            <MainContainer>{category}</MainContainer>
        </TopContainer>
    );
}

export default CategoryPage;
