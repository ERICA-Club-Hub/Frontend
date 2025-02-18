import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { InputField, TopNavigator } from '@/components/Common';
import Button from '@/components/Common/Button';
import { loginNavigations } from '@/constants';
import useAdminLogin from '@/hooks/useAdminLogin';

const AdminLoginPage = () => {
    const [navStatus, setNavStatus] = useState<number>(1);
    const [code, setCode] = useState<string>('');
    const { isValidate, setIsValidate, handleLogin } = useAdminLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCode('');
        handleLogin(navStatus, code);
    };

    // 동아리 <-> 총동연 로그인 변경 시 인증 상태 초기화
    useEffect(() => {
        setIsValidate(true);
    }, [navStatus]);

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
                        isError={!isValidate}
                    />
                    <Button type="submit" size="large" isDisabled={() => false}>
                        어드민 로그인하기
                    </Button>
                    <ErrorText $isValidate={isValidate}>
                        코드가 일치하지 않아요
                    </ErrorText>
                </Form>

                {navStatus === 1 && (
                    <Link to="/admin/register">
                        <RegisterButton>동아리 등록하기</RegisterButton>
                    </Link>
                )}
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
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 11px;
    margin-bottom: 78px;
`;

const ErrorText = styled.p<{ $isValidate: boolean }>`
    position: absolute;
    top: 112px;
    left: 15px;
    font-size: 14px;
    font-weight: 500;
    color: #dc5151;
    opacity: ${({ $isValidate }) => ($isValidate ? 0 : 1)};
    transition: opacity 0.5s ease;
`;

const RegisterButton = styled.button`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.subGray};
    text-decoration: underline;
    cursor: pointer;
`;
