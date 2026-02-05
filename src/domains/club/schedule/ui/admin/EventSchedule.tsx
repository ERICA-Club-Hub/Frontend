import useClubIntroContext from '@/domains/shared/contexts/useClubIntroContext';
import InputField from '@/components/InputField/InputField';
import { useEffect } from 'react';
import { IEventScheduleValue } from '@/types/input-value.types';
import MonthSelect from './MonthSelect';
import DeleteIcon from '@/assets/trash.svg?react';

export default function EventSchedule({
    schedule,
    index,
}: {
    schedule: IEventScheduleValue;
    index: number;
}) {
    const {
        schedules,
        setSchedules,
        setPostSchedules,
        deleteScheduleIdList,
        setDeleteScheduleIdList,
    } = useClubIntroContext();

    // 월 선택
    const handleMonthValue = (monthValue: number) => {
        setSchedules((prevSchedules) => {
            const updatedSchedules = [...prevSchedules];
            updatedSchedules[index] = {
                ...prevSchedules[index],
                month: monthValue,
            };

            return updatedSchedules;
        });
    };

    // 일정 내용 입력
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSchedules((prevSchedules) => {
            const updatedSchedules = [...prevSchedules];
            updatedSchedules[index] = {
                ...prevSchedules[index],
                [name]: value,
            };

            return updatedSchedules;
        });
    };

    // 추가된 일정과, 수정된 일정을 필터링하여 postSchedules에 추가
    useEffect(() => {
        setPostSchedules(() => {
            // isNewSchedule인 일정은 새로 추가된 일정으로 판단
            const newSchedules = schedules
                .filter((schedule) => schedule.isNewSchedule)
                .map((schedule) => ({
                    // isNewSchedule 제외
                    month: schedule.month,
                    content: schedule.content,
                }));

            // isNewSchedule이 아닌 일정은 수정된 일정으로 판단
            const updatedSchedules = schedules
                .filter((schedule) => !schedule.isNewSchedule)
                .map((schedule) => ({
                    ...schedule,
                    scheduleId: schedule.id, // scheduleId 추가
                }));

            return [...newSchedules, ...updatedSchedules];
        });
    }, [schedules, setPostSchedules]);

    // 일정 삭제
    const handleDeleteSchedule = () => {
        // 우선 보여지는 화면에서 삭제 (API 요청은 id 리스트로 모아서 저장하기 트리거 시 보냄)
        setSchedules((prevSchedules) => {
            const updatedSchedules = [...prevSchedules];
            updatedSchedules.splice(index, 1);

            return updatedSchedules;
        });

        // 삭제할 일정 id 리스트에 추가
        if (schedule.id) {
            setDeleteScheduleIdList([...deleteScheduleIdList, schedule.id]);
        }
    };

    return (
        <div className="relative flex gap-[5px]">
            <MonthSelect
                handleMonthValue={handleMonthValue}
                selectedValue={schedules[index].month}
            />

            <div className="relative">
                <InputField
                    inputType="date"
                    value={schedule.content}
                    name="content"
                    onChange={handleInputValue}
                    placeholder="일정을 입력해 주세요."
                    maxLength={30}
                    rightIcon={<DeleteIcon />}
                    iconClickHandler={handleDeleteSchedule}
                />
            </div>
        </div>
    );
}
