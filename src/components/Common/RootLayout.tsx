import { ReactNode } from 'react';
import styled from 'styled-components';
import { HeaderMenu } from './HeaderMenu';
import Button from './Button';

const RootLayout = ({ children }: { children: ReactNode }) => {
    const checkDisabled = () => {
        return false;
    };
    return (
        <Container>
            <HeaderMenu />
            {children}
            <Button
                size="small"
                handleClick={() => alert('small button')}
                isDisabled={checkDisabled}
            >
                작은 버튼
            </Button>
            <Button
                size="large"
                handleClick={() => alert('large button')}
                isDisabled={checkDisabled}
            >
                큰 버튼
            </Button>
            <Button
                size="medium"
                handleClick={() => alert('medium button')}
                isDisabled={checkDisabled}
            >
                중간 버튼
            </Button>
        </Container>
    );
};

export { RootLayout };

const Container = styled.div`
    min-width: 360px;
    max-width: 400px;
    height: 100vh;
    margin: 0 auto;

    background-color: ${(props) => props.theme.colors.bgLightGray};
`;
