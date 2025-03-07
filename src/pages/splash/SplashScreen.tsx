import styled, { keyframes } from 'styled-components';
import Logo from '@/assets/splash/logo.svg?react';
import LogoText from '@/assets/splash/logo-text.svg?react';

function SplashScreen() {
    return (
        <>
            <Container>
                <LogoWrapper>
                    <Logo />
                    <LogoText />
                </LogoWrapper>
            </Container>
        </>
    );
}

export { SplashScreen };

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const backgroundFade = keyframes`
    from {
        opacity: 0.9;
    }
    to {
        opacity: 1;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom, #0d2138, #0f2948);
    animation: ${backgroundFade} 1s ease-in-out;
`;

const LogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    animation: ${fadeIn} 1.5s ease-in-out;
`;
