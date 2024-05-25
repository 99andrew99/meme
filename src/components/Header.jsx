import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { useRecoilState } from "recoil";
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
    height: 118px;
    position: relative;
    background-color: #262626;
    z-index: 3;
`;

const MenuContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 22px;
    margin-bottom: 16px;
    align-items: center;
    position: relative;
`;

const TitleIcon = styled.img`
    cursor: pointer;
    margin-left: 10px;
`;

const HamburgerIcon = styled.img`
    width: 25px;
    height: 25px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
`;

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    position: relative;
    margin-bottom: 15px;
`;

const SearchInputSubContainer = styled.div`
    width: 100%;
    height: 40px;
    position: relative;
`;

const SearchInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    border-radius: 10px;
    color: black;
    font-size: 15px;
    font-weight: 500;
    background-color: #ffffff;
    border: none;
    padding-left: 35px;
    position: relative;

    &::placeholder {
        color: #909090;
    }
`;

const SearchHistory = styled.div`
    position: absolute;
    top: 5vh;
    width: 90%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    z-index: 1;
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    flex-direction: column;
    color: black;
`;

const SearchHistoryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
`;

const SearchHistoryTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #9d9d9d;
`;

const SearchHistoryDel = styled.div`
    cursor: pointer;
    font-size: 14px;
`;

const SearchHistoryTexts = styled.div``;

const SearchHistoryContainer = styled.div`
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;

    &:hover {
        background-color: #d4d4d4;
    }
`;

const SearchHistoryIcon = styled.img`
    width: 16px;
    height: 16px;
`;

const SearchHistoryText = styled.span`
    font-size: 16px;
    color: #7b7b7b;
    margin-left: 10px;
    cursor: pointer;
`;

const SearchHistoryDelIcon = styled.img`
    margin-left: auto;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const HamburgerContainer = styled.div`
    width: 100%;
    background-color: #272727;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    position: absolute;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 50px;
    padding-right: 50px;
    z-index: 2;
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
    position: relative;
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
    flex-direction: column;
    justify-content: space-around;
`;

const HamCategoryContainer = styled.div``;

const HamCatergory = styled.div`
    height: 55px;
    display: flex;
    align-items: center;
    position: relative;
    margin: 2px;
    border-bottom: 1px solid #3a3a3b;
    font-size: 14px;

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

const BackIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 20px;
    cursor: pointer;
`;

const IconInputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
`;

const InputSearchIcon = styled.img`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    z-index: 1;
`;

const InputCloseIcon = styled.img`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    cursor: pointer;
`;

const HamCatergoryIcon = styled.img``;

const HamCatergoryText = styled.span`
    font-size: 1.1rem;
    color: #c4c4c4;
    margin-left: 15px;
`;

const HamCatergoryIcon2 = styled.img`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
`;

function Header({ isOther }) {
    const [isFocus, setIsFocus] = useState(false);
    const [isHam, setIsHam] = useState(false);
    const [isclosing, setIsclosing] = useState(false);
    const hamContainerRef = useRef(null);
    const searchHistoryRef = useRef(null);
    const searchInputRef = useRef(null);
    const [authInfo, setAuthInfo] = useRecoilState(authState);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    const handleHistoryDel = () => {
        console.log("del");
    };

    const moveMainPage = () => {
        navigate("/");
    };

    const handleChangeInput = (event) => {
        setSearchInput(event.target.value);
    };

    const delInput = () => {
        setSearchInput("");
    };

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

    const handleBlur = (event) => {
        // Check if the new focused element is inside SearchHistory or not
        if (
            searchHistoryRef.current &&
            !searchHistoryRef.current.contains(event.relatedTarget) &&
            searchInputRef.current &&
            !searchInputRef.current.contains(event.relatedTarget)
        ) {
            setIsFocus(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                hamContainerRef.current &&
                !hamContainerRef.current.contains(event.target) &&
                searchHistoryRef.current &&
                !searchHistoryRef.current.contains(event.target) &&
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target)
            ) {
                handleCloseHam();
                setIsFocus(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hamContainerRef, searchHistoryRef, searchInputRef]);

    const handleLogout = () => {
        if (window.Kakao.Auth.getAccessToken()) {
            window.Kakao.Auth.logout(() => {
                setAuthInfo({ token: null, user: null });
                localStorage.removeItem("authInfo");
                alert("로그아웃 완료");
                navigate("/");
            });
        }
    };

    const moveBack = () => {
        navigate(-1);
    };

    const moveCategory = (event) => {
        const category = event.target.textContent;
        navigate(`/category/${category}`);
    };

    const getRandomPlaceholder = () => {
        const placeholders = [
            "‘무도 유니버스’ 검색해보는 건 어때요?",
            "화가날 땐 밈모아에서 적절한 짤을 찾아보세요",
            "미안할 땐 밈모아에서 적절한 짤을 찾아보세요",
            "귀여운 짤을 찾고 계신가요 잘오셨습니다",
            "기다리고 있었습니다 제대로 모시겠습니다",
            "이 정도 짤도 밈모아에 나와요..?",
            "꽁꽁 얼어붙은 밈모아 위로 밈들이 걸어다닙니다",
            "내가 찾던 짤 밈모아에 있잖아 완전럭키비키잔앙",
            "밈모아적 사고: 걍 일상이 밈으로 이루어져 있음",
            "밈모아 사건: 내가 찾던 밈들이 밈모아에 다 들어와있는 사건이다",
            "다들 밈모아 밈모아 하길래 들어와봤는데 밈모아",
        ];
        return placeholders[Math.floor(Math.random() * placeholders.length)];
    };

    return (
        <HeaderContainer>
            <MenuContainer>
                <TitleIcon src="/imgs/mememoaLogo.svg" onClick={moveMainPage} />
                <HamburgerIcon src="imgs/burger.svg" onClick={handleOpenHam} />
            </MenuContainer>

            <SearchContainer>
                <IconInputContainer>
                    {isOther && (
                        <BackIcon
                            src="imgs/Expand_left_gray.svg"
                            onClick={moveBack}
                        />
                    )}

                    <SearchInputSubContainer>
                        <InputSearchIcon src="/imgs/icon_search.svg" />
                        <SearchInput
                            type="text"
                            placeholder={getRandomPlaceholder()}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChangeInput}
                            value={searchInput}
                            ref={searchInputRef}
                        />
                    </SearchInputSubContainer>

                    <InputCloseIcon
                        src="/imgs/icon_close.svg"
                        onClick={delInput}
                    />
                </IconInputContainer>

                {isFocus && (
                    <SearchHistory
                        ref={searchHistoryRef}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <SearchHistoryHeader>
                            <SearchHistoryTitle>최근검색어</SearchHistoryTitle>
                            <SearchHistoryDel>전체삭제</SearchHistoryDel>
                        </SearchHistoryHeader>

                        <SearchHistoryTexts>
                            <SearchHistoryContainer>
                                <SearchHistoryIcon src="/imgs/icon_search.svg" />
                                <SearchHistoryText>
                                    꽁꽁 얼어붙은
                                </SearchHistoryText>
                                <SearchHistoryDelIcon
                                    src="/imgs/icon_cross_gray.svg"
                                    onMouseDown={handleHistoryDel}
                                />
                            </SearchHistoryContainer>
                            <SearchHistoryContainer>
                                <SearchHistoryIcon src="/imgs/icon_search.svg" />
                                <SearchHistoryText>
                                    꽁꽁 얼어붙은
                                </SearchHistoryText>
                                <SearchHistoryDelIcon
                                    src="/imgs/icon_cross_gray.svg"
                                    onMouseDown={handleHistoryDel}
                                />
                            </SearchHistoryContainer>
                            <SearchHistoryContainer>
                                <SearchHistoryIcon src="/imgs/icon_search.svg" />
                                <SearchHistoryText>
                                    꽁꽁 얼어붙은
                                </SearchHistoryText>
                                <SearchHistoryDelIcon
                                    src="/imgs/icon_cross_gray.svg"
                                    onMouseDown={handleHistoryDel}
                                />
                            </SearchHistoryContainer>
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
                        <TitleIcon
                            src="/imgs/mememoaLogo.svg"
                            onClick={moveMainPage}
                            style={{ marginLeft: "0" }}
                        />
                        <img
                            src="imgs/logout.svg"
                            style={{
                                width: "24px",
                                height: "24px",
                                marginLeft: "10px",
                                cursor: "pointer",
                                position: "absolute",
                                top: "50%",
                                right: "10px",
                                transform: "translateY(-50%)",
                            }}
                            onClick={handleLogout}
                        />
                    </HamLogoContainer>
                    <HamInfoText>
                        <p
                            style={{
                                color: "#64B1FF",
                                fontSize: "1.1rem",
                                margin: "0",
                            }}
                        >
                            짤
                        </p>
                        <p style={{ fontSize: "0.8rem", margin: "0" }}>
                            다른 유형의 밈들도 추가 예정입니다.
                        </p>
                    </HamInfoText>
                    <HamCategoryContainer>
                        <HamCatergory onClick={moveCategory}>
                            <HamCatergoryIcon src="/imgs/sorryIcon.svg" />
                            <HamCatergoryText>미안</HamCatergoryText>
                            <HamCatergoryIcon2 src="/imgs/Chevron-Right.svg" />
                        </HamCatergory>
                        <HamCatergory onClick={moveCategory}>
                            <HamCatergoryIcon src="/imgs/upsetIcon.svg" />
                            <HamCatergoryText>분노</HamCatergoryText>
                            <HamCatergoryIcon2 src="/imgs/Chevron-Right.svg" />
                        </HamCatergory>
                        <HamCatergory onClick={moveCategory}>
                            <HamCatergoryIcon src="/imgs/cuteIcon.svg" />
                            <HamCatergoryText>큐트</HamCatergoryText>
                            <HamCatergoryIcon2 src="/imgs/Chevron-Right.svg" />
                        </HamCatergory>
                        <HamCatergory onClick={moveCategory}>
                            <HamCatergoryIcon src="/imgs/thanksIcon.svg" />
                            <HamCatergoryText>감사</HamCatergoryText>
                            <HamCatergoryIcon2 src="/imgs/Chevron-Right.svg" />
                        </HamCatergory>
                        <HamCatergory onClick={moveCategory}>
                            <HamCatergoryIcon src="/imgs/funnyIcon.svg" />
                            <HamCatergoryText>웃김</HamCatergoryText>
                            <HamCatergoryIcon2 src="/imgs/Chevron-Right.svg" />
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
