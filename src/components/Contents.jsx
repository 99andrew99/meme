import styled from "styled-components";
import Content from "./Content";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const TopContainer = styled.div`
    width: 100%;
    height: 88vh;
    color: black;
`;

const ContentsHeader = styled.div`
    width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    /* border-bottom: 1px solid black; */
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
    height: 80vh;
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

function Contents() {
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        if (inView && hasMore) {
            loadMore();
        }
    }, [inView]);

    const loadMore = () => {
        if (data.length >= dummyData.length) {
            setHasMore(false);
            return;
        }
        const moreData = dummyData.slice(data.length, data.length + 10);
        setData((prev) => [...prev, ...moreData]);
        console.log("추가", moreData);
    };

    return (
        <TopContainer>
            <ContentsHeader>
                {/* 총 짤의 개수 */}
                <ContentsNumText>
                    총<ContentsNum> 80</ContentsNum>개의 짤들이 등록되었어요!
                </ContentsNumText>
                {/* 필터링 */}
            </ContentsHeader>

            <ContentsContainer>
                {/* 여기 무한 스크롤 세로 */}
                {data.map((item) => (
                    <Content key={item.id} num={item.id} />
                ))}
                {hasMore && <div ref={ref}>Loading...</div>}
            </ContentsContainer>
        </TopContainer>
    );
}

export default Contents;
