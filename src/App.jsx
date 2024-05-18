import React, { useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import { Routes, Route, BrowserRouter } from "react-router-dom";

//페이지 임포트
import Signup from "./pages/Signup";

//로그인
import KakaoCallback from "./pages/KakaoCallback";

function App() {
    useEffect(() => {
        const kakaoKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey);
        }
    }, []);

    return (
        <BrowserRouter>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route
                    path="/oauth/callback/kakao"
                    element={<KakaoCallback />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
