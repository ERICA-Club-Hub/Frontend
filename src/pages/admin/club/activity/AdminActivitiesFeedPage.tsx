import { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/Common/Button';
import useAdminClubQueries from '@/hooks/queries/useAdminClubQueries';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/store/clubInfoState';
import { IActivitiesLog } from '@/types';
import Feed from '@/components/ActivityLog/Feed';
import { Link } from 'react-router-dom';

function AdminActivitiesFeedPage() {
    const clubId = useRecoilValue(clubIdSelector);
    const [activitiesLog, setActivitiesLog] = useState<IActivitiesLog[]>([]);

    // 활동로그 피드 데이터 fetch
    const { useActivitiesLogQuery } = useAdminClubQueries();
    useActivitiesLogQuery({ clubId, setActivitiesLog });

    return (
        <Container>
            <TitleWrapper>
                <Title>활동로그</Title>
                <Link to={`/admin/club/${clubId}/activities/register`}>
                    <Button>활동로그 작성하기</Button>
                </Link>
            </TitleWrapper>

            {/* 활동 피드 */}
            <Feed data={activitiesLog} />
        </Container>
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
