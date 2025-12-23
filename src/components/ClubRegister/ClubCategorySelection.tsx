import useToggle from '@/hooks/actions/useToggle';
import { InnerWrapper, Label } from '@/styles/registration-form';
import styled from 'styled-components';
import { Dropdown } from '../Common';
import ExpandArrowIcon from '@/assets/common/expand-arrow.svg?react';
import { IClubRegisterValue } from '@/types';
import { clubCategory } from '@/constants/navigations.constant';

interface IClubCategorySelection {
    inputValue: IClubRegisterValue;
    setInputValue: React.Dispatch<React.SetStateAction<IClubRegisterValue>>;
}

function ClubCategorySelection({
    inputValue,
    setInputValue,
}: IClubCategorySelection) {
    const { isOpen, setIsOpen, toggle } = useToggle();

    // 카테고리 선택 시, 해당 카테고리의 데이터명(ex.ART)이 아닌 label(ex.예술)을 렌더링
    const renderCategoryTitle = () => {
        const category = clubCategory.find(
            (category) => category.name === inputValue.category,
        );
        return category ? category.label : '카테고리 선택';
    };

    return (
        <InnerWrapper>
            <Label>동아리 카테고리</Label>
            <Dropdown setIsOpen={setIsOpen}>
                <Dropdown.Header onClick={toggle}>
                    <DropdownHeaderWrapper $selectedValue={inputValue.category}>
                        <h4>{renderCategoryTitle()}</h4>
                        <IconWrapper $isOpen={isOpen}>
                            <ExpandArrowIcon />
                        </IconWrapper>
                    </DropdownHeaderWrapper>
                </Dropdown.Header>
                <Dropdown.Menu isOpen={isOpen}>
                    <DropdownItemList>
                        {clubCategory.map((item, index) => (
                            <DropdownItem
                                key={`club-category-${index}`}
                                onClick={() => {
                                    setInputValue({
                                        ...inputValue,
                                        category: item.name,
                                    });
                                    toggle();
                                }}
                                $isSelected={inputValue.category === item.name}
                            >
                                {item.label}
                            </DropdownItem>
                        ))}
                    </DropdownItemList>
                </Dropdown.Menu>
            </Dropdown>
        </InnerWrapper>
    );
}

export { ClubCategorySelection };

const DropdownHeaderWrapper = styled.strong<{ $selectedValue: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 320px;
    height: 45px;
    padding: 14px 17px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.subGray};
    background-color: ${({ theme }) => theme.colors.white};

    h4 {
        font-size: 14px;
        font-weight: ${({ $selectedValue }) =>
            $selectedValue ? '500' : '400'};
        color: ${({ $selectedValue, theme }) =>
            $selectedValue ? theme.colors.mainBlack : theme.colors.subGray};
    }
`;

const IconWrapper = styled.div<{ $isOpen: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease;
`;

const DropdownItemList = styled.ul`
    position: absolute;
    top: 5px;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
    width: 320px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li<{ $isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 145px;
    height: 36px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '400')};
    color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.white : theme.colors.mainBlack};
    background-color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.mainBlue : theme.colors.lightGray};
    cursor: pointer;
`;
