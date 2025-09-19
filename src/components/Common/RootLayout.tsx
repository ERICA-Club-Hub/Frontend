import { ReactNode } from 'react';
import styled from 'styled-components';
import { AppHeader } from './Header/AppHeader';

function RootLayout({ children }: { children: ReactNode }) {
    return (
        <Container>
            <AppHeader />
            {children}
        </Container>
    );
}

export { RootLayout };

const Container = styled.main`
    min-width: 360px;
    max-width: 600px;
    min-height: 100vh;
    padding-top: 55px;
    margin: 0 auto;
    background-color: ${(props) => props.theme.colors.bgLightGray};
`;
