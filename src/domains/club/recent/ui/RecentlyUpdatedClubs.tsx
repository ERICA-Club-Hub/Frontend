import { PATHS } from '@/routes/paths';
import { useRecentlyUpdatedClubs } from '@/domains/club/recent/api/useRecentlyUpdatedClubs';
import ClubCard from '@/domains/shared/components/card/ClubCard';

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
                        categoryName={club.tag}
                        recruitmentStatus={club.recruitmentStatus}
                        to={PATHS.CLUB_DETAIL(club.id)}
                        profileImageUrl={club.profileImageUrl}
                    />
                ))}
            </section>
        </section>
    );
}
