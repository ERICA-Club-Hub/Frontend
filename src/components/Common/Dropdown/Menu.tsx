import { ReactNode } from 'react';
import styled from 'styled-components';

export interface DropdownMenuProps {
    children: ReactNode;
    isOpen: boolean;
}

const DropdownMenu = ({ children, isOpen }: DropdownMenuProps) => {
    return <Container $isOpen={isOpen}>{children}</Container>;
};

export default DropdownMenu;

const Container = styled.div<{ $isOpen: boolean }>`
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
`;
