import styled from 'styled-components';
import Skeleton from '../Common/Loading/Skeleton';
import ClubCard from '../Common/ClubCard';
import { ClubRegistrationDTOList } from '@/types/club.types';

interface ClublistProps {
    isPending: boolean;
    data?: ClubRegistrationDTOList[];
}

export default function ClubList({ isPending, data }: ClublistProps) {
    if (isPending) {
        return (
            <SkeletonList>
                {Array.from({ length: 5 }).map((_, idx) => (
                    <Skeleton width={320} height={85} key={idx} />
                ))}
            </SkeletonList>
        );
    }

    if (!data || data.length === 0) {
        return <div>검색 결과가 없습니다.</div>;
    }

    return (
        <Container>
            {data &&
                data.map((club) => (
                    <ClubCard
                        key={club.clubRegistrationId}
                        title={club.clubName}
                        subTitle={club.oneLiner}
                        categoryName={club.category.clubCategoryName}
                        to="/admin/service"
                    />
                ))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    flex: 1;
    width: 320px;
    height: 85px;
    padding-bottom: 45px;
`;

const SkeletonList = styled(Container)``;
