import { useState } from 'react';
import styled from 'styled-components';
import { IActivitiesLog } from '@/types';
import ErrorIcon from '@/assets/common/error-icon.svg?react';
import useClubAdminQueries from '@/hooks/queries/useClubAdminQueries';
import Skeleton from '../Common/Skeleton';
import { FeedThumbnailImage } from './FeedThumbnailImage';

function Feed() {
    const [activitiesLog, setActivitiesLog] = useState<IActivitiesLog[]>([]);

    // 활동로그 피드 데이터 fetch
    const { useActivitiesLogQuery } = useClubAdminQueries();
    const { isPending, isSuccess } = useActivitiesLogQuery(setActivitiesLog);

    return (
        <Container>
            {isPending ? (
                <FeedListWrapper>
                    {Array.from({ length: 9 }).map((_, index) => (
                        <Skeleton key={index} width={95} height={95} />
                    ))}
                </FeedListWrapper>
            ) : isSuccess && activitiesLog.length > 0 ? (
                <FeedListWrapper>
                    {activitiesLog.map((activityLog) => (
                        <FeedThumbnailImage
                            key={activityLog.activityId}
                            activityLog={activityLog}
                        />
                    ))}
                </FeedListWrapper>
            ) : (
                <EmyptyWrapper>
                    <ErrorIcon width={30} height={30} />
                    <ErrorText>활동로그가 비어있어요.</ErrorText>
                </EmyptyWrapper>
            )}
        </Container>
    );
}

export { Feed };

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 318px;
`;

const FeedListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 6px;
    row-gap: 7px;
    width: 318px;
    height: auto;
    padding: 10px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
`;

const EmyptyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 318px;
    height: 115px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
`;

const ErrorText = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.mainBlack};
`;
