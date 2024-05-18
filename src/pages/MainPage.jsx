import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../atoms/authState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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

function MainPage() {
    const [authInfo, setAuthInfo] = useRecoilState(authState);
    const { user } = useRecoilValue(authState);

    useEffect(() => {
        console.log(authInfo);
        console.log(user);
    }, []);

    const navigate = useNavigate();

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
            <div>환영합니다 {authInfo?.user?.name}님.</div>
            <button onClick={handleLogout}>로그아웃</button>
            <button onClick={currentState}>현재 로그인 상태</button>
        </TopContainer>
    );
}

export default MainPage;
