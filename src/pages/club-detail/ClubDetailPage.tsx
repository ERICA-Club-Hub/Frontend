import styled from 'styled-components';
import TabContents from './TabContents';
import ClubDetailHeader from '@/components/ClubDetail/ClubDetailHeader';
import Tab from '@/components/ClubDetail/Tab/Tab';
import { useClubDetail } from '@/hooks/club-detail/useClubDetail';
import RecentlyLogContainer from '@/components/Common/RecentlyLog/RecentlyLogContainer';

export type activeTab = 'intro' | 'recruit' | 'log';

const ClubDetailPage = () => {
    const { activeTab, setActiveTab } = useClubDetail();

    return (
        <PageContainer>
            <ClubDetailHeader />
            <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabContents activeTab={activeTab} />
            <RecentlyLogContainer
                recentlyLogs={[
                    {
                        activityId: 1,
                        thumbnailUrl: '',
                        clubId: 1,
                        clubLogoImgUrl: '',
                        clubName: 'ddddddd',
                    },
                    {
                        activityId: 1,
                        thumbnailUrl: '',
                        clubId: 1,
                        clubLogoImgUrl: '',
                        clubName: '',
                    },
                    {
                        activityId: 1,
                        thumbnailUrl: '',
                        clubId: 1,
                        clubLogoImgUrl: '',
                        clubName: '',
                    },
                    {
                        activityId: 1,
                        thumbnailUrl: '',
                        clubId: 1,
                        clubLogoImgUrl: '',
                        clubName: '',
                    },
                ]}
            />
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;

export { ClubDetailPage };
