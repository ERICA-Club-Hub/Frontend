import { ClubScheduleResponse } from '@/api/data-contracts';

interface ClubDetailScheduleProps {
    data?: ClubScheduleResponse;
}

export default function ClubDetailSchedule({ data }: ClubDetailScheduleProps) {
    if (!data || data.schedules?.length === 0) {
        return (
            <div className="text-b4 text-neutral-400 py-4">
                등록된 일정이 없습니다.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1.5">
            {data.schedules?.map((schedule, index) => (
                <div
                    key={`${schedule.month}-${index}`}
                    className="flex gap-2.5 items-center"
                >
                    <div className="w-8.25 px-2 py-0.5 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center text-c4">
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
