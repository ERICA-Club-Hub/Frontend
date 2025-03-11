import styled from 'styled-components';
import Button from '@/components/Common/Button';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/store/clubInfoState';
import { Link } from 'react-router-dom';
import { Feed } from '@/components/ActivityLog';

function AdminActivitiesFeedPage() {
    const clubId = useRecoilValue(clubIdSelector);

    return (
        <>
            <Container>
                <TitleWrapper>
                    <Title>활동로그</Title>
                    <Link to={`/admin/club/${clubId}/activities/register`}>
                        <Button>활동로그 작성하기</Button>
                    </Link>
                </TitleWrapper>

                {/* 활동 피드 */}
                <Feed />
            </Container>
        </>
    );
}

export { AdminActivitiesFeedPage };

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding-top: 20px;
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 320px;
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    color: ${({ theme }) => theme.colors.mainBlack};
`;
