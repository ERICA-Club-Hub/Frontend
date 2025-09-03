import styled from 'styled-components';
import RecentlyLogItem from './RecentlyLogItem';

interface RecentlyLog {
    activityId: number;
    thumbnailUrl: string;
    clubId: number;
    clubLogoImgUrl: string;
    clubName: string;
}

interface RecentlyLogContainerProps {
    recentlyLogs: RecentlyLog[];
}

// TODO develop에 이전 PR 머지되면 컴포넌트 page로 옮기기
export default function RecentlyLogContainer({
    recentlyLogs,
}: RecentlyLogContainerProps) {
    return (
        <Container>
            {recentlyLogs.map((recentlyLog) => (
                <RecentlyLogItem
                    clubId={recentlyLog.clubId}
                    imgUrl={recentlyLog.thumbnailUrl}
                    clubLogoImgUrl={recentlyLog.clubLogoImgUrl}
                    clubName={recentlyLog.clubName}
                />
            ))}
        </Container>
    );
}

const Container = styled.div`
    width: 320px;
    height: 320px;
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    gap: 10px;
`;
