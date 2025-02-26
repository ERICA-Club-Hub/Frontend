import useToggle from '@/hooks/useToggle';
import styled from 'styled-components';
import { Dropdown, InputField } from '../../Common';
import { useState } from 'react';
import DropdownArrow from '@/assets/common/dropdown_arrow.svg?react';
import { months } from '@/constants/club-detail-register';

function EventSchedule() {
    const { isOpen, setIsOpen, toggle } = useToggle();
    const [selectedValue, setSelectedValue] = useState<string>('');

    return (
        <Container>
            <Dropdown setIsOpen={setIsOpen}>
                <Dropdown.Header onClick={toggle}>
                    <DropdownHeaderWrapper $selectedValue={selectedValue}>
                        <h4>{selectedValue || '1월'}</h4>
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
                                onClick={() => {
                                    setSelectedValue(month);
                                    toggle();
                                }}
                                $isSelected={selectedValue === month}
                            >
                                {month}
                            </DropdownItem>
                        ))}
                    </DropdownItemList>
                </Dropdown.Menu>
            </Dropdown>

            <InputField
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

const DropdownHeaderWrapper = styled.div<{ $selectedValue: string }>`
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
