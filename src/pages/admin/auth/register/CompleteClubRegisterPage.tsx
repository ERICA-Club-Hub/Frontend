import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/Common/Button';
import { ErrorPage } from '@/pages/error/ErrorPage';

export default function CompleteClubRegisterPage() {
    const location = useLocation();
    const mode = location.state?.mode;

    return (
        <>
            {mode ? (
                <Container>
                    <Title>
                        {mode === 'register'
                            ? '동아리 등록 요청이 완료되었어요.'
                            : '동아리 정보 수정 요청이 완료되었어요.'}
                    </Title>
                    <GuideText>
                        {mode === 'register' ? '동아리 등록 승인' : ''} 결과는
                        대표자 이메일로 {mode === 'register' ? <br /> : null}
                        알려드릴게요.
                    </GuideText>
                    <Link to="/">
                        <Button size="large">홈으로 돌아가기</Button>
                    </Link>
                </Container>
            ) : (
                <ErrorPage />
            )}
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 55px);
    padding-top: 240px;
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.mainBlack};
    text-align: center;
`;

const GuideText = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 40px;
    color: ${({ theme }) => theme.colors.mainGary};
    text-align: center;
`;
