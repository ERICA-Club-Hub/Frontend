import useToggle from '@/hooks/actions/useToggle';
import DropdownArrow from '@/assets/common/dropdown_arrow.svg?react';
import { months } from '@/constants/club-detail-register';
import useClubIntroContext from '@/hooks/contexts/useClubIntroContext';
import { IEventScheduleValue } from '@/types';
import { Dropdown, InputField } from '@/components/Common';
import { useEffect } from 'react';
import DeleteIcon from '@/assets/common/plus-icon.svg?react';
import { cn } from '@/utils/cn';

function EventSchedule({
    schedule,
    index,
}: {
    schedule: IEventScheduleValue;
    index: number;
}) {
    const { isOpen, setIsOpen, toggle } = useToggle();
    const {
        schedules,
        setSchedules,
        setPostSchedules,
        deleteScheduleIdList,
        setDeleteScheduleIdList,
    } = useClubIntroContext();

    // 월 선택
    const handleMonthValue = (month: string) => {
        const monthValue = parseInt(month); // number 타입으로 변환 ('10월' -> 10)

        setSchedules((prevSchedules) => {
            let updatedSchedules = [...prevSchedules];
            updatedSchedules[index] = {
                ...prevSchedules[index],
                month: monthValue,
            };

            return updatedSchedules;
        });

        toggle();
    };

    // 일정 내용 입력
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSchedules((prevSchedules) => {
            let updatedSchedules = [...prevSchedules];
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
    }, [schedules]);

    // 일정 삭제
    const handleDeleteSchedule = () => {
        // 우선 보여지는 화면에서 삭제 (API 요청은 id 리스트로 모아서 저장하기 트리거 시 보냄)
        setSchedules((prevSchedules) => {
            let updatedSchedules = [...prevSchedules];
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
            <Dropdown setIsOpen={setIsOpen}>
                <Dropdown.Header onClick={toggle}>
                    <div className="flex justify-center items-center w-[50px] h-[40px] rounded-[10px] bg-neutral-100">
                        <h4 className="text-caption font-medium text-black">
                            {`${schedule.month}월`}
                        </h4>
                        <div className="flex justify-center items-center">
                            <DropdownArrow />
                        </div>
                    </div>
                </Dropdown.Header>

                <Dropdown.Menu isOpen={isOpen}>
                    <ul className="absolute top-[5px] left-0 flex flex-col items-center gap-[5px] w-[50px] h-[108px] px-[4px] rounded-[10px] bg-white shadow-[0px_3px_3px_rgba(0,0,0,0.15)] overflow-auto">
                        {months.map((month, idx) => {
                            const isSelected =
                                schedule.month === parseInt(month);
                            return (
                                <li
                                    key={`recruit-status-${idx}`}
                                    onClick={() => handleMonthValue(month)}
                                    className={cn(
                                        'flex justify-center items-center w-[36px] min-h-[25px] rounded-[7px] text-caption font-medium text-black cursor-pointer',
                                        isSelected
                                            ? 'bg-neutral-100'
                                            : 'bg-white',
                                    )}
                                >
                                    {month}
                                </li>
                            );
                        })}
                    </ul>
                </Dropdown.Menu>
            </Dropdown>

            <div className="relative">
                <InputField
                    value={schedule.content}
                    name="content"
                    onChange={handleInputValue}
                    inputSize="small"
                    backgroundColor="gray"
                    placeholder="일정을 입력해 주세요."
                    maxLength={30}
                    style={{ paddingRight: '36px' }}
                />
                <DeleteIcon
                    onClick={handleDeleteSchedule}
                    className="absolute top-[8px] right-[12px] w-[24px] h-[24px] rotate-45 cursor-pointer [&_path]:stroke-[#33363f]"
                />
            </div>
        </div>
    );
}

export { EventSchedule };
