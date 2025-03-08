import { apiRequest } from '@/api/apiRequest';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ClubDetailContext } from '../ClubDetailPage';

interface RecruitContent {
    due: string;
    notice: string;
    etc: string;
}

export default function Recruit() {
    const [recruitContent, setRecruitContent] = useState<RecruitContent>();
    const context = useContext(ClubDetailContext);
    const nowUrl = context?.nowUrl;
    const clubId = context?.clubId;
    useEffect(() => {
        const getRecruit = async (clubId?: string) => {
            try {
                // 첫 번째 요청 시도: 미리보기(draft) 또는 일반 조회
                const requestUrl =
                    nowUrl === 'club-detail-preview'
                        ? `/api/clubs/club-admin/${clubId}/recruitment/draft`
                        : `/api/clubs/${clubId}/recruitment`;

                try {
                    const recruitResponse = await apiRequest({
                        url: requestUrl,
                        requireToken: nowUrl === 'club-detail-preview',
                    });
                    setRecruitContent(recruitResponse.result);
                } catch (error) {
                    if (nowUrl === 'club-detail-preview') {
                        console.log('미리보기 데이터 없음, 원본 데이터 요청');
                        const response = await apiRequest({
                            url: `/api/clubs/${clubId}/recruitment`,
                        });
                        setRecruitContent(response.result);
                    } else {
                        console.error(
                            '모집 정보를 가져오는데 실패했습니다:',
                            error,
                        );
                    }
                }
            } catch (error) {
                console.error('데이터 요청 실패:', error);
            }
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
            <ContainerV>
                <XSize>🅧</XSize>
                <span>모집 안내가 비었습니다.</span>
            </ContainerV>
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
const ContainerV = styled.div`
    background-color: none;
    border-radius: 10px;
    padding: 20px;
    width: 328px;
    margin-bottom: 7px;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;
const XSize = styled.span`
    font-size: 30px;
`;
