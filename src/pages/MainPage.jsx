import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../atoms/authState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// 컴포넌트 임포트
import Header from "../components/Header";
import Categories from "../components/Categories";

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
`;

const MainContainer = styled.div`
    width: 30vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: white;

    @media (max-width: 480px) {
        width: 100vw;
    }
`;

const ContentsContainer = styled.div``;

const ContentsHeader = styled.div``;

const Contents = styled.div``;

const LogoutBtn = styled.button``;

function MainPage() {
    const [authInfo, setAuthInfo] = useRecoilState(authState);

    const navigate = useNavigate();

    useEffect(() => {
        if (window.Kakao && window.Kakao.Auth) {
            if (!authInfo?.token && !window.Kakao.Auth.getAccessToken()) {
                // 사용자가 로그인된 상태라면 메인 페이지로 리디렉션
                navigate("/");
            }
            console.log(authInfo);
        } else {
            console.log("Kakao 객체가 초기화되지 않았습니다.");
            navigate("/");
        }
    }, [authInfo, navigate]);

    const handleLogout = () => {
        console.log("들어옴");
        if (window.Kakao.Auth.getAccessToken()) {
            window.Kakao.Auth.logout(() => {
                setAuthInfo({ token: null, user: null });
                localStorage.removeItem("authInfo");
                alert("로그아웃 완료");
                navigate("/");
            });
        }
    };

    const currentState = () => {
        // window.Kakao 객체가 존재하는지 확인
        if (window.Kakao && window.Kakao.Auth) {
            const token = window.Kakao.Auth.getAccessToken();
            if (token) {
                console.log("현재 로그인 상태입니다. 토큰: ", token);
            } else {
                console.log("현재 로그아웃 상태입니다.");
            }
        } else {
            console.log("Kakao 객체가 초기화되지 않았습니다.");
        }
    };

    return (
        <TopContainer>
            <MainContainer>
                <Header />
                <Categories />

                <ContentsContainer>
                    <ContentsHeader>
                        {/* 총 짤의 개수 */}

                        {/* 필터링 */}
                    </ContentsHeader>

                    <Contents>{/* 여기 무한 스크롤 세로 */}</Contents>
                </ContentsContainer>
                <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
            </MainContainer>
        </TopContainer>
    );
}

export default MainPage;
