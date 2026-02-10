import {
    useClubSchedules,
    useIsPreview,
} from '@/domains/club/introduction/api/club-info.queries';
import ClubDetailSchedule from './ClubDetailSchedule';
import ClubDetailText from '@/domains/shared/components/club-detail/ClubDetailText';
import ClubDetailCard from '@/domains/shared/components/layout/ClubDetailCard';

export default function Schedule() {
    const { id, isPreview } = useIsPreview();
    const { data: scheduleData } = useClubSchedules({ clubId: id, isPreview });
    return (
        <section className="flex flex-col gap-2.5">
            <ClubDetailCard title="주요 연간 일정">
                <ClubDetailSchedule data={scheduleData} />
            </ClubDetailCard>
            <ClubDetailCard title="활동 안내">
                <ClubDetailText text={scheduleData?.scheduleDescription} />
            </ClubDetailCard>
        </section>
    );
}
