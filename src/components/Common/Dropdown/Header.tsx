import { ReactNode } from 'react';
import styled from 'styled-components';

export interface DropdownHeaderProps {
    children: ReactNode;
    onClick: () => void;
}

const DropdownHeader = ({ children, onClick }: DropdownHeaderProps) => {
    return (
        <Container onClick={onClick}>
            <h4>{children}</h4>
        </Container>
    );
};

export default DropdownHeader;

const Container = styled.div`
    cursor: pointer;
`;
