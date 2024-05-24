import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopContainer = styled.div`
    width: 75px;
    height: 75px;
    background-color: #2e90ff;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    bottom: 12%;
    right: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 4px black;

    @media (max-width: 470px) {
        width: 74px;
        height: 74px;
    }
`;

const Img = styled.img`
    width: 24px;
    height: 24px;
`;

function FloatingBtn() {
    const navigate = useNavigate();
    //등록 버튼 눌렀을때 등록 페이지로 전환
    const moveToCreate = () => {
        console.log("movemove");
        navigate("/create");
    };

    return (
        <TopContainer onClick={moveToCreate}>
            <Img src="imgs/add-24px.svg" />
        </TopContainer>
    );
}

export default FloatingBtn;
