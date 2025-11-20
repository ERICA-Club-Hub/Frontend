import styled from 'styled-components';
import ClubCard from '../Common/ClubCard';
import { PATHS } from '@/routes/paths';
import { useRecentlyUpdatedClubs } from '@/hooks/queries/main/useRecentlyUpdatedClubs';

export default function RecentlyUpdatedClubs() {
    const { data, isLoading } = useRecentlyUpdatedClubs();

    const recentlyUpdatedClubs = data?.result?.content || [];

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <SectionSectionContainer>
            <SectionTitle>최근 업데이트된 동아리</SectionTitle>
            <ClubListContainer>
                {recentlyUpdatedClubs.map((club) => (
                    <ClubCard
                        key={club.id}
                        title={club.name}
                        subTitle={club.oneLiner}
                        categoryName={club.categoryName}
                        recruitmentStatus={club.recruitmentStatus}
                        to={PATHS.CLUB_DETAIL(club.id)}
                        profileImageUrl={club.profileImageUrl}
                    />
                ))}
            </ClubListContainer>
        </SectionSectionContainer>
    );
}

const SectionTitle = styled.h3`
    font-weight: 500;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const SectionSectionContainer = styled.section`
    display: flex;
    flex-direction: column;
`;

const ClubListContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;
