import { apiRequest } from '@/api/apiRequest';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IntroProps {
    nowUrl: string;
    clubId: string;
}

interface Schedule {
    month: string;
    content: string;
}
interface ClubIntro {
    introduction: string | null;
    activity: string | null;
    recruitment: string | null;
}

export default function Intro({ clubId, nowUrl }: IntroProps) {
    const [schedules, setSchedules] = useState<Schedule[]>();
    const [clubIntro, setClubIntro] = useState<ClubIntro>();

    useEffect(() => {
        const getSchedules = async (clubId: string) => {
            if (clubId) {
                const schedulesResponse = await apiRequest({
                    url: `/api/clubs/${clubId}/schedules`,
                });
                setSchedules(schedulesResponse.result.activities);
            }
        };
        const getClubIntro = async (clubId: string) => {
            try {
                const requestUrl =
                    nowUrl === 'club-detail-preview'
                        ? `/api/clubs/club-admin/${clubId}/introduction/draft`
                        : `/api/clubs/${clubId}/introduction`;
                if (clubId) {
                    console.log('Request URL:', requestUrl);
                    console.log('Token:', getAccessToken()); // 토큰 확인
                    const clubIntroResponse = await apiRequest({
                        url: requestUrl,
                        requireToken: nowUrl === 'club-detail-preview',
                    });
                    setClubIntro(clubIntroResponse.result);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log('요청 설정:', error.config); // 실제 요청 설정 확인
                    console.log('에러 상세:', error.response?.data); // 서버에서 보내는 에러 메시지
                }
            }
        };
        if (clubId) {
            getSchedules(clubId);
            getClubIntro(clubId);
        }
    }, [clubId, nowUrl]);
    return (
        <div>
            <Container>
                <Title>🎯 주요 연간일정</Title>
                {schedules && schedules.length > 0 ? (
                    <ScheduleContents>
                        {schedules.map((schedule) => (
                            <ContentsRow key={schedule.month}>
                                <ContentsLabel>
                                    {schedule.month}월
                                </ContentsLabel>
                                <ContentsValue>
                                    {schedule.content}
                                </ContentsValue>
                            </ContentsRow>
                        ))}
                    </ScheduleContents>
                ) : (
                    <SchedulesNull>
                        <XSize>🅧</XSize>
                        <div>주요 연간 일정이 비었어요.</div>
                    </SchedulesNull>
                )}
            </Container>
            <Container>
                <ContentBlock>
                    <Title>🔍 우리 동아리를 소개합니다!</Title>
                    {clubIntro?.introduction ? (
                        <ContentSpan>{clubIntro.introduction}</ContentSpan>
                    ) : (
                        <ContentSpan>
                            <div>동아리 소개가 비었어요</div>
                        </ContentSpan>
                    )}
                </ContentBlock>
                <ContentBlock>
                    <Title>👀 이런 활동을 할 수 있어요!</Title>
                    {clubIntro?.activity ? (
                        <ContentSpan>{clubIntro?.activity}</ContentSpan>
                    ) : (
                        <ContentSpan>
                            <div>동아리 활동 내용이 비었어요</div>
                        </ContentSpan>
                    )}
                </ContentBlock>
                <ContentBlock>
                    <Title>🔥 너, 내 동료가 돼라!</Title>
                    {clubIntro?.recruitment ? (
                        <ContentSpan>{clubIntro?.recruitment}</ContentSpan>
                    ) : (
                        <ContentSpan>
                            <div>동아리 활동 내용이 비었어요</div>
                        </ContentSpan>
                    )}
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
    white-space: pre-line;
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

const SchedulesNull = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 8px;
`;

const XSize = styled.span`
    font-size: 30px;
`;
