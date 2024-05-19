import React, { useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "./atoms/authState";

//페이지 임포트
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
//로그인
import KakaoCallback from "./pages/KakaoCallback";

function App() {
    const basename = import.meta.env.VITE_BASE || "/";
    const setAuthInfo = useSetRecoilState(authState);

    useEffect(() => {
        const kakaoKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey);
        }

        // 애플리케이션이 로드될 때 로컬 스토리지에서 사용자 정보를 불러옴
        const storedAuthInfo = localStorage.getItem("authInfo");
        if (storedAuthInfo) {
            const authInfo = JSON.parse(storedAuthInfo);
            setAuthInfo(authInfo);
            window.Kakao.Auth.setAccessToken(authInfo.token); // Kakao SDK에 액세스 토큰 설정
        }
    }, []);

    return (
        // <BrowserRouter basename={basename}>
        <BrowserRouter>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/main" element={<MainPage />} />
                <Route
                    path="/oauth/callback/kakao"
                    element={<KakaoCallback />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
