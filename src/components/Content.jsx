import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopContainer = styled.div`
    width: 166px;
    border: 1px solid black;
    height: 195px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
`;

const TagContainer = styled.div`
    width: 100%;
    display: flex;
    height: 5vh;
    padding-left: 10px;
    align-items: center;
    overflow: hidden;
    position: relative;
`;

const Tag = styled.div`
    height: 20px;
    box-sizing: border-box;
    background-color: black;
    color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 7px;
    padding-right: 7px;
    margin-right: 4px;
    white-space: nowrap;
    position: relative;
`;

function Content({ num }) {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [visibleTags, setVisibleTags] = useState([true, true, true]); // 예시로 3개의 태그를 가정

    const moveDetail = () => {
        navigate(`/detail/${num}`);
    };

    useEffect(() => {
        const handleVisibility = () => {
            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
            const updatedVisibility = Array.from(container.children).map(
                (child) => {
                    const childRect = child.getBoundingClientRect();
                    return (
                        childRect.left >= containerRect.left &&
                        childRect.right < containerRect.right - 7
                    );
                }
            );
            setVisibleTags(updatedVisibility);
        };

        handleVisibility(); // 초기 호출
        window.addEventListener("resize", handleVisibility);

        return () => {
            window.removeEventListener("resize", handleVisibility);
        };
    }, []);

    return (
        <TopContainer onClick={moveDetail}>
            {num}
            <TagContainer ref={containerRef}>
                {visibleTags[0] && <Tag>#태그 1</Tag>}
                {visibleTags[1] && <Tag>#태그 2</Tag>}
                {visibleTags[2] && <Tag>#태그 3aasdaaa</Tag>}
            </TagContainer>
        </TopContainer>
    );
}

export default Content;
