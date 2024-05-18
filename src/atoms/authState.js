import { atom } from "recoil";

// 사용자 인증 정보와 상태를 저장
export const authState = atom({
    key: "authState", // Recoil 상태의 고유 키
    default: {
        token: null, // 초기 상태에서 토큰은 null로 설정
        user: null, // 초기 상태에서 사용자 정보는 null로 설정
    },
});
