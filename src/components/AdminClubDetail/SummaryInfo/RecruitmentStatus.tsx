import styled from 'styled-components';
import { Dropdown } from '@/components/Common';
import DropdownArrow from '@/assets/common/dropdown_arrow.svg?react';
import { Label, SectionWrapper } from '@/styles/admin-club-detail/style';
import useToggle from '@/hooks/actions/useToggle';
import { recruitStatus } from '@/constants/club-detail-register.constant';
import { ISummaryInfoValue } from '@/types';

interface IRecruitmentStatus {
    inputValue: ISummaryInfoValue;
    setInputValue: React.Dispatch<React.SetStateAction<ISummaryInfoValue>>;
}

function RecruitmentStatus({ inputValue, setInputValue }: IRecruitmentStatus) {
    const { isOpen, setIsOpen, toggle } = useToggle();

    // 동아리 모집 여부 상태 변경
    const handleRecruitmentStatus = (item: { value: string }) => {
        setInputValue({
            ...inputValue,
            recruitmentStatus: item.value,
        });
        toggle();
    };

    return (
        <Container>
            <Label>동아리 모집 여부</Label>
            <Dropdown setIsOpen={setIsOpen}>
                <Dropdown.Header onClick={toggle}>
                    <DropdownHeaderWrapper
                        $selectedValue={inputValue.recruitmentStatus}
                    >
                        <h4>
                            {inputValue.recruitmentStatus === 'UPCOMING'
                                ? '모집예정'
                                : inputValue.recruitmentStatus === 'OPEN'
                                ? '모집중'
                                : inputValue.recruitmentStatus === 'CLOSED'
                                ? '모집완료'
                                : '모집기준 선택'}
                        </h4>
                        <IconWrapper $isOpen={isOpen}>
                            <DropdownArrow />
                        </IconWrapper>
                    </DropdownHeaderWrapper>
                </Dropdown.Header>
                <Dropdown.Menu isOpen={isOpen}>
                    <DropdownItemList>
                        {recruitStatus.map((item, index) => (
                            <DropdownItem
                                key={`recruit-status-${index}`}
                                onClick={() => handleRecruitmentStatus(item)}
                                $isSelected={
                                    inputValue.recruitmentStatus === item.value
                                }
                            >
                                {item.label}
                            </DropdownItem>
                        ))}
                    </DropdownItemList>
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    );
}

export { RecruitmentStatus };

const Container = styled(SectionWrapper)`
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

const IconWrapper = styled.div<{ $isOpen?: boolean }>`
    transform: ${({ $isOpen }) =>
        $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.4s ease;
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
