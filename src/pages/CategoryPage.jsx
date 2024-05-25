import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Contents from "../components/Contents";

const TopContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* size: 30px; */
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

const BackIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-top: 24px;
    margin-left: 20px;
`;

const CategoryTitleContainer = styled.p`
    width: 100%;
    margin-top: 34px;
    margin-left: 20px;
    display: flex;
    align-items: center;
`;
const CategoryTitleIcon = styled.img`
    width: 24px;
    height: 24px;
`;
const CategoryTitleText = styled.span`
    font-size: 24px;
    font-weight: 500;
    margin-left: 10px;
`;

const CategoryInfoContainer = styled.div`
    display: flex;
    margin-top: 24px;
    flex-direction: column;
    margin-left: 20px;
    margin-bottom: 20px;
`;
const CategoryInfoText = styled.span`
    font-size: 14px;
    color: #434343;
`;

function CategoryPage() {
    const navigate = useNavigate();
    const { categoryName } = useParams();
    let iconUrl = "";

    if (categoryName == "미안") {
        iconUrl = "/imgs/sorryIcon.svg";
    } else if (categoryName == "분노") {
        iconUrl = "/imgs/upsetIcon.svg";
    } else if (categoryName == "큐트") {
        iconUrl = "/imgs/cuteIcon.svg";
    } else if (categoryName == "감사") {
        iconUrl = "/imgs/thanksIcon.svg";
    } else if (categoryName == "웃김") {
        iconUrl = "/imgs/funnyIcon.svg";
    }

    const moveBack = () => {
        navigate(-1);
    };

    return (
        <TopContainer>
            <MainContainer>
                <BackIcon src="/imgs/Expand_left_gray.svg" onClick={moveBack} />
                <CategoryTitleContainer>
                    <CategoryTitleIcon src={iconUrl} />
                    <CategoryTitleText>{categoryName}</CategoryTitleText>
                </CategoryTitleContainer>
                <CategoryInfoContainer>
                    <CategoryInfoText>
                        해당 카테고리에 대한 모음 페이지입니다.
                    </CategoryInfoText>
                    <CategoryInfoText>
                        적절한 멘트와 소개입니다.
                    </CategoryInfoText>
                    <CategoryInfoText>
                        세 줄까지 원하셔서 추가했습니다.
                    </CategoryInfoText>
                </CategoryInfoContainer>

                <Contents isHeader={false} />
            </MainContainer>
        </TopContainer>
    );
}

export default CategoryPage;
