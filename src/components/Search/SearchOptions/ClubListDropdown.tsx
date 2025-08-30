import { useState } from 'react';
import { Dropdown } from '../../Common';
import styled from 'styled-components';
import ArrowIcon from '../../../assets/common/expand-bottom.svg?react';

interface Option {
    value: string;
    label: string;
}

interface ClubListDropdownProps {
    title?: string;
    options?: Option[];
    selectedValue?: string;
    onSelect: (value: string) => void;
}

export default function ClubListDropdown({
    title,
    options,
    selectedValue,
    onSelect,
}: ClubListDropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelectItem = (option: Option) => {
        onSelect(option.value);
        setIsOpen(false);
    };
    return (
        <Dropdown setIsOpen={setIsOpen}>
            <Dropdown.Header onClick={() => setIsOpen((prev) => !prev)}>
                <DropdownHeaderContainer
                    $isSelected={selectedValue ? true : false}
                >
                    <DropdownHeaderContent>
                        {selectedValue ? selectedValue : title}
                    </DropdownHeaderContent>
                    <ArrowIcon />
                </DropdownHeaderContainer>
            </Dropdown.Header>
            <Dropdown.Menu isOpen={isOpen}>
                <DropdownMenuContainer>
                    {options &&
                        options.map((option) => (
                            <DropdownMenuItem
                                $isSelected={selectedValue === option.label}
                                onClick={() => handleSelectItem(option)}
                            >
                                <DropdownMenuContent>
                                    {option.label}
                                </DropdownMenuContent>
                            </DropdownMenuItem>
                        ))}
                </DropdownMenuContainer>
            </Dropdown.Menu>
        </Dropdown>
    );
}

const DropdownHeaderContainer = styled.div<{ $isSelected: boolean }>`
    height: 24px;
    padding: 5px 11px 5px 11px;
    display: flex;
    gap: 6px;
    background-color: ${({ $isSelected }) =>
        $isSelected ? 'rgba(238, 244, 255, 1)' : 'rgba(255, 255, 255, 1)'};
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    width: max-content;
`;

const DropdownHeaderContent = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: black;
`;

const DropdownMenuContainer = styled.div`
    border-radius: 10px;
    top: 5px;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 5px;
    justify-content: center;
    align-items: center;
    width: max-content;
    position: absolute;
`;

const DropdownMenuItem = styled.button<{ $isSelected: boolean }>`
    width: 100%;
    padding: 8px 24px 8px 24px;
    border-radius: 5px;
    background-color: ${({ $isSelected }) =>
        $isSelected ? '#F7F7F7' : 'white'};
    font-weight: ${({ $isSelected }) => ($isSelected ? 600 : 500)};
`;

const DropdownMenuContent = styled.p`
    font-size: 12px;
`;
