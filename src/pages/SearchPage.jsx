import styled from "styled-components";

// 컴포넌트 임포트
import Header from "../components/Header";
import Categories from "../components/Categories";
import Contents from "../components/Contents";
import FloatingBtn from "../components/FloatingBtn";

const TopContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    size: 30px;
    background-color: black;
    /* overflow-y: hidden; */
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

function SearchPage() {
    return (
        <TopContainer>
            <MainContainer>
                <Header isOther={true} />
                <Categories />
                {/* <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn> */}
                <Contents isHeader={true} />

                <FloatingBtn />
            </MainContainer>
        </TopContainer>
    );
}

export default SearchPage;
