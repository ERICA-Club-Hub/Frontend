import { InputField, TopNavigator } from '@/components/Common';
import Button from '@/components/Common/Button';
import { loginNavigations } from '@/constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AdminLoginPage = () => {
    const [navStatus, setNavStatus] = useState<number>(1);
    const [code, setCode] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCode('');
    };

    return (
        <Container>
            <TopNavigator
                navStatus={navStatus}
                navList={loginNavigations}
                onClick={(id: number) => setNavStatus(id)}
            />
            <LoginContainer>
                <h2>
                    {navStatus === 1
                        ? '동아리 대표이신가요?'
                        : '총동연 관리자이신가요?'}
                </h2>
                <Form onSubmit={handleSubmit}>
                    <InputField
                        value={code}
                        onChange={handleChange}
                        placeholder={
                            navStatus === 1
                                ? '부여받은 동아리 코드를 입력해 주세요.'
                                : '부여받은 코드를 입력해 주세요.'
                        }
                        inputSize="large"
                        backgroundColor="white"
                    />
                    <Button type="submit" size="large" isDisabled={() => false}>
                        어드민 로그인하기
                    </Button>
                </Form>

                <Link to="/admin/register">
                    <RegisterButton>동아리 등록하기</RegisterButton>
                </Link>
            </LoginContainer>
        </Container>
    );
};

export { AdminLoginPage };

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    padding-top: 35%;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    height: 135px;

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
