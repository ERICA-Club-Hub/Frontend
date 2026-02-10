import {
    useClubRecruitment,
    useIsPreview,
} from '@/domains/club/introduction/api/club-info.queries';
import ClubDetailText from '@/domains/shared/components/club-detail-info/ClubDetailText';
import ClubDetailCard from '@/domains/shared/components/layout/ClubDetailCard';

export default function Recruit() {
    const { id, isPreview } = useIsPreview();
    const { data } = useClubRecruitment({ clubId: id, isPreview });
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
