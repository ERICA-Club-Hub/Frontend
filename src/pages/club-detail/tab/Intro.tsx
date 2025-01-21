import styled from 'styled-components';

export default function Intro() {
    return (
        <div>
            <Container>
                <Title>🎯 주요 연간일정</Title>
                <ScheduleContents>
                    <ContentsRow>
                        <ContentsLabel>3월</ContentsLabel>
                        <ContentsValue>3월에 할것</ContentsValue>
                    </ContentsRow>
                    <ContentsRow>
                        <ContentsLabel>4월</ContentsLabel>
                        <ContentsValue></ContentsValue>
                    </ContentsRow>
                    <ContentsRow>
                        <ContentsLabel>6월</ContentsLabel>
                        <ContentsValue></ContentsValue>
                    </ContentsRow>
                    <ContentsRow>
                        <ContentsLabel>7월</ContentsLabel>
                        <ContentsValue></ContentsValue>
                    </ContentsRow>
                    <ContentsRow>
                        <ContentsLabel>8월</ContentsLabel>
                        <ContentsValue></ContentsValue>
                    </ContentsRow>
                </ScheduleContents>
            </Container>
            <Container>
                <ContentBlock>
                    <Title>🔍 우리 동아리를 소개합니다!</Title>
                    <ContentSpan>
                        {`첫 번째 줄입니다.
                        두 번째 줄입니다.asdfasfsadfasdfasfㅇㄴㅁ;렁ㄴ;러;ㅇ널;ㅣㅇㅁ너리;ㅏㅇㅁ너리;ㅏㄴ어리ㅏㅇㅁ너리ㅏ;ㄴ머리;ㅏㄴ멀ㄴㅇㅁ리;ㅓㄴㅁ아ㅣ럼닝ㄹ
                        
                        두 줄 띄우고 세 번째 줄입니다.`}
                    </ContentSpan>
                </ContentBlock>
                <ContentBlock>
                    <Title>👀 이런 활동을 할 수 있어요!</Title>
                    <ContentSpan></ContentSpan>
                </ContentBlock>
                <ContentBlock>
                    <Title>🔥 너, 내 동료가 돼라!</Title>
                    <ContentSpan></ContentSpan>
                </ContentBlock>
            </Container>
        </div>
    );
}

const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 328px;
    margin-bottom: 7px;
`;
const Title = styled.div`
    margin-top: -5px;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
`;
const ScheduleContents = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
const ContentsRow = styled.div`
    display: flex;
`;
const ContentBlock = styled.div`
    width: 278px;
    margin-bottom: 25px;
`;
const ContentSpan = styled.span`
    font-size: 14px;
    color: #606060;
`;
const ContentsLabel = styled.span`
    display: flex;
    background-color: #eef4ff;
    border-radius: 100px;
    width: 35px;
    height: 20px;
    justify-content: center;
    align-items: center;
    color: #33639c;
    font-size: 12px;
    font-weight: 600;
`;
const ContentsValue = styled.span`
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    margin-top: 1px;
    margin-left: 7px;
`;
