import Card from '@/components/Common/Card';
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
    max-height: ${(props) => (props.$isVisible ? '200px' : '0')};
    width: 320px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--Gray-4, #f7f7f7);
    background: #fff;
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
    questionType: string;
    content: React.ReactNode;
}

const FAQPage = () => {
    const [rotatedStates, setRotatedStates] = useState<{
        [key: number]: boolean;
    }>({});

    const noticeItems: NoticeItem[] = [
        {
            title: '동아리 등록 방법',
            questionType: '서비스질문',
            content: (
                <>
                    1. 우측 상단 메뉴에서 <strong>어드민 로그인</strong>을
                    클릭합니다. <br /> <br />
                    2. 하단에 있는 <strong>동아리 등록하기</strong>를
                    클릭합니다. <br /> <br />
                    3. 요청 승인 후 로그인 코드는 입력된 대표자 이메일로
                    전송됩니다.
                </>
            ),
        },
    ];

    const handleCardClick = (index: number) => {
        setRotatedStates((prev) => ({
            ...prev,
            [index]: !prev[index],
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
                                <ContentText>{item.content}</ContentText>
                            </ContentBox>
                        </CardContainer>
                    ))}
                </Body>
            </ContentWrapper>
        </PageContainer>
    );
};

export { FAQPage };
