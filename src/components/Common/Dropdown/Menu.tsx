import { ReactNode } from 'react';
import styled from 'styled-components';

export interface DropdownMenuProps {
    children: ReactNode;
    isOpen: boolean;
}

const DropdownMenu = ({ children, isOpen }: DropdownMenuProps) => {
    if (!isOpen) return null;
    return <Container $isOpen={isOpen}>{children}</Container>;
};

export default DropdownMenu;

const Container = styled.div<{ $isOpen: boolean }>`
    background-color: ${({ theme }) => theme.colors.white};
    transform: translateY(0);

    @keyframes dropdown {
        0% {
            transform: translateY(-15px);
        }
        100% {
            transform: translateY(0);
        }
    }
    animation: dropdown 0.3s ease;
`;
