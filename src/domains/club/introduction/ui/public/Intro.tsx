import ClubDetailDefaultInfo from '@/domains/club/introduction/ui/public/ClubDetailDefaultInfo';
import ClubDetailCard from '@/domains/shared/components/layout/ClubDetailCard';
import ClubDetailText from '@/domains/shared/components/club-detail/ClubDetailText';
import { useIsPreview } from '@/domains/shared/api/club.queries';
import { useClubIntroQuery } from '../../api/introduction.queries';

export default function Intro() {
    const { id, isPreview } = useIsPreview();

    const { data, isLoading } = useClubApi<ClubDetailResponse>({
        clubId: id,
        isPreview,
    });

    return (
        <section className="flex flex-col gap-2.5">
            <ClubDetailCard title="동아리 기본 정보">
                <ClubDetailDefaultInfo data={data} isLoading={isLoading} />
            </ClubDetailCard>

            <ClubDetailCard title="동아리 소개">
                <ClubDetailText
                    text={data?.description}
                    emptyText="소개글이 없습니다"
                    isLoading={isLoading}
                />
            </ClubDetailCard>
        </section>
    );
}
