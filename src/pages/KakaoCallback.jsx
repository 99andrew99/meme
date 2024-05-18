import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authState } from "../atoms/authState";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const TopContainer = styled.div`
    width: 100vw;
    height: 100vh;
    color: white;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const LoadingText = styled.p`
    font-size: 20px;
`;

const KakaoCallback = () => {
    const location = useLocation(); // 현재 위치 정보를 얻기 위한 훅
    const navigate = useNavigate(); // 히스토리 객체를 얻기 위한 훅
    const setAuthInfo = useSetRecoilState(authState);

    useEffect(() => {
        const code = new URLSearchParams(location.search).get("code"); // URL에서 'code' 파라미터 추출

        if (code) {
            fetch(`https://kauth.kakao.com/oauth/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY,
                    redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
                    code,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    const { access_token } = data;

                    // console.log("데이터: ", data);

                    // Kakao SDK에 액세스 토큰 설정
                    if (window.Kakao) {
                        window.Kakao.Auth.setAccessToken(access_token);
                    }

                    fetch("https://kapi.kakao.com/v2/user/me", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((userData) => {
                            // console.log("유저 데이터: ", userData);
                            // console.log(
                            //     "카카오 이메일: ",
                            //     userData.kakao_account.email
                            // );
                            // console.log(
                            //     "카카오 이름: ",
                            //     userData.kakao_account.profile.nickname
                            // );
                            const user = {
                                name: userData.kakao_account.profile.nickname,
                                email: userData.kakao_account.email,
                            };

                            const authInfo = {
                                token: access_token,
                                user,
                            };

                            setAuthInfo(authInfo);

                            localStorage.setItem(
                                "authInfo",
                                JSON.stringify(authInfo)
                            ); // 로컬 스토리지에 저장

                            navigate("/main"); // 메인 페이지 경로로 리디렉션
                        });
                })
                .catch((error) => {
                    console.log("로그인 중 에러 발생: ", error);
                    navigate("/"); // 홈 경로로 리디렉션
                });
        }
    }, [location, navigate]); // location과 navigate 변경될 때마다 이 효과를 실행

    return (
        <TopContainer>
            <LoadingText>로그인중입니다...</LoadingText>
        </TopContainer>
    );
};

export default KakaoCallback;
