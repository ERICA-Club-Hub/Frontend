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
    color: ${props => props.theme.colors.mainBlack};
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
    border: 1px solid ${props => props.theme.colors.lightGray};
    background: ${props => props.theme.colors.white};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
`;

const ContentText = styled.div`
    width: 320px;
    color: ${props => props.theme.colors.mainGary};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    padding: 20px;
    white-space: pre-line;
`;

interface NoticeItem {
    title: React.ReactNode | string;
    questionType: string;
    content: React.ReactNode | string;
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
        {
            title: '모든 동아리가 등록되어 있나요?',
            questionType: '서비스질문',
            content: '아니요, 현재는 일부 동아리만 등록되어 있는 상태입니다.',
        },
        {
            title: (
                <>
                    중앙 동아리가 아니어도 플랫폼에 <br />
                    동아리를 등록할 수 있나요?
                </>
            ),
            questionType: '서비스질문',
            content: (
                <>
                    네! 하지만 현재 한자리는 중앙동아리를 기준으로
                    <br /> 카테고리를 나누었기 때문에
                    <br /> 맞는 카테고리가 없을 수도 있습니다.
                    <br />
                    <br /> 필요한 부분이 있다면 메일로 문의해주세요!
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
