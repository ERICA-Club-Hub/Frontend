import { useState } from 'react';
import { Dropdown } from '../Common';
import styled from 'styled-components';
import ArrowIcon from '../../assets/common/expand-bottom.svg?react';
import { useSearchParams } from 'react-router-dom';

interface ClubListDropdownProps {
    title?: string;
    menuList?: string[];
    searchKey: string;
}

export default function CLubListDropdown({
    title,
    menuList,
    searchKey,
}: ClubListDropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const selectedMenu = searchParams.get(searchKey) || null;

    const handleSelectItem = (selectedItem: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(searchKey, selectedItem);
        setSearchParams(newParams);
    };
    return (
        <Dropdown setIsOpen={setIsOpen}>
            <Dropdown.Header onClick={() => setIsOpen((prev) => !prev)}>
                <DropdownHeaderContainer
                    $isSelected={selectedMenu ? true : false}
                >
                    <DropdownHeaderContent>
                        {selectedMenu ? selectedMenu : title}
                    </DropdownHeaderContent>
                    <ArrowIcon />
                </DropdownHeaderContainer>
            </Dropdown.Header>
            <Dropdown.Menu isOpen={isOpen}>
                <DropdownMenuContainer>
                    {menuList &&
                        menuList.map((menu) => (
                            <DropdownMenuItem
                                $isSelected={selectedMenu === menu}
                                onClick={() => handleSelectItem(menu)}
                            >
                                <DropdownMenuContent key={menu}>
                                    {menu}
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
    margin-top: 5px;
    background-color: white;
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 5px;
    justify-content: center;
    align-items: center;
    width: max-content;
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
