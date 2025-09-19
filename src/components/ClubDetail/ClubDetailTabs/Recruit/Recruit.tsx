import styled from 'styled-components';
import ContentBlock from '../ContentBlock';
import { useClubDetail } from '@/hooks/club-detail/useClubDetail';
import { useClubRecruit } from '@/hooks/queries/club-detail/useClubRecruit';

export default function Recruit() {
    const { clubId, isPreview } = useClubDetail();
    const { data } = useClubRecruit(clubId || '', isPreview);
    return (
        <RecruitContainer>
            <ContentBlock title="모집기간" content={data?.due} />
            <ContentBlock title="모집대상" content={data?.target} />
            <ContentBlock title="유의사항" content={data?.notice} />
            <ContentBlock
                title="💡 기타 동아리 모집 안내"
                content={data?.etc}
            />
        </RecruitContainer>
    );
}

const RecruitContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
