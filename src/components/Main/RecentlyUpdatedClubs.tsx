import ClubCard from '../Common/ClubCard';
import { PATHS } from '@/routes/paths';
import { useRecentlyUpdatedClubs } from '@/hooks/queries/main/useRecentlyUpdatedClubs';

export default function RecentlyUpdatedClubs() {
    const { data, isLoading } = useRecentlyUpdatedClubs();

    const recentlyUpdatedClubs = data?.result?.content || [];

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <section className="flex flex-col">
            <h3 className="font-medium text-subtitle-01 mt-[30px] mb-5">
                최근 업데이트된 동아리
            </h3>
            <section className="flex flex-col gap-[7px]">
                {recentlyUpdatedClubs.map((club) => (
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
            </section>
        </section>
    );
}
