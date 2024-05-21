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
`;

const Img = styled.img`
    width: 24px;
    height: 24px;
`;

function FloatingBtn() {
    return (
        <TopContainer>
            <Img src="imgs/add-24px.svg" />
        </TopContainer>
    );
}

export default FloatingBtn;
