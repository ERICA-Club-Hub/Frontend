import { apiRequest } from '@/api/apiRequest';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface RecruitProps {
    clubId: string;
}

interface RecruitContent {
    due: string;
    notice: string;
    etc: string;
}

export default function Recruit({ clubId }: RecruitProps) {
    const [recruitContent, setRecruitContent] = useState<RecruitContent>();
    const nowUrl = useLocation().pathname.split('/')[1];
    useEffect(() => {
        const getRecruit = async (clubId: string) => {
            const requestUrl =
                nowUrl === 'club-detail-preview'
                    ? `/api/clubs/club-admin/${clubId}/recruitment/draft`
                    : `/api/clubs/${clubId}/recruitment`;
            const recruitResponse = await apiRequest({
                url: requestUrl,
                requireToken: nowUrl === 'club-detail-preview',
            });
            setRecruitContent(recruitResponse.result);
        };
        getRecruit(clubId);
    }, [clubId, nowUrl]);
    return recruitContent?.due &&
        recruitContent.etc &&
        recruitContent.notice ? (
        <Container>
            <ContentBlock>
                <Title>📅 모집기간</Title>
                <ContentSpan>{recruitContent.due}</ContentSpan>
            </ContentBlock>
            <ContentBlock>
                <Title>💫 유의사항</Title>
                <ContentSpan>{recruitContent.notice}</ContentSpan>
            </ContentBlock>
            <ContentBlock>
                <Title>💡 기타 동아리 모집 안내</Title>
                <ContentSpan>{recruitContent.etc}</ContentSpan>
            </ContentBlock>
        </Container>
    ) : (
        <NullContainer>
            <XSize>🅧</XSize>
            <span>모집 안내가 비었습니다.</span>
        </NullContainer>
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

const NullContainer = styled.div`
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 10px;
`;
const XSize = styled.span`
    font-size: 30px;
`;
