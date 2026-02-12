import ClubDetailDefaultInfo from '@/domains/club/introduction/ui/public/ClubDetailDefaultInfo';
import ClubDetailCard from '@/domains/shared/components/layout/ClubDetailCard';
import ClubDetailText from '@/domains/shared/components/club-detail/ClubDetailText';
import { useIsPreview } from '@/domains/shared/api/club.queries';
import { useClubIntroQuery } from '../../api/introduction.queries';

export default function Intro() {
    const { id, isPreview } = useIsPreview();

    // TODO isLoading 전달
    const { data } = useClubIntroQuery({
        clubId: id,
        isPreview,
    });

    return (
        <section className="flex flex-col gap-2.5">
            <ClubDetailCard title="동아리 기본 정보">
                {/* TODO isLoading 전달 */}
                <ClubDetailDefaultInfo data={data} />
            </ClubDetailCard>

            <ClubDetailCard title="동아리 소개">
                <ClubDetailText text={data?.description} />
            </ClubDetailCard>
        </section>
    );
}
