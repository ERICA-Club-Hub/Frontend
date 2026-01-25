import Button from '../Common/Button';
import ClubCard from '../../domains/shared/components/ClubCard/ClubCard';
import { usePopularClub } from '@/hooks/queries/main/usePopularClub';
import { PATHS } from '@/routes/paths';

export default function ClubListSection() {
    const {
        popularResult,
        popularRequestSize,
        setPopularRequestSize,
        isLoading,
    } = usePopularClub();

    const popularList = popularResult?.result?.content || [];

    if (isLoading) {
        return <div>로딩 중...</div>;
    }
    return (
        <section className="flex flex-col">
            <h3 className="font-medium text-subtitle-01 mt-[30px] mb-5">
                지금 인기있는 동아리 · 학회
            </h3>
            <section className="flex flex-col gap-[7px]">
                {popularList.map((club) => (
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
                {popularRequestSize === 4 && popularList.length >= 4 && (
                    <Button
                        variant="outlined"
                        size="large"
                        outlineColor="none"
                        onClick={() => setPopularRequestSize(10)}
                    >
                        더보기
                    </Button>
                )}
            </section>
        </section>
    );
}
