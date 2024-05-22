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
    /* background-color: tomato; */
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    justify-content: space-between;
`;

const Name = styled.span`
    font-size: 1.3rem;
    font-weight: 500;

    @media (max-width: 480px) {
        font-size: 1.1rem;
    }
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

const MainContents = styled.div`
    width: 100%;
    height: 10vh;
    word-wrap: break-word; /* 긴 단어도 줄바꿈 */
    white-space: normal; /* 줄바꿈 활성화 */
    font-size: 1.3rem;
    font-weight: 500;
    box-sizing: border-box;
    padding: 20px;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    box-sizing: border-box;
    padding: 20px;
`;

const Tag = styled.div`
    background-color: black;
    color: white;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 20px;
    display: flex;
    align-items: center;
`;

function DetailPage() {
    return (
        <TopContainer>
            <MainContainer>
                <MainImg src="/imgs/danso.png" />

                <Header>
                    <Name>터벅터벅터벅 나의 일상</Name>
                    <IconContainer>
                        <HeaderIcon src="/imgs/fi-rr-bookmark.svg" />
                        <HeaderIcon src="/imgs/fi-rr-heart.svg" />
                        <HeaderIcon src="/imgs/fi-rr-share.svg" />
                    </IconContainer>
                </Header>

                <MainContents>터벅터벅이다 터벅터벅</MainContents>

                <Tags>
                    <Tag>#1호선</Tag>
                    <Tag>#단소살인마</Tag>
                    <Tag>#터벅터벅나의일상</Tag>
                    <Tag>#팍씨안때려</Tag>
                    <Tag>#팍씨안때려</Tag>
                </Tags>
            </MainContainer>
        </TopContainer>
    );
}

export default DetailPage;
