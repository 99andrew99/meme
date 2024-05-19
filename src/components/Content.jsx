import styled from "styled-components";

const TopContainer = styled.div`
    width: calc(100% - 10px);
    border: 1px solid black;
    height: 195px;
`;

function Content({ num }) {
    return <TopContainer>{num}</TopContainer>;
}

export default Content;
