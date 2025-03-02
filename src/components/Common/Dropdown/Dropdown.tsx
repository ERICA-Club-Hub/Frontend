import { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import DropdownHeader from './Header';
import { useClickOutside } from '@/hooks/actions/useClickOutside';
import DropdownMenu from './Menu';

interface DropdownProps {
    children: ReactNode;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown = ({ children, setIsOpen }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, setIsOpen);

    return <DropdownContainer ref={dropdownRef}>{children}</DropdownContainer>;
};

Dropdown.Header = DropdownHeader;
Dropdown.Menu = DropdownMenu;

export { Dropdown };

const DropdownContainer = styled.div`
    position: relative;
`;
