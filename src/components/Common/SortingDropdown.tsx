import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import ArrowIcon from '../../assets/common/sortingdropdown_arrow.svg';

interface SortingOption {
    label: string;
    value: string;
}

interface SortingDropdownProps {
    options: SortingOption[];
    onSelect?: (value: string) => void;
    defaultText: string;
    value?: string;
    align?: 'left' | 'right';
}

const StyledDropdown = styled.div<{ $isSelected: boolean; $selectedValue: string | null; $firstOptionValue: string | null }>`
    display: inline-flex;
    padding: 5px 11px;
    align-items: center;
    gap: 6px;
    border-radius: 100px;
    background: ${props => {
        // 첫 번째 옵션이 선택되었을 때는 흰색 배경 유지
        if (props.$selectedValue === props.$firstOptionValue) return '#FFF';
        // 다른 옵션이 선택되었을 때는 파란색 배경으로 변경
        return props.$isSelected ? '#EEF4FF' : '#FFF';
    }};
    position: relative;
    cursor: pointer;
`;

const StyledList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;
`;

const StyledDropdownMenu = styled.ul<{ $isOpen: boolean; $align?: 'left' | 'right' }>`
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    ${props => props.$align === 'right' ? 'right: 0;' : 'left: 0;'}
    min-width: 100%;
    list-style: none;
    padding: 5px;
    margin-top: 5px;
    background: #FFF;
    border-radius: 10px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.10);
    z-index: 1000;
    white-space: nowrap;
`;

const StyledMenuItem = styled.li`
    color: #232323;
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 8px 11px;
    border-radius: 5px;

    &:hover {
        font-weight: 600;
        background: #F7F7F7;
    }
`;

const StyledListItem = styled.li<{ $isSelected?: boolean }>`
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: ${props => props.$isSelected ? '600' : '400'};
    line-height: normal;
    cursor: pointer;
`;

const ArrowImage = styled.img<{ $isOpen: boolean }>`
    width: 8px;
    height: 5px;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.2s ease-in-out;
`;

const SortingDropdown = ({ options, onSelect, defaultText, value, align = 'left' }: SortingDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(value || null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedValue(value || null);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onSelect?.(value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <StyledDropdown 
            ref={dropdownRef} 
            $isSelected={selectedValue !== null}
            $selectedValue={selectedValue}
            $firstOptionValue={options[0]?.value || null}
        >
            <StyledList onClick={toggleDropdown}>
                {selectedValue === null ? (
                    <StyledListItem>{defaultText}</StyledListItem>
                ) : (
                    <StyledListItem $isSelected={true}>
                        {options.find(option => option.value === selectedValue)?.label}
                    </StyledListItem>
                )}
                <ArrowImage src={ArrowIcon} alt="arrow" $isOpen={isOpen} />
            </StyledList>
            
            <StyledDropdownMenu $isOpen={isOpen} $align={align}>
                {options.map((option) => (
                    <StyledMenuItem
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                    >
                        {option.label}
                    </StyledMenuItem>
                ))}
            </StyledDropdownMenu>
        </StyledDropdown>
    );
};

export default SortingDropdown;
