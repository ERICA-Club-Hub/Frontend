import styled from 'styled-components';
import { Dropdown } from '@/components/Common';
import useToggle from '@/hooks/useToggle';
import { useState } from 'react';
import DropdownArrow from '@/assets/common/dropdown_arrow.svg?react';
import { recruitStatus } from '@/constants/club-detail-register';

export default function SummaryInfo() {
    const { isOpen, setIsOpen, toggle } = useToggle();
    const [selectedValue, setSelectedValue] = useState<string>('');

    return (
        <Container>
            <RecruitmentStatus>
                <Label>동아리 모집 여부</Label>
                <Dropdown setIsOpen={setIsOpen}>
                    <Dropdown.Header onClick={toggle}>
                        <DropdownHeaderWrapper $selectedValue={selectedValue}>
                            <h4>{selectedValue || '모집기준 선택'}</h4>
                            <div>
                                <DropdownArrow />
                            </div>
                        </DropdownHeaderWrapper>
                    </Dropdown.Header>
                    <Dropdown.Menu isOpen={isOpen}>
                        <DropdownItemList>
                            {recruitStatus.map((item, index) => (
                                <DropdownItem
                                    key={`recruit-status-${index}`}
                                    onClick={() => {
                                        setSelectedValue(item);
                                        toggle();
                                    }}
                                    $isSelected={selectedValue === item}
                                >
                                    {item}
                                </DropdownItem>
                            ))}
                        </DropdownItemList>
                    </Dropdown.Menu>
                </Dropdown>
            </RecruitmentStatus>
        </Container>
    );
}

const Container = styled.section`
    height: 815px;
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 320px;
    padding: 0 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
`;

const Label = styled.label`
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainBlack};
`;

const RecruitmentStatus = styled(InnerWrapper)`
    height: 101px;
    gap: 8px;
`;

const DropdownHeaderWrapper = styled.div<{ $selectedValue: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 280px;
    height: 40px;
    padding: 0 15px;
    border-radius: 10px;
    h4 {
        font-size: 14px;
        font-weight: ${({ $selectedValue }) =>
            $selectedValue ? '500' : '400'};
        color: ${({ $selectedValue, theme }) =>
            $selectedValue ? theme.colors.mainBlack : theme.colors.subGray};
    }
    background-color: ${({ theme }) => theme.colors.lightGray};
`;

const DropdownItemList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    position: absolute;
    top: 11px;
    left: 0;
    width: 280px;
    height: 138px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li<{ $isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 36px;
    border-radius: 5px;

    font-size: 14px;
    color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.white : theme.colors.mainBlack};
    background-color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.mainBlue : theme.colors.lightGray};
    cursor: pointer;
`;
