import { ReactNode } from 'react';
import styled from 'styled-components';

const RootLayout = ({ children }: { children: ReactNode }) => {
    return <Container>{children}</Container>;
};

export { RootLayout };

const Container = styled.div`
    min-width: 360px;
    max-width: 400px;
    height: 100vh;
    margin: 0 auto;

    background-color: ${(props) => props.theme.color.bgLightGray};
`;
