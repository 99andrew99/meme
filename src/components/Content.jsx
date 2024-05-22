import styled from "styled-components";

const TopContainer = styled.div`
    width: calc(100% - 10px);
    border: 1px solid black;
    height: 195px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
`;

const TagContainer = styled.div`
    width: 100%;
    display: flex;
    height: 5vh;
    justify-content: space-around;
    align-items: center;
`;

const Tag = styled.div`
    width: 30%;
    height: 3vh;
    background-color: black;
    color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`;

function Content({ num }) {
    return (
        <TopContainer>
            {num}
            <TagContainer>
                <Tag>#태그 1</Tag>
                <Tag>#태그 2</Tag>
                <Tag>#태그 3</Tag>
            </TagContainer>
        </TopContainer>
    );
}

export default Content;
