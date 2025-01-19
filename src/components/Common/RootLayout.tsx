import { ReactNode } from 'react';
import styled from 'styled-components';
import { HeaderMenu } from './HeaderMenu';

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Container>
            <HeaderMenu />
            {children}
        </Container>
    );
};

export { RootLayout };

const Container = styled.main`
    min-width: 360px;
    max-width: 400px;
    min-height: 100vh;
    margin: 0 auto;

    background-color: ${(props) => props.theme.colors.bgLightGray};
`;
