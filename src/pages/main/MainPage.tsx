import styled from 'styled-components';
import { Footer } from '@/components/Common/Footer';
import Survey from '@/components/Main/Survey';
import RecentlyLogItem from '@/components/Common/RecentlyLog/RecentlyLogItem';
import CategoryCollect from '@/components/Common/CategoryCollect';
import ClubCard from '@/components/Common/ClubCard';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { useState } from 'react';
import Button from '@/components/Common/Button';

export default function MainPage() {
    const [popularRequestSize, setPopularRequestSize] = useState<4 | 10>(4);

    const { data: popularResult } = useQuery({
        queryKey: [popularRequestSize, 'popular', 'club'],
        queryFn: async () => {
            const response = await apiRequest({
                url: `/api/clubs/popular?page=0&size=${popularRequestSize}`,
            });
            return response.result.content;
        },
    });
    console.log(popularResult);

    const { data: APIrecentlyLogs } = useQuery({
        queryKey: ['dk'],
        queryFn: async () => {
            const response = await apiRequest({
                url: '/api/activities/club/recent',
            });
            return response.result.activityLogs;
        },
    });
    console.log(APIrecentlyLogs);

    const recentlyLogs = [
        {
            activityId: 1,
            thumbnailUrl: '',
            clubId: 1,
            clubLogoImgUrl: '',
            clubName: 'ddddddd',
        },
        {
            activityId: 1,
            thumbnailUrl: '',
            clubId: 1,
            clubLogoImgUrl: '',
            clubName: '',
        },
        {
            activityId: 1,
            thumbnailUrl: '',
            clubId: 1,
            clubLogoImgUrl: '',
            clubName: '',
        },
        {
            activityId: 1,
            thumbnailUrl: '',
            clubId: 1,
            clubLogoImgUrl: '',
            clubName: '',
        },
    ];
    const navigator = useNavigate();
    return (
        <PageContainer>
            <ContentWrapper>
                <SectionContainer>
                    <SectionTitle>카테고리별로 모아보기</SectionTitle>
                    <CategoryCollectContainer>
                        {/*  TODO svgr 추가 */}
                        <CategoryCollect
                            img={<></>}
                            categoryLabel="중앙동아리"
                            onClick={() =>
                                navigator('/club/search?type=central')
                            }
                        ></CategoryCollect>
                        <CategoryCollect
                            img={<></>}
                            categoryLabel="단과대별"
                            onClick={() =>
                                navigator('/club/search?type=college')
                            }
                        ></CategoryCollect>
                        <CategoryCollect
                            img={<></>}
                            categoryLabel="학과별"
                            onClick={() =>
                                navigator('/club/search?type=department')
                            }
                        ></CategoryCollect>
                        <CategoryCollect
                            img={<></>}
                            categoryLabel="연합동아리"
                            onClick={() => navigator('/club/search?type=union')}
                        ></CategoryCollect>
                    </CategoryCollectContainer>
                </SectionContainer>
                <Survey />
                <SectionContainer>
                    <SectionTitle>지금 인기있는 동아리 · 학회</SectionTitle>
                    {/* TODO API 연동 */}
                    <ClubListSection>
                        <ClubCard
                            title="동아리 이름"
                            subTitle="동아리 한줄소개"
                            categoryName="연합동아리"
                            recruitmentStatus="OPEN"
                        />
                        <ClubCard
                            title="동아리 이름"
                            subTitle="동아리 한줄소개"
                            categoryName="연합동아리"
                            recruitmentStatus="OPEN"
                        />
                        <ClubCard
                            title="동아리 이름"
                            subTitle="동아리 한줄소개"
                            categoryName="연합동아리"
                            recruitmentStatus="OPEN"
                        />
                        <Button
                            variant="outlined"
                            size="large"
                            outlineColor="none"
                            onClick={() => setPopularRequestSize(10)}
                        >
                            더보기
                        </Button>
                    </ClubListSection>
                </SectionContainer>
                <SectionContainer>
                    <SectionTitle>최근 업로드 된 활동로그</SectionTitle>
                    <RecentlyLogContainer>
                        {/* TODO API 연동 */}
                        {recentlyLogs.map((recentlyLog) => (
                            <RecentlyLogItem
                                clubId={recentlyLog.clubId}
                                imgUrl={recentlyLog.thumbnailUrl}
                                clubLogoImgUrl={recentlyLog.clubLogoImgUrl}
                                clubName={recentlyLog.clubName}
                            />
                        ))}
                    </RecentlyLogContainer>
                </SectionContainer>
            </ContentWrapper>
            <Footer />
        </PageContainer>
    );
}

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ContentWrapper = styled.div`
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SectionTitle = styled.h3`
    font-weight: 500;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const CategoryCollectContainer = styled.div`
    display: flex;
    gap: 17px;
`;

const SectionContainer = styled.section`
    display: flex;
    flex-direction: column;
`;

const ClubListSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

const RecentlyLogContainer = styled.div`
    width: 320px;
    height: 320px;
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    gap: 10px;
`;
