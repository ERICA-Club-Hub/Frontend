import Skeleton from '../Common/Loading/Skeleton';
import ClubCard from '../Common/ClubCard';
import { ClubRegistrationDTOList } from '@/types/club.types';
import { PATHS } from '@/routes/paths';

interface ClublistProps {
    isPending: boolean;
    isError: boolean;
    data?: ClubRegistrationDTOList[];
}

// 동아리 리스트를 받아서 렌더링하는 컴포넌트
export default function ClubListView({
    isPending,
    isError,
    data,
}: ClublistProps) {
    if (isPending) {
        return (
            <div className="flex flex-col items-center gap-[10px] flex-1 w-[320px] pb-[45px]">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <Skeleton width={320} height={85} key={idx} />
                ))}
            </div>
        );
    }

    if (isError) {
        return <div>동아리 정보를 불러오는 데 실패했습니다.</div>;
    }

    if (!data || data.length === 0) {
        return <div>검색 결과가 없습니다.</div>;
    }
    return (
        <div className="flex flex-col items-center gap-[10px] flex-1 w-[320px] pb-[45px]">
            {data.map((club) => (
                <ClubCard
                    key={club.clubRegistrationId}
                    title={club.clubName}
                    subTitle={club.oneLiner}
                    categoryName={club.category.clubCategoryName}
                    to={PATHS.ADMIN_SERVICE_CLUB_DETAIL(
                        club.clubRegistrationId,
                    )}
                />
            ))}
        </div>
    );
}
