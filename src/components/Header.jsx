import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../atoms/authState";

const slideDown = keyframes`
    from {
        transform: translateY(-100%);
        opacity: 1;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-100%);
    }

`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 12vh;
    position: relative;
`;

const MenuContainer = styled.div`
    display: flex;
    width: 100%;
    height: 5vh;
    justify-content: space-between;
    border-bottom: 1px solid #d4d4d4;
    align-items: center;
`;

const Title = styled.div`
    color: black;
    font-size: 20px;
    font-weight: 600;
    margin-left: 10px;
    cursor: pointer;
`;

const HamburgerIcon = styled.img`
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin-right: 10px;
`;

const SearchContainer = styled.div`
    width: 100%;
    height: 7vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    position: relative;
`;

const SearchInput = styled.input`
    width: calc(100% - 20px);
    box-sizing: border-box;
    height: 4vh;
    border-radius: 10px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    background-color: #e3e3e3;
    border: none;
    padding-left: 10px;
    &::placeholder {
        color: #909090;
    }
`;

const SearchHistory = styled.div`
    position: absolute;
    top: 5vh;
    width: 90%;
    height: 15vh;
    background-color: white;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    z-index: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    color: black;
`;

const SearchHistoryHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SearchHistoryTitle = styled.div`
    font-weight: 600;
`;

const SearchHistoryDel = styled.div`
    cursor: pointer;
`;

const SearchHistoryTexts = styled.div``;

const SearchHistoryText = styled.div`
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    &:hover {
        background-color: #d4d4d4;
    }
`;

const HamburgerContainer = styled.div`
    width: 100%;
    height: 50vh;
    background-color: #272727;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    position: absolute;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 50px;
    padding-right: 50px;
    animation: ${({ isclosing }) =>
        isclosing
            ? css`
                  ${slideUp} 0.5s ease-out
              `
            : css`
                  ${slideDown} 0.5s ease-out
              `};
`;

const HamLogoContainer = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
`;

const HamServiceName = styled.div`
    margin-left: 10px;
    font-weight: 600;
`;

const HamInfoText = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
`;

const HamCategoryContainer = styled.div``;

const HamCatergory = styled.div`
    height: 55px;
    display: flex;
    align-items: center;
    margin: 2px;
    border-bottom: 1px solid #3a3a3b;
    font-size: 14px;
    padding-left: 30px;

    &:hover {
        background-color: #3a3a3b;
        cursor: pointer;
    }
`;

const HamCloseIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
`;

const HamCloseIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

function Header() {
    const [isFocus, setIsFocus] = useState(false);
    const [isHam, setIsHam] = useState(false);
    const [isclosing, setIsclosing] = useState(false);
    const hamContainerRef = useRef(null);
    const [authInfo, setAuthInfo] = useRecoilState(authState);
    const navigate = useNavigate();

    const handleOpenHam = () => {
        setIsHam(true);
    };

    const handleCloseHam = () => {
        setIsclosing(true);

        setTimeout(() => {
            setIsHam(false);
            setIsclosing(false);
        }, [500]);
    };

    const handleFocus = () => {
        setIsFocus(true);
    };

    const handleBlur = () => {
        setIsFocus(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                hamContainerRef.current &&
                !hamContainerRef.current.contains(event.target)
            ) {
                handleCloseHam();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hamContainerRef]);

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

    return (
        <HeaderContainer>
            <MenuContainer>
                <Title>mememoa</Title>
                <HamburgerIcon src="imgs/burger.svg" onClick={handleOpenHam} />
            </MenuContainer>

            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder='  "무도 유니버스" 검색해보는 건 어때요?'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {isFocus && (
                    <SearchHistory>
                        <SearchHistoryHeader>
                            <SearchHistoryTitle>최근검색어</SearchHistoryTitle>
                            <SearchHistoryDel>전체삭제</SearchHistoryDel>
                        </SearchHistoryHeader>
                        <SearchHistoryTexts>
                            <SearchHistoryText
                                onMouseDown={() => {
                                    console.log("꽁꽁");
                                }}
                            >
                                꽁꽁 얼어붙은
                            </SearchHistoryText>
                            <SearchHistoryText>야레야레</SearchHistoryText>
                            <SearchHistoryText>
                                아이~ 씨x 시민을 위해서 어쩌구
                            </SearchHistoryText>
                        </SearchHistoryTexts>
                    </SearchHistory>
                )}
            </SearchContainer>
            {isHam && (
                <HamburgerContainer
                    ref={hamContainerRef}
                    isclosing={isclosing ? 1 : 0}
                >
                    <HamLogoContainer>
                        <img src={"imgs/tempLogo.png"} />
                        <HamServiceName>mememoa</HamServiceName>
                        <img
                            src="imgs/logout.svg"
                            style={{
                                width: "24px",
                                height: "24px",
                                marginLeft: "10px",
                                cursor: "pointer",
                            }}
                            onClick={handleLogout}
                        />
                    </HamLogoContainer>
                    <HamInfoText>
                        짤(다른 유형의 밈들도 추가 예정입니다!)
                    </HamInfoText>
                    <HamCategoryContainer>
                        <HamCatergory onClick={handleCloseHam}>
                            카테고리
                        </HamCatergory>
                        <HamCatergory onClick={handleCloseHam}>
                            카테고리
                        </HamCatergory>
                        <HamCatergory onClick={handleCloseHam}>
                            카테고리
                        </HamCatergory>
                        <HamCatergory onClick={handleCloseHam}>
                            카테고리
                        </HamCatergory>
                        <HamCatergory onClick={handleCloseHam}>
                            카테고리
                        </HamCatergory>
                    </HamCategoryContainer>
                    <HamCloseIconContainer>
                        <HamCloseIcon
                            src={"imgs/caretUp.png"}
                            onClick={handleCloseHam}
                        />
                    </HamCloseIconContainer>
                </HamburgerContainer>
            )}
        </HeaderContainer>
    );
}

export default Header;
