import Card from "../../components/Common/Card"
import styled from 'styled-components';
import { useState } from 'react';

const Title = styled.div`
    color: #232323;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 20px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    align-items: flex-start;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 320px;
    padding-bottom: 8px;
`;

const ContentBox = styled.div<{ isVisible: boolean }>`
    max-height: ${props => props.isVisible ? '200px' : '0'};
    width: 320px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--Gray-4, #F7F7F7);
    background: #FFF;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
`;

const ContentText = styled.div`
    width: 320px;
    color: var(--Gray-1, #606060);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    padding: 20px;
    white-space: pre-line;
`;

interface NoticeItem {
    title: string;
    date: string;
    content: string;
}

const ServiceNoticePage = () => {
    const [rotatedStates, setRotatedStates] = useState<{ [key: number]: boolean }>({});
    
    const noticeItems: NoticeItem[] = [
        {
            title: "ERICA 동아리 모음 서비스 런칭!",
            date: "2024.03.22",
            content: "한양대학교 ERICA의 모든 동아리를 모아 볼 수 있는 동아리 모음 서비스, 허브가 런칭되었어요!\n\n 이제는 언제 어디서든 원하는 동아리의 소식을 쉽고 빠르게 접해볼 수 있어요."
        },
        {
            title: "ERICA 동아리 모음 서비스 런칭!",
            date: "2024.03.22",
            content: "두 번째 공지사항의 상세 내용입니다."
        },
        {
            title: "ERICA 동아리 모음 서비스 런칭!",
            date: "2024.03.22",
            content: "세 번째 공지사항의 상세 내용입니다."
        }
    ];

    const handleCardClick = (index: number) => {
        setRotatedStates(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return <div>
        <Title>서비스 공지사항</Title>
        <Body>
            {noticeItems.map((item, index) => (
                <CardContainer key={index}>
                    <Card 
                        variant="type2" 
                        title={item.title}
                        date={item.date}
                        isRotated={rotatedStates[index]}
                        onClick={() => handleCardClick(index)}
                    />
                    <ContentBox isVisible={rotatedStates[index]}>
                        <ContentText>
                            {item.content}
                        </ContentText>
                    </ContentBox>
                </CardContainer>
            ))}
        </Body>
    </div>;
};

export { ServiceNoticePage };
