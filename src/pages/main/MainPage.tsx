import styled from 'styled-components';
import { Footer } from '@/components/Common/Footer';
import Survey from '@/components/Main/Survey';
import RecentlyLogItem from '@/components/Common/RecentlyLog/RecentlyLogItem';
import CategoryCollect from '@/components/Common/CategoryCollect';
import ClubCard from '@/components/Common/ClubCard';

export default function MainPage() {
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
                        ></CategoryCollect>
                        <CategoryCollect
                            img={<></>}
                            categoryLabel="단과대별"
                        ></CategoryCollect>
                        <CategoryCollect
                            img={<></>}
                            categoryLabel="학과별"
                        ></CategoryCollect>
                        <CategoryCollect
                            img={<></>}
                            categoryLabel="연합동아리"
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
