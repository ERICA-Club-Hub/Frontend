import useToggle from '@/hooks/actions/useToggle';
import styled from 'styled-components';
import DropdownArrow from '@/assets/common/dropdown_arrow.svg?react';
import { months } from '@/constants/club-detail-register';
import useClubIntroContext from '@/hooks/contexts/useClubIntroContext';
import { IEventScheduleValue } from '@/types';
import { Dropdown, InputField } from '@/components/Common';
import { useEffect } from 'react';
import DeleteIcon from '@/assets/common/plus-icon.svg?react';
import useClubAdminQueries from '@/hooks/queries/useClubAdminQueries';

function EventSchedule({
    schedule,
    index,
}: {
    schedule: IEventScheduleValue;
    index: number;
}) {
    const { isOpen, setIsOpen, toggle } = useToggle();
    const { schedules, setSchedules, setPostSchedules } = useClubIntroContext();

    // 일정 삭제하기 mutation 호출
    const { useDeleteEventScheduleMutation } = useClubAdminQueries();
    const deleteEventScheduleMutation = useDeleteEventScheduleMutation(
        schedule.id,
    );
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
        deleteEventScheduleMutation.mutate();
    };

    return (
        <Container>
            <Dropdown setIsOpen={setIsOpen}>
                <Dropdown.Header onClick={toggle}>
                    <DropdownHeaderWrapper>
                        <h4>{`${schedule.month}월`}</h4>
                        <IconWrapper>
                            <DropdownArrow />
                        </IconWrapper>
                    </DropdownHeaderWrapper>
                </Dropdown.Header>

                <Dropdown.Menu isOpen={isOpen}>
                    <DropdownItemList>
                        {months.map((month, index) => (
                            <DropdownItem
                                key={`recruit-status-${index}`}
                                onClick={() => handleMonthValue(month)}
                                $isSelected={schedule.month === parseInt(month)}
                            >
                                {month}
                            </DropdownItem>
                        ))}
                    </DropdownItemList>
                </Dropdown.Menu>
            </Dropdown>

            <InputFieldWrapper>
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
                <StyeldDeleteIcon onClick={handleDeleteSchedule} />
            </InputFieldWrapper>
        </Container>
    );
}

export { EventSchedule };

const Container = styled.div`
    position: relative;
    display: flex;
    gap: 5px;
`;

const DropdownHeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 40px;
    border-radius: 10px;

    h4 {
        font-size: 12px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.mainBlack};
    }
    background-color: ${({ theme }) => theme.colors.lightGray};
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DropdownItemList = styled.ul`
    position: absolute;
    top: 5px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    width: 50px;
    height: 108px;
    padding: 0 4px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
    overflow: auto;
`;

const DropdownItem = styled.li<{ $isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    min-height: 25px;
    border-radius: 7px;

    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.mainBlack};
    background-color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.lightGray : theme.colors.white};
    cursor: pointer;
`;

const InputFieldWrapper = styled.div`
    postion: relative;
`;

const StyeldDeleteIcon = styled(DeleteIcon)`
    position: absolute;
    top: 8px;
    right: 12px;
    cursor: pointer;
    width: 24px;
    height: 24px;
    transform: rotate(45deg);

    path {
        stroke: #33363f;
    }
`;
