import {
    useClubApi,
    useIsPreview,
} from '@/domains/club/introduction/api/club-info.queries';
import { ClubDetailResponse } from '@/api/data-contracts';
import ClubDetailDefaultInfo from '@/domains/club/introduction/ui/public/ClubDetailDefaultInfo';
import ClubDetailCard from '@/domains/shared/components/layout/ClubDetailCard';
import ClubDetailText from '@/domains/shared/components/club-detail/ClubDetailText';

export default function Intro() {
    const { id, isPreview } = useIsPreview();

    // TODO isLoading 전달
    const { data } = useClubApi<ClubDetailResponse>({
        clubId: id,
        isPreview,
        errorMessage: '정보 조회 실패',
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
