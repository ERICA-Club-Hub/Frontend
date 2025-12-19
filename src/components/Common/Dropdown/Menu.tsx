import { ReactNode } from 'react';

export interface DropdownMenuProps {
    children: ReactNode;
    isOpen: boolean;
}

const DropdownMenu = ({ children, isOpen }: DropdownMenuProps) => {
    if (!isOpen) return null;
    return (
        <div className="relative bg-white z-[999] animate-[dropdown-slide_0.3s_ease]">
            {children}
        </div>
    );
};

export default DropdownMenu;
