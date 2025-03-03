import Card from "../../components/Common/Card"
import styled from 'styled-components';
import { useState } from 'react';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ContentWrapper = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    color: #232323;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 20px 0px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 8px;
`;

const ContentBox = styled.div<{ $isVisible: boolean }>`
    max-height: ${props => props.$isVisible ? '200px' : '0'};
    width: 360px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--Gray-4, #F7F7F7);
    background: #FFF;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
`;

const ContentText = styled.div`
    width: 360px;
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
    questionType: string;
    content: string;
}

const FAQPage = () => {
    const [rotatedStates, setRotatedStates] = useState<{ [key: number]: boolean }>({});
    
    const noticeItems: NoticeItem[] = [
        {
            title: "ERICA 동아리 모음 서비스 런칭!",
            questionType: "서비스질문",
            content: "서비스에 동아리를 등록하기 위해서는 요청을 보내주셔야 합니다. 홈 화면의 상단에 어드민 로그인 버튼을 클릭하고, 새 동아리 등록 버튼을 누릅니다.\n\n 동아리 등록이 서버에 전송되어 승인이 되면 동아리가 등록되고 어드민 로그인이 가능해집니다."
        },
        {
            title: "동아리 경고를 몇 번 받았는지 궁금해요",
            questionType: "동연질문",
            content: "두 번째 FAQ의 상세 내용입니다."
        },
    ];

    const handleCardClick = (index: number) => {
        setRotatedStates(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <PageContainer>
            <ContentWrapper>
                <Title>FAQ 페이지</Title>
                <Body>
                    {noticeItems.map((item, index) => (
                        <CardContainer key={index}>
                            <Card 
                                $variant="FAQ" 
                                title={item.title}
                                questionType={item.questionType}
                                isRotated={rotatedStates[index]}
                                onClick={() => handleCardClick(index)}
                            />
                            <ContentBox $isVisible={rotatedStates[index]}>
                                <ContentText>
                                    {item.content}
                                </ContentText>
                            </ContentBox>
                        </CardContainer>
                    ))}
                </Body>
            </ContentWrapper>
        </PageContainer>
    );
};

export { FAQPage };
