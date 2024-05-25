import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    size: 30px;
    background-color: black;
`;

const MainContainer = styled.div`
    width: 480px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    position: relative;
    @media (max-width: 480px) {
        width: 100vw;
    }
`;

const MainImg = styled.img`
    width: 100%;
    height: 45vh;
`;

const Header = styled.div`
    display: flex;
    height: 10vh;
    width: 100%;
    position: absolute;
    /* background-color: tomato; */
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    justify-content: space-between;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100px;
    justify-content: space-around;
`;

const HeaderIcon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const TagContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
`;

const TagTitle = styled.p`
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 1.1rem;
    font-weight: 500;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
`;

const Tag = styled.div`
    background-color: transparent;
    color: #434343;
    border: 1px solid #434343;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    font-weight: 300;
    font-size: 0.9rem;
`;

const SharePopupContainer = styled.div`
    width: 292px;
    /* height: 128px; */
    /* height: 5vh; */
    background-color: white;
    border-radius: 10px;
    color: black;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
    position: absolute;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const SharePopupText = styled.span`
    font-size: 14px;
`;

const SharePopupBtn = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    background-color: black;
    color: white;
    cursor: pointer;
`;

const CategoryContainer = styled.div`
    box-sizing: border-box;
    padding-left: 20px;
    display: flex;
    align-items: center;
    /* height: 8vh; */
    cursor: pointer;
    border-bottom: 1px solid #e9e9e9;
    padding-top: 20px;
    padding-bottom: 20px;
`;

const CategoryText = styled.span`
    color: #555555;
`;
const CategoryImg = styled.img`
    margin-left: 5px;
`;

const MainContentsContainer = styled.div`
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    /* height: 30vh; */
    /* justify-content: space-around; */
    border-bottom: 12px solid #e9e9e9;
`;

const MainContentsTitle = styled.p`
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 1.5rem;
`;

const MainContents = styled.div`
    width: 100%;
    word-wrap: break-word; /* 긴 단어도 줄바꿈 */
    white-space: normal; /* 줄바꿈 활성화 */
    font-size: 1.3rem;
    font-weight: 500;
    box-sizing: border-box;
    padding: 20px;
    background-color: #f5f5f5;
    color: #434343;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 20px;
`;

function DetailPage() {
    const [isShare, setIsShare] = useState(false);
    const [isPrepare, setIsPrepare] = useState(false);
    const navigate = useNavigate();

    const handleShare = () => {
        setIsShare(true);

        setTimeout(() => {
            setIsShare(false);
        }, 3000);
    };

    const handlePrepare = () => {
        setIsPrepare(true);
    };

    const handleClosePrepare = () => {
        setIsPrepare(false);
    };

    const handleMoveBack = () => {
        navigate(-1);
    };

    const handleMoveCategory = (category) => {
        navigate(`/category/${category}`);
    };

    return (
        <TopContainer>
            <MainContainer>
                <MainImg src="/imgs/danso.png" />

                <Header>
                    <HeaderIcon
                        src="/imgs/icon_back.svg"
                        onClick={handleMoveBack}
                    />
                    <IconContainer>
                        <HeaderIcon
                            src="/imgs/fi-rr-bookmark.svg"
                            onClick={handlePrepare}
                        />
                        <HeaderIcon
                            src="/imgs/fi-rr-heart.svg"
                            onClick={handlePrepare}
                        />
                        <HeaderIcon
                            src="/imgs/fi-rr-share.svg"
                            onClick={handleShare}
                        />
                    </IconContainer>
                </Header>

                {isShare && (
                    <SharePopupContainer
                        style={{
                            fontSize: "20px",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                        }}
                    >
                        링크가 공유되었습니다.
                    </SharePopupContainer>
                )}
                {isPrepare && (
                    <SharePopupContainer>
                        <SharePopupText style={{ marginTop: "20px" }}>
                            어? 뭐야! 아~ 씨X!!
                        </SharePopupText>
                        <SharePopupText>
                            서비스를 위해 만들고 있는 중인데 미치겠다.
                        </SharePopupText>
                        <SharePopupBtn onClick={handleClosePrepare}>
                            어어..; 그래 수고해
                        </SharePopupBtn>
                    </SharePopupContainer>
                )}

                <CategoryContainer onClick={() => handleMoveCategory("웃김")}>
                    <CategoryText>웃김</CategoryText>
                    <CategoryImg src="/imgs/icon_right.svg" />
                </CategoryContainer>

                <MainContentsContainer>
                    <MainContentsTitle>밈 이름</MainContentsTitle>
                    <MainContents>
                        밈에 관한 설명입니다.밈에 관한 설명입니다.밈에 관한
                        설명입니다.밈에 관한 설명입니다.밈에 관한
                        설명입니다.밈에 관한 설명입니다.
                    </MainContents>
                </MainContentsContainer>

                <TagContainer>
                    <TagTitle>태그</TagTitle>
                    <Tags>
                        <Tag>#1호선</Tag>
                        <Tag>#단소살인마</Tag>
                        <Tag>#터벅터벅나의일상</Tag>
                        <Tag>#팍씨안때려</Tag>
                        <Tag>#팍씨안때려</Tag>
                    </Tags>
                </TagContainer>
            </MainContainer>
        </TopContainer>
    );
}

export default DetailPage;
