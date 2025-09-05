import styled from 'styled-components';
import RecentlyLogItem from '../Common/RecentlyLog/RecentlyLogItem';
import { useRecentlyLog } from '@/hooks/queries/main/useRecentlyLogs';

export default function RecentlyLogSection() {
    const { recentlyLogs } = useRecentlyLog();
    return (
        <SectionContainer>
            <SectionTitle>최근 업로드 된 활동로그</SectionTitle>
            <RecentlyLogContainer>
                {recentlyLogs &&
                    recentlyLogs.map((recentlyLog) => (
                        <RecentlyLogItem
                            clubId={recentlyLog.clubId}
                            imgUrl={recentlyLog.imageUrl}
                            clubLogoImgUrl={recentlyLog.clubProfileImageUrl}
                            clubName={recentlyLog.clubName}
                        />
                    ))}
            </RecentlyLogContainer>
        </SectionContainer>
    );
}

const SectionContainer = styled.section`
    display: flex;
    flex-direction: column;
`;
const SectionTitle = styled.h3`
    font-weight: 500;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const RecentlyLogContainer = styled.div`
    width: 320px;
    height: 320px;
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    gap: 10px;
`;
