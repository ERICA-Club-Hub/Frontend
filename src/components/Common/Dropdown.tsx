import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// Header Size
// large 320 X 45
// medium  280 X 40
// small  50 X 40

type Size = 'large' | 'medium' | 'small';

interface DropdownProps {
    children: React.ReactNode;
    selectedValue: string;
    size: Size;
    icon?: React.ReactNode;
}

const Dropdown = ({ children, selectedValue, size, icon }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                // 필터 메뉴 DOM이 화면에 렌더링 되어 있고
                dropdownRef.current &&
                // 현재 클릭된 위치가 필터 메뉴 외부일 때
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        // mousedown(마우스 버튼이 눌린 순간) 이벤트가 발생할 때마다 함수
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <DropdownContainer ref={dropdownRef}>
            <DropdownHeader
                $size={size}
                $isOpen={isOpen}
                $selectedValue={selectedValue}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <h4>
                    {selectedValue ||
                        (size === 'large'
                            ? '카테고리 선택'
                            : size === 'medium'
                            ? '모집기준 선택'
                            : '1월')}
                </h4>
                {icon && <IconWrapper $isOpen={isOpen}>{icon}</IconWrapper>}
            </DropdownHeader>

            {isOpen && (
                <DropdownBody $size={size} $isOpen={isOpen}>
                    {children}
                </DropdownBody>
            )}
        </DropdownContainer>
    );
};

export { Dropdown };

const DropdownContainer = styled.div`
    position: relative;
`;

const DropdownHeader = styled.div<{
    $size: string;
    $isOpen: boolean;
    $selectedValue: string;
}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: skyblue;

    // 안눌렀을 때 && 누르고 있을 때 -> 회색
    // 누른 후 -> 검정

    h4 {
        font-size: 14px;
        font-weight: ${({ $selectedValue }) =>
            $selectedValue ? '500' : '400'};
        color: ${({ $selectedValue, theme }) =>
            $selectedValue ? theme.colors.mainBlack : theme.colors.subGray};
    }

    ${({ $size, theme }) =>
        $size === 'large'
            ? `                
                width: 320px;
                height: 45px;
                padding: 14px 17px;
                background-color: ${theme.colors.white};
`
            : $size === 'medium'
            ? `                
                width: 280px;
                height: 40px;
                padding: 11px 15px;
    `
            : `                
                width: 50px;
                height: 40px;
                padding: 13px 9px;
    `}
`;

const IconWrapper = styled.div<{ $isOpen: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease;
`;

const DropdownBody = styled.div<{ $size: string; $isOpen: boolean }>`
    position: absolute;
    top: 50px;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};

    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transform: ${({ $isOpen }) =>
        $isOpen ? 'translateY(0)' : 'translateY(-10px)'};
    transition: opacity 0.3s ease, transform 0.3s ease;

    @keyframes dropdown {
        0% {
            transform: translateY(-15px);
        }
        100% {
            transform: translateY(0);
        }
    }
    animation: dropdown 0.3s ease;

    ${({ $size }) =>
        $size === 'large'
            ? `                
                width: 320px;
    `
            : $size === 'medium'
            ? `                
                width: 280px;

             ul {
                padding: 10px;
            }
    `
            : $size === 'small'
            ? `                
                width: 50px;
    `
            : ``}

    ul {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    li {
        cursor: pointer;
    }
`;
