import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const CategoryContainer = styled.div`
    width: 100%;
    padding-top: 30px;
    padding-bottom: 20px;
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

// 스타일을 바로 업데이트 하기 위함
const Category = styled.div.attrs((props) => ({
    style: {
        backgroundColor: props.selected ? "#7b7b7b" : "white",
        color: props.selected ? "white" : "#7b7b7b",
    },
}))`
    height: 31px;
    background-color: ${(props) => (props.selected ? "#7b7b7b" : "white")};
    color: ${(props) => (props.selected ? "white" : "#7b7b7b")};
    border: 1px solid #7b7b7b;
    border-radius: 3px;
    margin: 5px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 12px;
    padding-right: 12px;

    &:hover {
        background-color: #7b7b7b;
        color: white;
    }
`;

function Categories() {
    const categoryRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        // 여기서 그 뭐냐 그 카테고리 교집합 해서 전송
    }, [selectedCategories]);

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

    const handleCategoryClick = (category) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(category)) {
                return prevSelected.filter((item) => item !== category);
            } else {
                return [...prevSelected, category];
            }
        });
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
            {[
                "연관 키워드1",
                "연관 키워드2",
                "연관 키워드3",
                "연관 키워드4",
                "연관 키워드5",
            ].map((category) => (
                <Category
                    key={category}
                    selected={selectedCategories.includes(category)}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </Category>
            ))}
        </CategoryContainer>
    );
}

export default Categories;
