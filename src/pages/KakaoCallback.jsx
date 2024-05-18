import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const KakaoCallback = () => {
    const location = useLocation(); // 현재 위치 정보를 얻기 위한 훅
    const navigate = useNavigate(); // 히스토리 객체를 얻기 위한 훅

    useEffect(() => {
        const code = new URLSearchParams(location.search).get("code"); // URL에서 'code' 파라미터 추출

        if (code) {
            // Authorization code를 사용하여 액세스 토큰을 요청하는 로직을 추가 가능
            // 여기서는 단순히 콘솔에 코드 출력
            console.log("Authorization code:", code);

            // 예: 액세스 토큰을 요청하고 필요한 처리를 수행
            // accessTokenRequest(code);

            // 로그인 완료 후 홈으로 리디렉션
            navigate("/"); // 홈 경로로 리디렉션
        }
    }, [location, navigate]); // location과 navigate 변경될 때마다 이 효과를 실행

    return (
        <div>
            <p>로그인중입니다...</p>
        </div>
    );
};

export default KakaoCallback;
