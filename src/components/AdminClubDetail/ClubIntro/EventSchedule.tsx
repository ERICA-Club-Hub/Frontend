import useToggle from '@/hooks/useToggle';
import styled from 'styled-components';
import DropdownArrow from '@/assets/common/dropdown_arrow.svg?react';
import { months } from '@/constants/club-detail-register';
import useClubIntroContext from '@/hooks/useClubIntroContext';
import { IEventScheduleValue } from '@/types';
import { Dropdown, InputField } from '@/components/Common';

function EventSchedule({
    schedule,
    index,
}: {
    schedule: IEventScheduleValue;
    index: number;
}) {
    const { isOpen, setIsOpen, toggle } = useToggle();
    const { setSchedules } = useClubIntroContext();

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
                value={schedule.content}
                name="content"
                onChange={handleInputValue}
                inputSize="small"
                backgroundColor="gray"
                placeholder="일정을 입력해 주세요."
                maxLength={30}
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
