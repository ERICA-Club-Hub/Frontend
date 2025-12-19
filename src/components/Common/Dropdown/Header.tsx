import { ReactNode } from 'react';

export interface DropdownHeaderProps {
    children: ReactNode;
    onClick: () => void;
}

const DropdownHeader = ({ children, onClick }: DropdownHeaderProps) => {
    return (
        <div onClick={onClick} className="cursor-pointer">
            <h4>{children}</h4>
        </div>
    );
};

export default DropdownHeader;
