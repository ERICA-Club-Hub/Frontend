import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/Common/Button';

export default function CompleteClubRegisterPage() {
    return (
        <Container>
            <Title>동아리 등록 요청이 완료되었습니다.</Title>
            <GuideText>
                동아리 등록 승인 결과는 대표자 이메일로 <br />
                알려드리겠습니다.
            </GuideText>
            <Link to="/">
                <Button size="large">홈으로 돌아가기</Button>
            </Link>
        </Container>
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
