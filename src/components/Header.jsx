import { useState } from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 12vh;
    /* background-color: tomato; */
`;

const MenuContaienr = styled.div`
    display: flex;
    width: 100%;
    height: 5vh;
    justify-content: space-between;
    border-bottom: 1px solid #d4d4d4;
    align-items: center;
    /* background-color: aqua; */
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
    /* margin-left: 10px; */
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

function Header() {
    const [isFocus, setIsFocus] = useState(false);

    const handleFocus = () => {
        setIsFocus(true);
    };

    const handleBlur = () => {
        setIsFocus(false);
    };

    return (
        <HeaderContainer>
            <MenuContaienr>
                <Title>밈모아</Title>
                <HamburgerIcon src="imgs/burger.svg" />
            </MenuContaienr>

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
                            <SearchHistoryText>꽁꽁 얼어붙은</SearchHistoryText>
                            <SearchHistoryText>야레야레</SearchHistoryText>
                            <SearchHistoryText>아이~ 씨x</SearchHistoryText>
                        </SearchHistoryTexts>
                    </SearchHistory>
                )}
            </SearchContainer>
        </HeaderContainer>
    );
}

export default Header;
