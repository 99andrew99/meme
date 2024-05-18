import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authState";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

    @media (max-width: 480px) {
        width: 100vw;
    }
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const MemeText = styled.p`
    text-align: center;
    animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 1.5s ease-in-out;
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

    const memeTexts = [
        "꽁꽁 얼어붙은 한강 위로 고양이가 걸어다닙니다",
        "탕탕 후루후루 탕탕 후루루루루",
        "어쩌구저쩌구 하지 말고 맞다이로 들어와",
        "야레야레, 못 말리는 아가씨",
        "바래다줄게. 바래? 다 줄게",
    ];

    const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
    const [visible, setVisible] = useState(true);

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

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setCurrentMemeIndex((prevIndex) =>
                    prevIndex === memeTexts.length - 1 ? 0 : prevIndex + 1
                );
                setVisible(true);
            }, 1500); // fadeOut 애니메이션이 끝날 때까지 대기
        }, 3000); // 3초 간격으로 변경

        return () => clearInterval(interval);
    }, [memeTexts.length]);

    return (
        <TopContainer>
            <ContentsContainer>
                <TitleContainer>
                    <WelcomeText>만나서 반가워요!</WelcomeText>
                    <InfoText>서비스를 소개하는 문구입니다.</InfoText>
                </TitleContainer>
                <MemeContainer>
                    <MemeText visible={visible}>
                        {memeTexts[currentMemeIndex]}
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
