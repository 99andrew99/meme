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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`;

const ContentsContainer = styled.div`
    width: 50vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const WelcomeText = styled.p`
    text-align: center;
    font-size: 50px;
    margin: 20px;
    font-weight: 500;
`;
const InfoText = styled.p`
    text-align: center;
    font-size: 20px;
`;

const TitleContainer = styled.div``;

const MemeContainer = styled.div``;

const MemeText = styled.p`
    text-align: center;
`;

const TeamNameContainer = styled.div``;

const TeamName = styled.p``;

const LoginBtn = styled.img`
    margin-top: 10px;
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
            <ContentsContainer>
                <TitleContainer>
                    <WelcomeText>만나서 반가워요!</WelcomeText>
                    <InfoText>서비스를 소개하는 문구입니다.</InfoText>
                </TitleContainer>
                <MemeContainer>
                    <MemeText>
                        여기 텍스트 밈 한줄 랜덤으로 띄워주고싶어요!
                    </MemeText>
                </MemeContainer>
            </ContentsContainer>
            <LoginBtn
                src="imgs/kakao_login_medium_wide.png"
                onClick={handleOnclickLogin}
            />
            <TeamNameContainer>
                <TeamName>405TEN001</TeamName>
            </TeamNameContainer>
        </TopContainer>
    );
}

export default Signup;
