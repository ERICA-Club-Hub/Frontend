import { ClubScheduleResponse } from '@/api/data-contracts';
import Skeleton from '@/components/Loading/Skeleton';

interface ClubDetailScheduleProps {
    data?: ClubScheduleResponse;
    isLoading?: boolean;
}

export default function ClubDetailSchedule({
    data,
    isLoading = false,
}: ClubDetailScheduleProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-1.5">
                {Array.from({ length: 1 }).map((_, i) => (
                    <div key={i} className="flex gap-2.5 items-center">
                        <Skeleton className="w-8.25 h-4.5 rounded-xl" />
                        <Skeleton className="h-4 flex-1 max-w-50" />
                    </div>
                ))}
            </div>
        );
    }

    if (!data || !data.schedules || data.schedules.length === 0) {
        return (
            <div className="text-b4 text-neutral-400">
                곧 업데이트될 예정이예요.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1.5">
            {data.schedules.map((schedule, index) => (
                <div
                    key={`${schedule.month}-${index}`}
                    className="flex gap-2.5 items-center"
                >
                    <div className="w-8.25 py-0.5 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center text-c4 shrink-0">
                        {schedule.month}월
                    </div>
                    <p className="text-b4 text-neutral-600">
                        {schedule.content}
                    </p>
                </div>
            ))}
        </div>
    );
}
