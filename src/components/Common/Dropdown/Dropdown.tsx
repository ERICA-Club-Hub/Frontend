import { ReactNode, useRef } from 'react';
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

    return (
        <div ref={dropdownRef} className="relative">
            {children}
        </div>
    );
};

Dropdown.Header = DropdownHeader;
Dropdown.Menu = DropdownMenu;

export { Dropdown };
