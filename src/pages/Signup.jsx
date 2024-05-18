import styled from "styled-components";

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
