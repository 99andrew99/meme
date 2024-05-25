import styled from "styled-components";
import Content from "./Content";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";

const TopContainer = styled.div`
    width: 100%;
    height: 78vh;
    color: black;
`;

const ContentsHeader = styled.div`
    width: 100%;
    /* height: 8vh; */
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ContentsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    overflow-y: scroll;
    height: ${(props) => props.height}px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ContentsNumText = styled.div`
    display: flex;
    margin-left: 10px;
`;

const ContentsNum = styled.span`
    font-weight: 600;
    margin-left: 3px;
    margin-right: 1px;
`;

// 임시로 생성한 더미 데이터
const dummyData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
}));

function Contents({ isHeader, isMain }) {
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();
    const [containerHeight, setContainerHeight] = useState(0);
    const containerRef = useRef(null);

    const textV = isMain ? "짤들이 등록되었어요!" : "검색결과";

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        if (inView && hasMore) {
            loadMore();
        }
    }, [inView]);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const topPosition =
                    containerRef.current.getBoundingClientRect().top;
                const height = window.innerHeight - topPosition - 10;
                setContainerHeight(height);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const loadMore = () => {
        if (data.length >= dummyData.length) {
            setHasMore(false);
            return;
        }
        const moreData = dummyData.slice(data.length, data.length + 10);
        setData((prev) => [...prev, ...moreData]);
    };

    return (
        <TopContainer>
            {isHeader && (
                <ContentsHeader>
                    <ContentsNumText>
                        총<ContentsNum> N</ContentsNum>개의 {textV}
                    </ContentsNumText>
                </ContentsHeader>
            )}

            <ContentsContainer ref={containerRef} height={containerHeight}>
                {data.map((item) => (
                    <Content key={item.id} num={item.id} />
                ))}
                {hasMore && <div ref={ref}>Loading...</div>}
            </ContentsContainer>
        </TopContainer>
    );
}

export default Contents;
