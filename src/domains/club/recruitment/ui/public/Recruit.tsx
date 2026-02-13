import ClubDetailText from '@/domains/shared/components/club-detail/ClubDetailText';
import ClubDetailCard from '@/domains/shared/components/layout/ClubDetailCard';
import { useClubApi, useIsPreview } from '@/domains/shared/api/club.queries';
import { ClubRecruitmentResponse } from '@/api/data-contracts';

export default function Recruit() {
    const { id: clubId, isPreview } = useIsPreview();
    const { data } = useClubApi<ClubRecruitmentResponse>({
        clubId,
        isPreview,
        endpoint: 'recruitment',
        errorMessage: '동아리 모집 상태 불러오기 실패',
    });

    return (
        <section className="flex flex-col gap-2.5">
            <ClubDetailCard title="모집기간">
                <ClubDetailText text={data?.due} />
            </ClubDetailCard>

            <ClubDetailCard title="모집대상">
                <ClubDetailText text={data?.target} />
            </ClubDetailCard>

            <ClubDetailCard title="유의사항">
                <ClubDetailText text={data?.notice} />
            </ClubDetailCard>

            <ClubDetailCard title="기타 동아리 모집 관련">
                <ClubDetailText text={data?.etc} />
            </ClubDetailCard>
        </section>
    );
}
