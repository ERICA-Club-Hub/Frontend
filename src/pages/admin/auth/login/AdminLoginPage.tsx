import { TopNavigator } from '@/components/Common';
import { loginNavigations } from '@/constants';
import { useState } from 'react';
import styled from 'styled-components';

const AdminLoginPage = () => {
    const [navStatus, setNavStatus] = useState<number>(1);

    const handleNavStatus = (id: number) => {
        setNavStatus(id);
    };

    return (
        <Container>
            <TopNavigator
                navStatus={navStatus}
                navList={loginNavigations}
                onClick={handleNavStatus}
            />

            <LoginContainer />
        </Container>
    );
};

export { AdminLoginPage };

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 162px;
`;

const LoginContainer = styled.div`
    width: 320px;
    height: 135px;
`;
