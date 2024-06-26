import { useRef, useState } from "react";
import styled from "styled-components";

const CategoryContainer = styled.div`
    /* 마진 탑 임시 */
    width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
    box-sizing: border-box;
    cursor: ${(props) => (props.isDragging ? "grabbing" : "grab")};
`;

const Category = styled.div`
    width: 100px;
    height: 4vh;
    background-color: white;
    color: black;
    border: 1px solid black;
    border-radius: 20px;
    margin: 5px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: black;
        color: white;
    }
`;

function Categories() {
    const categoryRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const startDragging = (event) => {
        setIsDragging(true);
        setStartX(event.pageX - categoryRef.current.offsetLeft);
        setScrollLeft(categoryRef.current.scrollLeft);
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;
        event.preventDefault();
        const x = event.pageX - categoryRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        categoryRef.current.scrollLeft = scrollLeft - walk;
    };
    return (
        <CategoryContainer
            ref={categoryRef}
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={handleMouseMove}
            isDragging={isDragging}
        >
            {/* 여기 가로 스크롤 */}
            <Category>#무한도전1</Category>
            <Category>#무한도전2</Category>
            <Category>#무한도전3</Category>
            <Category>#무한도전4</Category>
            <Category>#무한도전5</Category>
            <Category>#무한도전6</Category>
            <Category>#무한도전7</Category>
            <Category>#무한도전8</Category>
            <Category>#무한도전9</Category>
        </CategoryContainer>
    );
}

export default Categories;
