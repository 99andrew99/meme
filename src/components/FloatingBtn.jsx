import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopContainer = styled.div`
    width: 56px;
    height: 56px;
    background-color: black;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    bottom: 5%;
    right: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 4px black;
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
