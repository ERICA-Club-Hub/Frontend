import useToggle from '@/hooks/useToggle';
import styled from 'styled-components';
import { Dropdown, InputField } from '../../Common';
import { useEffect, useState } from 'react';
import DropdownArrow from '@/assets/common/dropdown_arrow.svg?react';
import { months } from '@/constants/club-detail-register';
import useClubIntroContext from '@/hooks/useClubIntroContext';
import { IEventScheduleValue } from '@/types';

function EventSchedule({
    schedule,
    index,
}: {
    schedule: IEventScheduleValue;
    index: number;
}) {
    const { isOpen, setIsOpen, toggle } = useToggle();
    const { schedules, setSchedules } = useClubIntroContext();
    const [scheduleValue, setScheduleValue] =
        useState<IEventScheduleValue>(schedule); // 단일 schedule 객체 값 상태로 분리

    // 월 선택
    const handleMonthValue = (month: string) => {
        const monthValue = parseInt(month); // number 타입으로 변환

        setScheduleValue({ ...scheduleValue, month: monthValue });
        toggle();
    };

    // 일정 내용 입력
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setScheduleValue({ ...scheduleValue, [name]: value });
    };

    // schedules 배열의 index에 scheduleValue를 업데이트
    useEffect(() => {
        setSchedules((prevSchedules) => {
            let updatedSchedules = [...prevSchedules];
            updatedSchedules[index] = scheduleValue;

            return updatedSchedules;
        });
        console.log(schedules);
    }, [scheduleValue]);

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

            <InputField
                value={scheduleValue.content}
                name="content"
                onChange={handleInputValue}
                inputSize="small"
                backgroundColor="gray"
                placeholder="일정을 입력해 주세요."
            />
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
