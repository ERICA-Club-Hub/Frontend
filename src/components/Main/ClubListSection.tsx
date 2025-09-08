import styled from 'styled-components';
import Button from '../Common/Button';
import ClubCard from '../Common/ClubCard';
import { usePopularClub } from '@/hooks/queries/main/usePopularClub';
import { useNavigate } from 'react-router-dom';

export default function ClubListSection() {
    const { popularResult, popularRequestSize, setPopularRequestSize } =
        usePopularClub();
    const navigator = useNavigate();
    return (
        <SectionSectionContainer>
            <SectionTitle>지금 인기있는 동아리 · 학회</SectionTitle>
            <ClubListContainer>
                {popularResult &&
                    popularResult.map((clubInfo) => (
                        <ClubCard
                            clubProfileImageUrl={clubInfo.profileImageUrl}
                            key={clubInfo.id}
                            title={clubInfo.name}
                            subTitle={clubInfo.oneLiner}
                            categoryName={clubInfo.categoryName}
                            recruitmentStatus={clubInfo.recruitmentStatus}
                            onClick={() => navigator(`/club/${clubInfo.id}`)}
                        />
                    ))}
                {popularRequestSize === 4 && (
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
