import { Input, TopNavigator } from '@/components/Common';
import Button from '@/components/Common/Button';
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
            <LoginContainer>
                <h2>동아리 대표이신가요?</h2>
                <Form action="">
                    <Input
                        placeholder="부여받은 동아리 코드를 입력해 주세요"
                        size="large"
                        backgroundColor="white"
                    />
                    <Button size="large" isDisabled={() => false}>
                        어드민 로그인하기
                    </Button>
                </Form>
                <RegisterButton>동아리 등록하기</RegisterButton>
            </LoginContainer>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    height: 135px;
    margin-top: 50px;

    h2 {
        width: 100%;
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.mainBlack};
        margin-bottom: 15px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 11px;
    margin-bottom: 78px;
`;

const RegisterButton = styled.button`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.subGray};
    text-decoration: underline;
    cursor: pointer;
`;
