import styled from 'styled-components';

interface RecruitProps {
    clubId: string;
}

export default function Recruit({ clubId }: RecruitProps) {
    console.log('모집안내에서', clubId);
    return (
        <Container>
            <ContentBlock>
                <Title>📅 모집기간</Title>
                <ContentSpan>모집 기간 관련 내용</ContentSpan>
            </ContentBlock>
            <ContentBlock>
                <Title>💫 유의사항</Title>
                <ContentSpan>유의사항 내용</ContentSpan>
            </ContentBlock>
            <ContentBlock>
                <Title>💡 기타 동아리 모집 안내</Title>
                <ContentSpan>동아리 모집 안내 내용</ContentSpan>
            </ContentBlock>
        </Container>
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
const ContentSpan = styled.span`
    font-size: 14px;
    color: #606060;
    white-space: pre-line;
`;
const ContentBlock = styled.div`
    width: 278px;
    margin-bottom: 25px;
`;
