import ContentBlock from '../ContentBlock';
import {
    useClubSchedules,
    useIsPreview,
} from '@/hooks/queries/club-detail/useClubIntro';

export default function AnnualSchedule() {
    const { id, isPreview } = useIsPreview();
    const { data } = useClubSchedules(id || '', isPreview);

    return (
        <ContentBlock title="주요 연간 일정">
            {data?.schedules && data.schedules.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {data.schedules.map((schedule) => (
                        <div key={schedule.month} className="flex">
                            <span className="flex bg-badge-blue-bg rounded-full w-[35px] h-5 justify-center items-center text-badge-blue-text text-caption font-semibold">
                                {schedule.month}월
                            </span>
                            <span className="flex-1 flex justify-start text-body-03 font-medium mt-px ml-[7px]">
                                {schedule.content}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col text-center gap-2">
                    <span className="text-emoji-large">🅧</span>
                    <div>주요 연간 일정이 비었어요.</div>
                </div>
            )}
        </ContentBlock>
    );
}
