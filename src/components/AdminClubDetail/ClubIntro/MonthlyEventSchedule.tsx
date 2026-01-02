import { AdminSection, AdminSectionLabel } from '@/components/Common';
import PlusIcon from '@/assets/common/plus-icon.svg?react';
import { EventSchedule } from './EventSchedule';
import useClubIntroContext from '@/hooks/contexts/useClubIntroContext';
import useClubAdminQueries from '@/hooks/queries/useClubAdminQueries';
import { useEffect } from 'react';
import axios from 'axios';
import { useErrorHandler } from '@/hooks/handler/useErrorHandler';

function MonthlyEventSchedule() {
    const { schedules, setSchedules } = useClubIntroContext();

    // 월별 활동 일정 불러오기
    const { useEventSchedulesQuery } = useClubAdminQueries();
    const { error } = useEventSchedulesQuery(setSchedules);
    const { handleError } = useErrorHandler();

    // 토큰 만료 처리
    useEffect(() => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            handleError(error);
        }
    }, [error]);

    // 월별 일정 추가
    const handleAddEventSchedule = () => {
        setSchedules([
            ...schedules,
            { month: 1, content: '', isNewSchedule: true },
        ]);
    };

    return (
        <AdminSection className="min-h-[169px] p-5">
            <AdminSectionLabel className="mb-5">
                주요 활동 일정 입력
            </AdminSectionLabel>

            <div className="flex flex-col gap-[10px]">
                {/* 일정 컴포넌트 리스트 */}
                {schedules.map((schedule, idx) => (
                    <EventSchedule
                        key={`event-schedule-${idx}`}
                        schedule={schedule}
                        index={idx} // 내부적으로 일정 구분을 위해 사용하는 인덱스
                    />
                ))}

                {/* 일정 추가하기 버튼 */}
                <button
                    onClick={handleAddEventSchedule}
                    className="flex justify-center items-center gap-[5px] w-[280px] h-[40px] rounded-[10px] text-caption font-medium text-neutral-400 bg-neutral-100"
                >
                    <div className="flex justify-center items-center">
                        <PlusIcon />
                    </div>
                    일정 추가하기
                </button>
            </div>
        </AdminSection>
    );
}

export { MonthlyEventSchedule };
