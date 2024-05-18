import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TopContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginBtn = styled.img`
    &:hover {
        cursor: pointer;
    }
`;
function Signup() {
    const { user } = useRecoilValue(authState);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if (user && window.Kakao.Auth.getAccessToken()) {
            // 사용자가 로그인된 상태라면 메인 페이지로 리디렉션
            navigate("/main");
        }
    }, [user, navigate]);

    const handleOnclickLogin = () => {
        window.Kakao.Auth.authorize({
            redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        });
    };

    return (
        <TopContainer>
            <LoginBtn
                src="imgs/kakao_login_medium_wide.png"
                onClick={handleOnclickLogin}
            />
        </TopContainer>
    );
}

export default Signup;
