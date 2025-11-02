import styled from 'styled-components';
import Button from '../Common/Button';
import ClubCard from '../Common/ClubCard';
import { usePopularClub } from '@/hooks/queries/main/usePopularClub';
import { PATHS } from '@/routes/paths';

export default function ClubListSection() {
    const {
        popularResult,
        popularRequestSize,
        setPopularRequestSize,
        isLoading,
    } = usePopularClub();

    const popularList = popularResult?.result?.content || [];

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <SectionSectionContainer>
            <SectionTitle>지금 인기있는 동아리 · 학회</SectionTitle>
            <ClubListContainer>
                {popularList.map((club) => (
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
                {popularRequestSize === 4 && popularList.length >= 4 && (
                    <Button
                        variant="outlined"
                        size="large"
                        outlineColor="none"
                        onClick={() => setPopularRequestSize(10)}
                    >
                        더보기
                    </Button>
                )}
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
